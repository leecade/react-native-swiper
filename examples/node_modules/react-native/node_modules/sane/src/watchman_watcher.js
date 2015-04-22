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

  function onWatch(error, resp) {
    if (handleError(self, error)) {
      return;
    }

    handleWarning(resp);

    self.client.command(['clock', self.root], onClock);
  }

  function onClock(error, resp) {
    if (handleError(self, error)) {
      return;
    }

    handleWarning(resp);

    self.client.command(['subscribe', self.root, SUB_NAME, {
      fields: ['name', 'exists', 'new'],
      since: resp.clock
    }], onSubscribe);
  }

  function onSubscribe(error, resp) {
    if (error) {
      self.emit('error', error);
      return;
    }

    handleWarning(resp);

    self.emit('ready');
  }

  self.client.command(['watch', self.root], onWatch);
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
  var absPath = path.join(this.root, changeDescriptor.name);

  if (!common.isFileIncluded(this.globs, this.dot, changeDescriptor.name)) {
    return;
  }

  if (!changeDescriptor.exists) {
    self.emitEvent(DELETE_EVENT, changeDescriptor.name, self.root);
  } else {
    fs.lstat(absPath, function(error, stat) {
      if (handleError(self, error)) {
        return;
      }

      var eventType = changeDescriptor.new ? ADD_EVENT : CHANGE_EVENT;

      // Change event on dirs are mostly useless.
      if (!(eventType === CHANGE_EVENT && stat.isDirectory())) {
        self.emitEvent(eventType, changeDescriptor.name, self.root, stat);
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
