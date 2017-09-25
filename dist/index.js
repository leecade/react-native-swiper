(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'react', 'prop-types', 'react-native'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('react'), require('prop-types'), require('react-native'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.react, global.propTypes, global.reactNative);
    global.index = mod.exports;
  }
})(this, function (module, exports, _react, _propTypes, _reactNative) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
      width = _Dimensions$get.width,
      height = _Dimensions$get.height;

  /**
   * Default styles
   * @type {StyleSheetPropType}
   */
  var styles = {
    container: {
      backgroundColor: 'transparent',
      position: 'relative',
      flex: 1
    },

    wrapperIOS: {
      backgroundColor: 'transparent'
    },

    wrapperAndroid: {
      backgroundColor: 'transparent',
      flex: 1
    },

    slide: {
      backgroundColor: 'transparent'
    },

    pagination_x: {
      position: 'absolute',
      bottom: 25,
      left: 0,
      right: 0,
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },

    pagination_y: {
      position: 'absolute',
      right: 15,
      top: 0,
      bottom: 0,
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },

    title: {
      height: 30,
      justifyContent: 'center',
      position: 'absolute',
      paddingLeft: 10,
      bottom: -30,
      left: 0,
      flexWrap: 'nowrap',
      width: 250,
      backgroundColor: 'transparent'
    },

    buttonWrapper: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      position: 'absolute',
      top: 0,
      left: 0,
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    buttonText: {
      fontSize: 50,
      color: '#007aff',
      fontFamily: 'Arial'
    }

    // missing `module.exports = exports['default'];` with babel6
    // export default React.createClass({
  };
  var Swiper = function (_React$Component) {
    _inherits(Swiper, _React$Component);

    function Swiper() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Swiper);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Swiper.__proto__ || Object.getPrototypeOf(Swiper)).call.apply(_ref, [this].concat(args))), _this), _this.state = _this.initState(_this.props), _this.autoplayTimer = null, _this.loopJumpTimer = null, _this.onLayout = function (event) {
        var _event$nativeEvent$la = event.nativeEvent.layout,
            width = _event$nativeEvent$la.width,
            height = _event$nativeEvent$la.height;

        var offset = _this.internals.offset = {};
        var state = { width: width, height: height };

        if (_this.state.total > 1) {
          var setup = _this.state.index;
          if (_this.props.loop) {
            setup++;
          }
          offset[_this.state.dir] = _this.state.dir === 'y' ? height * setup : width * setup;
        }

        // only update the offset in state if needed, updating offset while swiping
        // causes some bad jumping / stuttering
        if (!_this.state.offset || width !== _this.state.width || height !== _this.state.height) {
          state.offset = offset;
        }
        _this.setState(state);
      }, _this.loopJump = function () {
        if (!_this.state.loopJump) return;
        var i = _this.state.index + (_this.props.loop ? 1 : 0);
        var scrollView = _this.scrollView;
        _this.loopJumpTimer = setTimeout(function () {
          return scrollView.setPageWithoutAnimation && scrollView.setPageWithoutAnimation(i);
        }, 50);
      }, _this.autoplay = function () {
        if (!Array.isArray(_this.props.children) || !_this.props.autoplay || _this.internals.isScrolling || _this.state.autoplayEnd) return;

        _this.autoplayTimer && clearTimeout(_this.autoplayTimer);
        _this.autoplayTimer = setTimeout(function () {
          if (!_this.props.loop && (_this.props.autoplayDirection ? _this.state.index === _this.state.total - 1 : _this.state.index === 0)) return _this.setState({ autoplayEnd: true });

          _this.scrollBy(_this.props.autoplayDirection ? 1 : -1);
        }, _this.props.autoplayTimeout * 1000);
      }, _this.onScrollBegin = function (e) {
        // update scroll state
        _this.internals.isScrolling = true;
        _this.props.onScrollBeginDrag && _this.props.onScrollBeginDrag(e, _this.fullState(), _this);
      }, _this.onScrollEnd = function (e) {
        // update scroll state
        _this.internals.isScrolling = false;

        // making our events coming from android compatible to updateIndex logic
        if (!e.nativeEvent.contentOffset) {
          if (_this.state.dir === 'x') {
            e.nativeEvent.contentOffset = { x: e.nativeEvent.position * _this.state.width };
          } else {
            e.nativeEvent.contentOffset = { y: e.nativeEvent.position * _this.state.height };
          }
        }

        _this.updateIndex(e.nativeEvent.contentOffset, _this.state.dir, function () {
          _this.autoplay();
          _this.loopJump();

          // if `onMomentumScrollEnd` registered will be called here
          _this.props.onMomentumScrollEnd && _this.props.onMomentumScrollEnd(e, _this.fullState(), _this);
        });
      }, _this.onScrollEndDrag = function (e) {
        var contentOffset = e.nativeEvent.contentOffset;
        var _this$props = _this.props,
            horizontal = _this$props.horizontal,
            children = _this$props.children;
        var index = _this.state.index;
        var offset = _this.internals.offset;

        var previousOffset = horizontal ? offset.x : offset.y;
        var newOffset = horizontal ? contentOffset.x : contentOffset.y;

        if (previousOffset === newOffset && (index === 0 || index === children.length - 1)) {
          _this.internals.isScrolling = false;
        }
      }, _this.updateIndex = function (offset, dir, cb) {
        var state = _this.state;
        var index = state.index;
        var diff = offset[dir] - _this.internals.offset[dir];
        var step = dir === 'x' ? state.width : state.height;
        var loopJump = false;

        // Do nothing if offset no change.
        if (!diff) return;

        // Note: if touch very very quickly and continuous,
        // the variation of `index` more than 1.
        // parseInt() ensures it's always an integer
        index = parseInt(index + Math.round(diff / step));

        if (_this.props.loop) {
          if (index <= -1) {
            index = state.total - 1;
            offset[dir] = step * state.total;
            loopJump = true;
          } else if (index >= state.total) {
            index = 0;
            offset[dir] = step;
            loopJump = true;
          }
        }

        var newState = {};
        newState.index = index;
        newState.loopJump = loopJump;

        _this.internals.offset = offset;

        // only update offset in state if loopJump is true
        if (loopJump) {
          // when swiping to the beginning of a looping set for the third time,
          // the new offset will be the same as the last one set in state.
          // Setting the offset to the same thing will not do anything,
          // so we increment it by 1 then immediately set it to what it should be,
          // after render.
          if (offset[dir] === _this.internals.offset[dir]) {
            newState.offset = { x: 0, y: 0 };
            newState.offset[dir] = offset[dir] + 1;
            _this.setState(newState, function () {
              _this.setState({ offset: offset }, cb);
            });
          } else {
            newState.offset = offset;
            _this.setState(newState, cb);
          }
        } else {
          _this.setState(newState, cb);
        }
      }, _this.scrollBy = function (index) {
        var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (_this.internals.isScrolling || _this.state.total < 2) return;
        var state = _this.state;
        var diff = (_this.props.loop ? 1 : 0) + index + _this.state.index;
        var x = 0;
        var y = 0;
        if (state.dir === 'x') x = diff * state.width;
        if (state.dir === 'y') y = diff * state.height;

        if (_reactNative.Platform.OS !== 'ios') {
          _this.scrollView && _this.scrollView[animated ? 'setPage' : 'setPageWithoutAnimation'](diff);
        } else {
          _this.scrollView && _this.scrollView.scrollTo({ x: x, y: y, animated: animated });
        }

        // update scroll state
        _this.internals.isScrolling = true;
        _this.setState({
          autoplayEnd: false
        });

        // trigger onScrollEnd manually in android
        if (!animated || _reactNative.Platform.OS !== 'ios') {
          setImmediate(function () {
            _this.onScrollEnd({
              nativeEvent: {
                position: diff
              }
            });
          });
        }
      }, _this.scrollViewPropOverrides = function () {
        var props = _this.props;
        var overrides = {};

        /*
        const scrollResponders = [
          'onMomentumScrollBegin',
          'onTouchStartCapture',
          'onTouchStart',
          'onTouchEnd',
          'onResponderRelease',
        ]
        */

        for (var prop in props) {
          // if(~scrollResponders.indexOf(prop)
          if (typeof props[prop] === 'function' && prop !== 'onMomentumScrollEnd' && prop !== 'renderPagination' && prop !== 'onScrollBeginDrag') {
            (function () {
              var originResponder = props[prop];
              overrides[prop] = function (e) {
                return originResponder(e, _this.fullState(), _this);
              };
            })();
          }
        }

        return overrides;
      }, _this.renderPagination = function () {
        // By default, dots only show when `total` >= 2
        if (_this.state.total <= 1) return null;

        var dots = [];
        var ActiveDot = _this.props.activeDot || _react2.default.createElement(_reactNative.View, { style: [{
            backgroundColor: _this.props.activeDotColor || '#007aff',
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3
          }, _this.props.activeDotStyle] });
        var Dot = _this.props.dot || _react2.default.createElement(_reactNative.View, { style: [{
            backgroundColor: _this.props.dotColor || 'rgba(0,0,0,.2)',
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3
          }, _this.props.dotStyle] });
        for (var i = 0; i < _this.state.total; i++) {
          dots.push(i === _this.state.index ? _react2.default.cloneElement(ActiveDot, { key: i }) : _react2.default.cloneElement(Dot, { key: i }));
        }

        return _react2.default.createElement(
          _reactNative.View,
          { pointerEvents: 'none', style: [styles['pagination_' + _this.state.dir], _this.props.paginationStyle] },
          dots
        );
      }, _this.renderTitle = function () {
        var child = _this.props.children[_this.state.index];
        var title = child && child.props && child.props.title;
        return title ? _react2.default.createElement(
          _reactNative.View,
          { style: styles.title },
          _this.props.children[_this.state.index].props.title
        ) : null;
      }, _this.renderNextButton = function () {
        var button = null;

        if (_this.props.loop || _this.state.index !== _this.state.total - 1) {
          button = _this.props.nextButton || _react2.default.createElement(
            _reactNative.Text,
            { style: styles.buttonText },
            '\u203A'
          );
        }

        return _react2.default.createElement(
          _reactNative.TouchableOpacity,
          {
            onPress: function onPress() {
              return button !== null && _this.scrollBy(1);
            },
            disabled: _this.props.disableNextButton
          },
          _react2.default.createElement(
            _reactNative.View,
            null,
            button
          )
        );
      }, _this.renderPrevButton = function () {
        var button = null;

        if (_this.props.loop || _this.state.index !== 0) {
          button = _this.props.prevButton || _react2.default.createElement(
            _reactNative.Text,
            { style: styles.buttonText },
            '\u2039'
          );
        }

        return _react2.default.createElement(
          _reactNative.TouchableOpacity,
          { onPress: function onPress() {
              return button !== null && _this.scrollBy(-1);
            } },
          _react2.default.createElement(
            _reactNative.View,
            null,
            button
          )
        );
      }, _this.renderButtons = function () {
        return _react2.default.createElement(
          _reactNative.View,
          { pointerEvents: 'box-none', style: [styles.buttonWrapper, {
              width: _this.state.width,
              height: _this.state.height
            }, _this.props.buttonWrapperStyle] },
          _this.renderPrevButton(),
          _this.renderNextButton()
        );
      }, _this.refScrollView = function (view) {
        _this.scrollView = view;
      }, _this.renderScrollView = function (pages) {
        if (_reactNative.Platform.OS === 'ios') {
          return _react2.default.createElement(
            _reactNative.ScrollView,
            _extends({ ref: _this.refScrollView
            }, _this.props, _this.scrollViewPropOverrides(), {
              contentContainerStyle: [styles.wrapperIOS, _this.props.style],
              contentOffset: _this.state.offset,
              onScrollBeginDrag: _this.onScrollBegin,
              onMomentumScrollEnd: _this.onScrollEnd,
              onScrollEndDrag: _this.onScrollEndDrag }),
            pages
          );
        }
        return _react2.default.createElement(
          _reactNative.ScrollView,
          _extends({ ref: _this.refScrollView
          }, _this.props, {
            initialPage: _this.props.loop ? _this.state.index + 1 : _this.state.index,
            onPageSelected: _this.onScrollEnd,
            key: pages.length,
            style: [styles.wrapperAndroid, _this.props.style] }),
          pages
        );
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Swiper, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (!nextProps.autoplay && this.autoplayTimer) clearTimeout(this.autoplayTimer);
        this.setState(this.initState(nextProps, this.props.index !== nextProps.index));
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.autoplay();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.autoplayTimer && clearTimeout(this.autoplayTimer);
        this.loopJumpTimer && clearTimeout(this.loopJumpTimer);
      }
    }, {
      key: 'componentWillUpdate',
      value: function componentWillUpdate(nextProps, nextState) {
        // If the index has changed, we notify the parent via the onIndexChanged callback
        if (this.state.index !== nextState.index) this.props.onIndexChanged(nextState.index);
      }
    }, {
      key: 'initState',
      value: function initState(props) {
        var updateIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        // set the current state
        var state = this.state || { width: 0, height: 0, offset: { x: 0, y: 0 } };

        var initState = {
          autoplayEnd: false,
          loopJump: false,
          offset: {}
        };

        initState.total = props.children ? props.children.length || 1 : 0;

        if (state.total === initState.total && !updateIndex) {
          // retain the index
          initState.index = state.index;
        } else {
          initState.index = initState.total > 1 ? Math.min(props.index, initState.total - 1) : 0;
        }

        // Default: horizontal
        initState.dir = props.horizontal === false ? 'y' : 'x';
        initState.width = props.width || width;
        initState.height = props.height || height;
        initState.offset[initState.dir] = initState.dir === 'y' ? height * props.index : width * props.index;

        this.internals = _extends({}, this.internals, {
          isScrolling: false
        });
        return initState;
      }
    }, {
      key: 'fullState',
      value: function fullState() {
        return Object.assign({}, this.state, this.internals);
      }
    }, {
      key: 'render',
      value: function render() {
        var state = this.state;
        var props = this.props;
        var _state = this.state,
            index = _state.index,
            total = _state.total,
            width = _state.width,
            height = _state.height;
        var _props = this.props,
            children = _props.children,
            containerStyle = _props.containerStyle,
            loop = _props.loop,
            loadMinimal = _props.loadMinimal,
            loadMinimalSize = _props.loadMinimalSize,
            loadMinimalLoader = _props.loadMinimalLoader,
            renderPagination = _props.renderPagination,
            showsButtons = _props.showsButtons,
            showsPagination = _props.showsPagination;

        // let dir = state.dir
        // let key = 0
        var loopVal = loop ? 1 : 0;
        var pages = [];

        var pageStyle = [{ width: width, height: height }, styles.slide];
        var pageStyleLoading = {
          width: width,
          height: height,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'

          // For make infinite at least total > 1
        };if (total > 1) {
          // Re-design a loop model for avoid img flickering
          pages = Object.keys(children);
          if (loop) {
            pages.unshift(total - 1 + '');
            pages.push('0');
          }

          pages = pages.map(function (page, i) {
            if (loadMinimal) {
              if (i >= index + loopVal - loadMinimalSize && i <= index + loopVal + loadMinimalSize) {
                return _react2.default.createElement(
                  _reactNative.View,
                  { style: pageStyle, key: i },
                  children[page]
                );
              } else {
                return _react2.default.createElement(
                  _reactNative.View,
                  { style: pageStyleLoading, key: i },
                  loadMinimalLoader ? loadMinimalLoader : _react2.default.createElement(_reactNative.ActivityIndicator, null)
                );
              }
            } else {
              return _react2.default.createElement(
                _reactNative.View,
                { style: pageStyle, key: i },
                children[page]
              );
            }
          });
        } else {
          pages = _react2.default.createElement(
            _reactNative.View,
            { style: pageStyle, key: 0 },
            children
          );
        }

        return _react2.default.createElement(
          _reactNative.View,
          { style: [styles.container, containerStyle], onLayout: this.onLayout },
          this.renderScrollView(pages),
          showsPagination && (renderPagination ? renderPagination(index, total, this) : this.renderPagination()),
          this.renderTitle(),
          showsButtons && this.renderButtons()
        );
      }
    }]);

    return Swiper;
  }(_react2.default.Component);

  Swiper.propTypes = {
    horizontal: _propTypes2.default.bool,
    children: _propTypes2.default.node.isRequired,
    containerStyle: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.number]),
    style: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.number]),
    pagingEnabled: _propTypes2.default.bool,
    showsHorizontalScrollIndicator: _propTypes2.default.bool,
    showsVerticalScrollIndicator: _propTypes2.default.bool,
    bounces: _propTypes2.default.bool,
    scrollsToTop: _propTypes2.default.bool,
    removeClippedSubviews: _propTypes2.default.bool,
    automaticallyAdjustContentInsets: _propTypes2.default.bool,
    showsPagination: _propTypes2.default.bool,
    showsButtons: _propTypes2.default.bool,
    disableNextButton: _propTypes2.default.bool,
    loadMinimal: _propTypes2.default.bool,
    loadMinimalSize: _propTypes2.default.number,
    loadMinimalLoader: _propTypes2.default.element,
    loop: _propTypes2.default.bool,
    autoplay: _propTypes2.default.bool,
    autoplayTimeout: _propTypes2.default.number,
    autoplayDirection: _propTypes2.default.bool,
    index: _propTypes2.default.number,
    renderPagination: _propTypes2.default.func,
    dotStyle: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.number]),
    activeDotStyle: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.number]),
    dotColor: _propTypes2.default.string,
    activeDotColor: _propTypes2.default.string,
    /**
     * Called when the index has changed because the user swiped.
     */
    onIndexChanged: _propTypes2.default.func

    /**
     * Default props
     * @return {object} props
     * @see http://facebook.github.io/react-native/docs/scrollview.html
     */
  };
  Swiper.defaultProps = {
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    bounces: false,
    scrollsToTop: false,
    removeClippedSubviews: true,
    automaticallyAdjustContentInsets: false,
    showsPagination: true,
    showsButtons: false,
    disableNextButton: false,
    loop: true,
    loadMinimal: false,
    loadMinimalSize: 1,
    autoplay: false,
    autoplayTimeout: 2.5,
    autoplayDirection: true,
    index: 0,
    onIndexChanged: function onIndexChanged() {
      return null;
    }

    /**
     * Init states
     * @return {object} states
     */
  };
  exports.default = Swiper;
  module.exports = exports['default'];
});