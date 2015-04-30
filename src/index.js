'use strict'
/*
react-native-swiper

feaure:
[x] loop
[x] dir
[x] custom style
[x] title
[x] multiple instances
[x] custom size
[x] control buttons
[x] autoplay
[ ] more switch effect

params(props):
- dir "x" || "y" @default: "x"

-dot Optionally provide the dot object show in pagination
 */
import React, {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

// Using bare setTimeout, setInterval, setImmediate and requestAnimationFrame calls is very dangerous because if you forget to cancel the request before the component is unmounted, you risk the callback throwing an exception.
import TimerMixin from 'react-timer-mixin'
import Dimensions from 'Dimensions'

let { width, height } = Dimensions.get('window')

/**
 * Default styles
 * @type {StyleSheetPropType}
 */
let styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
  },

  wrapper: {
    backgroundColor: 'transparent',
  },

  slide: {
    backgroundColor: 'transparent',
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
    backgroundColor:'transparent',
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
    backgroundColor:'transparent',
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
    backgroundColor: 'transparent',
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
    fontFamily: 'Arial',
  },
})

export default React.createClass({

  /**
   * Props Validation
   * @type {Object}
   */
  propTypes: {
    horizontal                       : React.PropTypes.bool,
    children                         : React.PropTypes.node.isRequired,
    style                            : View.propTypes.style,
    pagingEnabled                    : React.PropTypes.bool,
    showsHorizontalScrollIndicator   : React.PropTypes.bool,
    showsVerticalScrollIndicator     : React.PropTypes.bool,
    bounces                          : React.PropTypes.bool,
    scrollsToTop                     : React.PropTypes.bool,
    removeClippedSubviews            : React.PropTypes.bool,
    automaticallyAdjustContentInsets : React.PropTypes.bool,
    showsPagination                  : React.PropTypes.bool,
    showsButtons                     : React.PropTypes.bool,
    loop                             : React.PropTypes.bool,
    autoplay                         : React.PropTypes.bool,
    autoplayTimeout                  : React.PropTypes.number,
    autoplayDirection                : React.PropTypes.bool,
    index                            : React.PropTypes.number,
    renderPagination                 : React.PropTypes.func,
  },

  mixins: [TimerMixin],

  /**
   * Default props
   * @return {object} props
   * @see http://facebook.github.io/react-native/docs/scrollview.html
   */
  getDefaultProps() {
    return {
      horizontal                       : true,
      pagingEnabled                    : true,
      showsHorizontalScrollIndicator   : false,
      showsVerticalScrollIndicator     : false,
      bounces                          : false,
      scrollsToTop                     : false,
      removeClippedSubviews            : true,
      automaticallyAdjustContentInsets : false,
      showsPagination                  : true,
      showsButtons                     : false,
      loop                             : true,
      autoplay                         : false,
      autoplayTimeout                  : 2.5,
      autoplayDirection                : true,
      index                            : 0,
    }
  },

  /**
   * Init states
   * @return {object} states
   */
  getInitialState() {
    let props = this.props
    let length = props.children ? (props.children.length || 1) : 0
    return {
      index: length > 1 ? props.index : 0,
      total: length,
      dir: props.horizontal == false ? 'y' : 'x',
      width: props.width || width,
      height: props.height || height,
      isScrolling: false,
      autoplayEnd: false,
    }
  },

  /**
   * autoplay timer
   * @type {null}
   */
  autoplayTimer: null,

  componentDidMount() {
  },

  autoplay() {
    if(!this.props.autoplay || this.state.isScrolling || this.state.autoplayEnd) return
    clearTimeout(this.autoplayTimer)
    this.autoplayTimer = this.setTimeout(() => {
      if(!this.props.loop && (this.props.autoplayDirection
          ? this.state.index == this.state.total - 1
          : this.state.index == 0)) return this.setState({
        autoplayEnd: true
      })
      this.scrollTo(this.props.autoplayDirection ? 1 : -1)
    }, this.props.autoplayTimeout * 1000)
  },

  /**
   * Scroll end handle
   * @param  {object} e native event
   */
  onScrollEnd(e) {

    // update scroll state
    this.setState({
      isScrolling: false
    })

    let offset = e.nativeEvent.contentOffset
    this.updateIndex(offset, this.state.dir)

    // if `onMomentumScrollEnd` registered will be called here
    this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd.call(this)
  },

  /**
   * Update index after scroll
   * @param  {object} offset content offset
   * @param  {string} dir    'x' || 'y'
   */
  updateIndex(offset, dir) {
    offset = offset[dir]
    let state = this.state
    let index = state.index
    let diff = dir == 'x' ? state.width : state.height
    if(this.props.loop) {
      if(offset > diff) index++
      else if(offset < diff) index--
      if(index == -1) index = state.total - 1
      else if(index == state.total) index = 0
    }
    else index = Math.floor((offset - diff / 2) / diff) + 1
    this.setState({
      index: index
    })
  },

  /**
   * Scroll by index
   * @param  {number} index offset index
   */
  scrollTo(index) {
    if(this.state.isScrolling) return
    let state = this.state
    let diff = (this.props.loop ? 1 : this.state.index) + index
    let x = 0
    let y = 0
    if(state.dir == 'x') x = diff * state.width
    if(state.dir == 'y') y = diff * state.height
    this.refs.scrollView && this.refs.scrollView.scrollTo(y, x)

    // update scroll state
    this.setState({
      isScrolling: true,
      autoplayEnd: false,
    })
  },

  /**
   * Render pagination
   * @return {object} react-dom
   */
  renderPagination() {

    // By default, dots only show when `total` > 2
    if(this.state.total <= 1) return null

    let dots = []
    for(let i = 0; i < this.state.total; i++) {
      dots.push(i === this.state.index
        ? (this.props.activeDot || <View style={{
            backgroundColor: '#007aff',
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3,
          }} />)
        : (this.props.dot || <View style={{
            backgroundColor:'rgba(0,0,0,.2)',
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3,
          }} />)
      )
    }

    return (
      <View pointerEvents='none' style={[styles['pagination_' + this.state.dir], this.props.paginationStyle]}>
        {dots}
      </View>
    )
  },

  renderTitle() {
    let child = this.props.children[this.state.index]
    let title = child && child.props.title
    return title
      ? (
        <View style={styles.title}>
          {this.props.children[this.state.index].props.title}
        </View>
      )
      : null
  },

  renderButtons() {

    let nextButton = this.props.nextButton || <Text style={[styles.buttonText, {color: !this.props.loop && this.state.index == this.state.total - 1 ? 'rgba(0,0,0,0)' : '#007aff'}]}>›</Text>

    let prevButton = this.props.prevButton || <Text style={[styles.buttonText, {color: !this.props.loop && this.state.index == 0 ? 'rgba(0,0,0,0)' : '#007aff'}]}>‹</Text>

    return (
      <View pointerEvents='box-none' style={[styles.buttonWrapper, {width: this.state.width, height: this.state.height}, this.props.buttonWrapperStyle]}>
        <TouchableOpacity onPress={() => !(!this.props.loop && this.state.index == 0) && this.scrollTo.call(this, -1)}>
          <View>
            {prevButton}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => !(!this.props.loop && this.state.index == this.state.total - 1) && this.scrollTo.call(this, 1)}>
          <View>
            {nextButton}
          </View>
        </TouchableOpacity>
      </View>
    )
  },

  /**
   * Default render
   * @return {object} react-dom
   */
  render() {
    let state = this.state
    let props = this.props
    let children = props.children
    let index = state.index
    let total = state.total
    let loop = props.loop
    let dir = state.dir
    let initOffset = {}
    let key = 0

    let pages = []
    let pageStyle = [{width: state.width, height: state.height}, styles.slide]

    // For make infinite at least total > 1
    if(total > 1) {
      if(loop) {
        pages.push(index == 0 ? total - 1 : index - 1)
        pages.push(index)
        pages.push(index == total - 1 ? 0 : index + 1)
        key = index
      }
      else pages = Object.keys(children)
      pages = pages.map((page, i) =>
        <View style={pageStyle} key={i}>{children[page]}</View>
      )

      let setup = loop ? 1 : index
      initOffset[dir] = dir == 'y'
        ? state.height * setup
        : state.width * setup
    }
    else pages = <View style={pageStyle}>{children}</View>

    this.autoplay()

    return (
      <View style={[styles.container, {
        width: state.width,
        height: state.height
      }]}>
        <ScrollView ref="scrollView"
          {...props}
          contentContainerStyle={[styles.wrapper, props.style]}
          contentOffset={initOffset}
          onMomentumScrollEnd={this.onScrollEnd}
          key={key}>
          {pages}
        </ScrollView>
        {props.showsPagination && (props.renderPagination
          ? this.props.renderPagination.call(this, state.index, state.total)
          : this.renderPagination())}
        {this.renderTitle()}
        {this.props.showsButtons && this.renderButtons()}
      </View>
    )
  }
})
