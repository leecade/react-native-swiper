'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * react-native-swiper
                                                                                                                                                                                                                                                                   * @author leecade<leecade@163.com>
                                                                                                                                                                                                                                                                   */


// Using bare setTimeout, setInterval, setImmediate
// and requestAnimationFrame calls is very dangerous
// because if you forget to cancel the request before
// the component is unmounted, you risk the callback
// throwing an exception.


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

var _reactTimerMixin = require('react-timer-mixin');

var _reactTimerMixin2 = _interopRequireDefault(_reactTimerMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Dimensions$get = _reactNative.Dimensions.get('window');

var width = _Dimensions$get.width;
var height = _Dimensions$get.height;

/**
 * Default styles
 * @type {StyleSheetPropType}
 */

var styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'relative'
  },

  wrapper: {
    backgroundColor: 'transparent'
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
});

// missing `module.exports = exports['default'];` with babel6
// export default React.createClass({
module.exports = _react2.default.createClass({
  displayName: 'exports',


  /**
   * Props Validation
   * @type {Object}
   */
  propTypes: {
    horizontal: _react2.default.PropTypes.bool,
    children: _react2.default.PropTypes.node.isRequired,
    style: _reactNative.View.propTypes.style,
    pagingEnabled: _react2.default.PropTypes.bool,
    showsHorizontalScrollIndicator: _react2.default.PropTypes.bool,
    showsVerticalScrollIndicator: _react2.default.PropTypes.bool,
    bounces: _react2.default.PropTypes.bool,
    scrollsToTop: _react2.default.PropTypes.bool,
    removeClippedSubviews: _react2.default.PropTypes.bool,
    automaticallyAdjustContentInsets: _react2.default.PropTypes.bool,
    showsPagination: _react2.default.PropTypes.bool,
    showsButtons: _react2.default.PropTypes.bool,
    loop: _react2.default.PropTypes.bool,
    autoplay: _react2.default.PropTypes.bool,
    autoplayTimeout: _react2.default.PropTypes.number,
    autoplayDirection: _react2.default.PropTypes.bool,
    index: _react2.default.PropTypes.number,
    renderPagination: _react2.default.PropTypes.func
  },

  mixins: [_reactTimerMixin2.default],

  /**
   * Default props
   * @return {object} props
   * @see http://facebook.github.io/react-native/docs/scrollview.html
   */
  getDefaultProps: function getDefaultProps() {
    return {
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
      loop: true,
      autoplay: false,
      autoplayTimeout: 2.5,
      autoplayDirection: true,
      index: 0
    };
  },


  /**
   * Init states
   * @return {object} states
   */
  getInitialState: function getInitialState() {
    return this.initState(this.props);
  },


  /**
   * autoplay timer
   * @type {null}
   */
  autoplayTimer: null,

  componentWillMount: function componentWillMount() {
    this.props = this.injectState(this.props);
  },
  componentWillReceiveProps: function componentWillReceiveProps(props) {
    this.setState(this.initState(props));
  },
  componentDidMount: function componentDidMount() {
    this.autoplay();
  },
  initState: function initState(props) {
    var initState = {
      isScrolling: false,
      autoplayEnd: false
    };

    initState.total = props.children ? props.children.length || 1 : 0;
    initState.index = initState.total > 1 ? Math.min(props.index, initState.total - 1) : 0;

    // Default: horizontal
    initState.dir = props.horizontal == false ? 'y' : 'x';
    initState.width = props.width || width;
    initState.height = props.height || height;
    initState.offset = {};

    if (initState.total > 1) {
      var setup = initState.index;
      if (props.loop) {
        setup++;
      }
      initState.offset[initState.dir] = initState.dir == 'y' ? initState.height * setup : initState.width * setup;
    }
    return initState;
  },


  /**
   * Automatic rolling
   */
  autoplay: function autoplay() {
    var _this = this;

    if (!Array.isArray(this.props.children) || !this.props.autoplay || this.state.isScrolling || this.state.autoplayEnd) return;

    clearTimeout(this.autoplayTimer);

    this.autoplayTimer = this.setTimeout(function () {
      if (!_this.props.loop && (_this.props.autoplayDirection ? _this.state.index == _this.state.total - 1 : _this.state.index == 0)) return _this.setState({
        autoplayEnd: true
      });
      _this.scrollTo(_this.props.autoplayDirection ? 1 : -1);
    }, this.props.autoplayTimeout * 1000);
  },


  /**
   * Scroll begin handle
   * @param  {object} e native event
   */
  onScrollBegin: function onScrollBegin(e) {
    var _this2 = this;

    // update scroll state
    this.setState({
      isScrolling: true
    });

    this.setTimeout(function () {
      _this2.props.onScrollBeginDrag && _this2.props.onScrollBeginDrag(e, _this2.state, _this2);
    });
  },


  /**
   * Scroll end handle
   * @param  {object} e native event
   */
  onScrollEnd: function onScrollEnd(e) {
    var _this3 = this;

    // update scroll state
    this.setState({
      isScrolling: false
    });

    // making our events coming from android compatible to updateIndex logic
    if (!e.nativeEvent.contentOffset) {
      if (this.state.dir == 'x') {
        e.nativeEvent.contentOffset = { x: e.nativeEvent.position * this.state.width };
      } else {
        e.nativeEvent.contentOffset = { y: e.nativeEvent.position * this.state.height };
      }
    }

    this.updateIndex(e.nativeEvent.contentOffset, this.state.dir);

    // Note: `this.setState` is async, so I call the `onMomentumScrollEnd`
    // in setTimeout to ensure synchronous update `index`
    this.setTimeout(function () {
      _this3.autoplay();

      // if `onMomentumScrollEnd` registered will be called here
      _this3.props.onMomentumScrollEnd && _this3.props.onMomentumScrollEnd(e, _this3.state, _this3);
    });
  },


  /**
   * Update index after scroll
   * @param  {object} offset content offset
   * @param  {string} dir    'x' || 'y'
   */
  updateIndex: function updateIndex(offset, dir) {

    var state = this.state;
    var index = state.index;
    var diff = offset[dir] - state.offset[dir];
    var step = dir == 'x' ? state.width : state.height;

    // Do nothing if offset no change.
    if (!diff) return;

    // Note: if touch very very quickly and continuous,
    // the variation of `index` more than 1.
    index = index + diff / step;

    if (this.props.loop) {
      if (index <= -1) {
        index = state.total - 1;
        offset[dir] = step * state.total;
      } else if (index >= state.total) {
        index = 0;
        offset[dir] = step;
      }
    }

    this.setState({
      index: index,
      offset: offset
    });
  },


  /**
   * Scroll by index
   * @param  {number} index offset index
   */
  scrollTo: function scrollTo(index) {
    var _this4 = this;

    if (this.state.isScrolling || this.state.total < 2) return;
    var state = this.state;
    var diff = (this.props.loop ? 1 : 0) + index + this.state.index;
    var x = 0;
    var y = 0;
    if (state.dir == 'x') x = diff * state.width;
    if (state.dir == 'y') y = diff * state.height;

    if (_reactNative.Platform.OS === 'android') {
      this.refs.scrollView && this.refs.scrollView.setPage(diff);
    } else {
      this.refs.scrollView && this.refs.scrollView.scrollTo({
        y: y,
        x: x
      });
    }

    // update scroll state
    this.setState({
      isScrolling: true,
      autoplayEnd: false
    });

    // trigger onScrollEnd manually in android
    if (_reactNative.Platform.OS === 'android') {
      this.setTimeout(function () {
        _this4.onScrollEnd({
          nativeEvent: {
            position: diff
          }
        });
      }, 50);
    }
  },


  /**
   * Render pagination
   * @return {object} react-dom
   */
  renderPagination: function renderPagination() {

    // By default, dots only show when `total` > 2
    if (this.state.total <= 1) return null;

    var dots = [];
    var ActiveDot = this.props.activeDot || _react2.default.createElement(_reactNative.View, { style: {
        backgroundColor: '#007aff',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
      } });
    var Dot = this.props.dot || _react2.default.createElement(_reactNative.View, { style: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
      } });
    for (var i = 0; i < this.state.total; i++) {
      dots.push(i === this.state.index ? _react2.default.cloneElement(ActiveDot, { key: i }) : _react2.default.cloneElement(Dot, { key: i }));
    }

    return _react2.default.createElement(
      _reactNative.View,
      { pointerEvents: 'none', style: [styles['pagination_' + this.state.dir], this.props.paginationStyle] },
      dots
    );
  },
  renderTitle: function renderTitle() {
    var child = this.props.children[this.state.index];
    var title = child && child.props.title;
    return title ? _react2.default.createElement(
      _reactNative.View,
      { style: styles.title },
      this.props.children[this.state.index].props.title
    ) : null;
  },
  renderNextButton: function renderNextButton() {
    var _this5 = this;

    var button = void 0;

    if (this.props.loop || this.state.index != this.state.total - 1) {
      button = this.props.nextButton || _react2.default.createElement(
        _reactNative.Text,
        { style: styles.buttonText },
        '›'
      );
    }

    return _react2.default.createElement(
      _reactNative.TouchableOpacity,
      { onPress: function onPress() {
          return button !== null && _this5.scrollTo.call(_this5, 1);
        } },
      _react2.default.createElement(
        _reactNative.View,
        null,
        button
      )
    );
  },
  renderPrevButton: function renderPrevButton() {
    var _this6 = this;

    var button = null;

    if (this.props.loop || this.state.index != 0) {
      button = this.props.prevButton || _react2.default.createElement(
        _reactNative.Text,
        { style: styles.buttonText },
        '‹'
      );
    }

    return _react2.default.createElement(
      _reactNative.TouchableOpacity,
      { onPress: function onPress() {
          return button !== null && _this6.scrollTo.call(_this6, -1);
        } },
      _react2.default.createElement(
        _reactNative.View,
        null,
        button
      )
    );
  },
  renderButtons: function renderButtons() {
    return _react2.default.createElement(
      _reactNative.View,
      { pointerEvents: 'box-none', style: [styles.buttonWrapper, { width: this.state.width, height: this.state.height }, this.props.buttonWrapperStyle] },
      this.renderPrevButton(),
      this.renderNextButton()
    );
  },
  renderScrollView: function renderScrollView(pages) {
    if (_reactNative.Platform.OS === 'ios') return _react2.default.createElement(
      _reactNative.ScrollView,
      _extends({ ref: 'scrollView'
      }, this.props, {
        contentContainerStyle: [styles.wrapper, this.props.style],
        contentOffset: this.state.offset,
        onScrollBeginDrag: this.onScrollBegin,
        onMomentumScrollEnd: this.onScrollEnd }),
      pages
    );
    return _react2.default.createElement(
      _reactNative.ViewPagerAndroid,
      _extends({ ref: 'scrollView'
      }, this.props, {
        initialPage: this.state.index,
        onPageSelected: this.onScrollEnd,
        style: { flex: 1 } }),
      pages
    );
  },

  /**
   * Inject state to ScrollResponder
   * @param  {object} props origin props
   * @return {object} props injected props
   */
  injectState: function injectState(props) {
    var _this7 = this;

    /*    const scrollResponders = [
          'onMomentumScrollBegin',
          'onTouchStartCapture',
          'onTouchStart',
          'onTouchEnd',
          'onResponderRelease',
        ]*/

    for (var prop in props) {
      // if(~scrollResponders.indexOf(prop)
      if (typeof props[prop] === 'function' && prop !== 'onMomentumScrollEnd' && prop !== 'renderPagination' && prop !== 'onScrollBeginDrag') {
        (function () {
          var originResponder = props[prop];
          props[prop] = function (e) {
            return originResponder(e, _this7.state, _this7);
          };
        })();
      }
    }

    return props;
  },


  /**
   * Default render
   * @return {object} react-dom
   */
  render: function render() {
    var state = this.state;
    var props = this.props;
    var children = props.children;
    var index = state.index;
    var total = state.total;
    var loop = props.loop;
    var dir = state.dir;
    var key = 0;

    var pages = [];
    var pageStyle = [{ width: state.width, height: state.height }, styles.slide];

    // For make infinite at least total > 1
    if (total > 1) {

      // Re-design a loop model for avoid img flickering
      pages = Object.keys(children);
      if (loop) {
        pages.unshift(total - 1);
        pages.push(0);
      }

      pages = pages.map(function (page, i) {
        return _react2.default.createElement(
          _reactNative.View,
          { style: pageStyle, key: i },
          children[page]
        );
      });
    } else pages = _react2.default.createElement(
      _reactNative.View,
      { style: pageStyle },
      children
    );

    return _react2.default.createElement(
      _reactNative.View,
      { style: [styles.container, {
          width: state.width,
          height: state.height
        }] },
      this.renderScrollView(pages),
      props.showsPagination && (props.renderPagination ? this.props.renderPagination(state.index, state.total, this) : this.renderPagination()),
      this.renderTitle(),
      this.props.showsButtons && this.renderButtons()
    );
  }
});