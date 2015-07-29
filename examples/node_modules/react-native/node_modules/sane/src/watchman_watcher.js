'use strict';

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var assert = require('assert');
var common = require('./common');
var watchman = require('fb-watchman');
var EventEmitter = require('events').EventEmitter;

/**
 * Constants
 */

var CHANGE_EVENT = common.CHANGE_EVENT;
var DELETE_EVENT = common.DELETE_EVENT;
var ADD_EVENT = common.ADD_EVENT;
var ALL_EVENT = common.ALL_EVENT;
var SUB_NAME = 'sane-sub';

/**
 * Export `WatchmanWatcher` class.
 */

module.exports = WatchmanWatcher;


/**
 * Watches `dir`.
 *
 * @class PollWatcher
 * @param String dir
 * @param {Object} opts
 * @public
 */

function WatchmanWatcher(dir, opts) {
  opts = common.assignOptions(this, opts);
  checkIfWatchmanInstalled();
  this.root = path.resolve(dir);
  this.init();
}

WatchmanWatcher.prototype.__proto__ = EventEmitter.prototype;

/**
 * Run the watchman `watch` command on the root and subscribe to changes.
 *
 * @private
 */

WatchmanWatcher.prototype.init = function() {
  if (this.client) {
    this.client.removeAllListeners();
  }

  var self = this;
  this.client = new watchman.Client();
  this.client.on('error', this.emit.bind(this));
  this.client.on('subscription', this.handleChangeEvent.bind(this));
  this.client.on('end', function() {
    console.warn('[sane] Warning: Lost connection to watchman, reconnecting..');
    self.init();
  });

  this.watchProjectInfo = null;

  function getWatchRoot() {
    return self.watchProjectInfo ? self.watchProjectInfo.root : self.root;
  }

  function onVersion(error, resp) {
    if (handleError(self, error)) {
      return;
    }

    handleWarning(resp);

    var parts = resp.version.split('.');

    if (parseInt(parts[0], 10) >= 3 && parseInt(parts[1], 10) >= 1) {
      self.client.command(
        ['watch-project', getWatchRoot()], onWatchProject
      );
    } else {
      self.client.command(['watch', getWatchRoot()], onWatch);
    }
  }

  function onWatchProject(error, resp) {
    if (handleError(self, error)) {
      return;
    }

    handleWarning(resp);

    self.watchProjectInfo = {
      root: resp.watch,
      relativePath: resp.relative_path ? resp.relative_path : ''
    };

    self.client.command(['clock', getWatchRoot()], onClock);
  }


  function onWatch(error, resp) {
    if (handleError(self, error)) {
      return;
    }

    handleWarning(resp);

    self.client.command(['clock', getWatchRoot()], onClock);
  }

  function onClock(error, resp) {
    if (handleError(self, error)) {
      return;
    }

    handleWarning(resp);

    var options = {
      fields: ['name', 'exists', 'new'],
      since: resp.clock
    };

    if (self.watchProjectInfo != null) {
      options.expression = [
        'dirname',
        self.watchProjectInfo.relativePath
      ];
    }

    self.client.command(
      ['subscribe', getWatchRoot(), SUB_NAME, options],
      onSubscribe
    );
  }

  function onSubscribe(error, resp) {
    if (handleError(self, error)) {
      return;
    }

    handleWarning(resp);

    self.emit('ready');
  }

  self.client.command(['version'], onVersion);
};

/**
 * Handles a change event coming from the subscription.
 *
 * @param {Object} resp
 * @private
 */

WatchmanWatcher.prototype.handleChangeEvent = function(resp) {
  assert.equal(resp.subscription, SUB_NAME, 'Invalid subscription event.');
  resp.files.forEach(this.handleFileChange, this);
};

/**
 * Handles a single change event record.
 *
 * @param {Object} changeDescriptor
 * @private
 */

WatchmanWatcher.prototype.handleFileChange = function(changeDescriptor) {
  var self = this;
  var absPath;

  if (this.watchProjectInfo && this.watchProjectInfo.relativePath.length) {
    absPath = path.join(
      this.watchProjectInfo.root,
      changeDescriptor.name
    );
  } else {
    absPath = path.join(this.root, changeDescriptor.name);
  }

  var relativePath = path.relative(this.root, absPath);
  if (!common.isFileIncluded(this.globs, this.dot, relativePath)) {
    return;
  }

  if (!changeDescriptor.exists) {
    self.emitEvent(DELETE_EVENT, relativePath, self.root);
  } else {
    fs.lstat(absPath, function(error, stat) {
      // Files can be deleted between the event and the lstat call
      // the most reliable thing to do here is to ignore the event.
      if (error && error.code === 'ENOENT') {
        return;
      }

      if (handleError(self, error)) {
        return;
      }

      var eventType = changeDescriptor.new ? ADD_EVENT : CHANGE_EVENT;

      // Change event on dirs are mostly useless.
      if (!(eventType === CHANGE_EVENT && stat.isDirectory())) {
        self.emitEvent(eventType, relativePath, self.root, stat);
      }
    });
  }
};

/**
 * Dispatches the event.
 *
 * @param {string} eventType
 * @param {string} filepath
 * @param {string} root
 * @param {fs.Stat} stat
 * @private
 */

WatchmanWatcher.prototype.emitEvent = function(
  eventType,
  filepath,
  root,
  stat
) {
  this.emit(eventType, filepath, root, stat);
  this.emit(ALL_EVENT, eventType, filepath, root, stat);
};

/**
 * Closes the watcher.
 *
 * @param {function} callback
 * @private
 */

WatchmanWatcher.prototype.close = function(callback) {
  var self = this;

  function onUnsubscribe(error, resp) {
    if (error && callback) {
      callback(error);
      return;
    } else if (handleError(self, error)) {
      return;
    }

    handleWarning(resp);

    self.client.removeAllListeners();
    self.client.end();

    callback && callback(null, true);
  }

  self.client.command(['unsubscribe', self.root, SUB_NAME], onUnsubscribe);
};

/**
 * Handles an error and returns true if exists.
 *
 * @param {WatchmanWatcher} self
 * @param {Error} error
 * @private
 */

function handleError(self, error) {
  if (error != null) {
    self.emit('error', error);
    return true;
  } else {
    return false;
  }
}

/**
 * Handles a warning in the watchman resp object.
 *
 * @param {object} resp
 * @private
 */

function handleWarning(resp) {
  if ('warning' in resp) {
    console.warn(resp.warning);
    return true;
  } else {
    return false;
  }
}

/**
 * Checks if watchman is installed
 *
 * @private
 */

var watchmanInstalled;
function checkIfWatchmanInstalled() {
  if (watchmanInstalled == null) {
    exec('which watchman', function(err, out) {
      if (err || out.length === 0) {
        console.warn(
          '\u001b[31mIt doesn\'t look like you have `watchman` installed',
          '\u001b[39m\nSee',
          'https://facebook.github.io/watchman/docs/install.html'
        );
        process.exit(1);
      } else {
        watchmanInstalled = true;
      }
    });
  } else {
    return true;
  }
}
