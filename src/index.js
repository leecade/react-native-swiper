/**
 * react-native-swiper
 * @author leecade<leecade@163.com>
 */
import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ViewPagerAndroid,
  Platform,
  ActivityIndicator
} from 'react-native'

const { width, height } = Dimensions.get('window')

/**
 * Default styles
 * @type {StyleSheetPropType}
 */
const styles = {
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
}

// missing `module.exports = exports['default'];` with babel6
// export default React.createClass({
export default class extends Component {
  /**
   * Props Validation
   * @type {Object}
   */
  static propTypes = {
    horizontal: PropTypes.bool,
    children: PropTypes.node.isRequired,
    style: View.propTypes.style,
    pagingEnabled: PropTypes.bool,
    showsHorizontalScrollIndicator: PropTypes.bool,
    showsVerticalScrollIndicator: PropTypes.bool,
    bounces: PropTypes.bool,
    scrollsToTop: PropTypes.bool,
    removeClippedSubviews: PropTypes.bool,
    automaticallyAdjustContentInsets: PropTypes.bool,
    showsPagination: PropTypes.bool,
    showsButtons: PropTypes.bool,
    loadMinimal: PropTypes.bool,
    loadMinimalSize: PropTypes.number,
    loadMinimalLoader: PropTypes.element,
    loop: PropTypes.bool,
    autoplay: PropTypes.bool,
    autoplayTimeout: PropTypes.number,
    autoplayDirection: PropTypes.bool,
    index: PropTypes.number,
    renderPagination: PropTypes.func,
    dotStyle: PropTypes.object,
    activeDotStyle: PropTypes.object,
    dotColor: PropTypes.string,
    activeDotColor: PropTypes.string
  }

  /**
   * Default props
   * @return {object} props
   * @see http://facebook.github.io/react-native/docs/scrollview.html
   */
  static defaultProps = {
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
    loadMinimal: false,
    loadMinimalSize: 1,
    autoplay: false,
    autoplayTimeout: 2.5,
    autoplayDirection: true,
    index: 0
  }

  /**
   * Init states
   * @return {object} states
   */
  state = this.initState(this.props, true)

  /**
   * autoplay timer
   * @type {null}
   */
  autoplayTimer = null
  loopJumpTimer = null

  componentWillReceiveProps (nextProps) {
    const sizeChanged = (nextProps.width || width) !== this.state.width ||
                        (nextProps.height || height) !== this.state.height
    if (!nextProps.autoplay && this.autoplayTimer) clearTimeout(this.autoplayTimer)
    this.setState(this.initState(nextProps, sizeChanged))
  }

  componentDidMount () {
    this.autoplay()
  }

  componentWillUnmount () {
    this.autoplayTimer && clearTimeout(this.autoplayTimer)
    this.loopJumpTimer && clearTimeout(this.loopJumpTimer)
  }

  initState (props, setOffsetInState) {
    // set the current state
    const state = this.state || {}

    const initState = {
      autoplayEnd: false,
      loopJump: false
    }

    const newInternals = {
      isScrolling: false
    }

    initState.total = props.children ? props.children.length || 1 : 0

    if (state.total === initState.total) {
      // retain the index
      initState.index = state.index
    } else {
      // reset the index
      setOffsetInState = true // if the index is reset, go ahead and update the offset in state
      initState.index = initState.total > 1 ? Math.min(props.index, initState.total - 1) : 0
    }

    // Default: horizontal
    initState.dir = props.horizontal === false ? 'y' : 'x'
    initState.width = props.width || width
    initState.height = props.height || height
    newInternals.offset = {}

    if (initState.total > 1) {
      let setup = initState.index
      if (props.loop) {
        setup++
      }
      newInternals.offset[initState.dir] = initState.dir === 'y'
        ? initState.height * setup
        : initState.width * setup
    }

    // only update the offset in state if needed, updating offset while swiping
    // causes some bad jumping / stuttering
    if (setOffsetInState) {
      initState.offset = newInternals.offset
    }

    this.internals = newInternals
    return initState
  }

  // include internals with state
  fullState () {
    return Object.assign({}, this.state, this.internals)
  }

  loopJump = () => {
    if (!this.state.loopJump) return
    const i = this.state.index + (this.props.loop ? 1 : 0)
    const scrollView = this.refs.scrollView
    this.loopJumpTimer = setTimeout(() => scrollView.setPageWithoutAnimation &&
      scrollView.setPageWithoutAnimation(i), 50)
  }

  /**
   * Automatic rolling
   */
  autoplay = () => {
    if (!Array.isArray(this.props.children) ||
      !this.props.autoplay ||
      this.internals.isScrolling ||
      this.state.autoplayEnd) return

    this.autoplayTimer && clearTimeout(this.autoplayTimer)
    this.autoplayTimer = setTimeout(() => {
      if (!this.props.loop && (
          this.props.autoplayDirection
            ? this.state.index === this.state.total - 1
            : this.state.index === 0
        )
      ) return this.setState({ autoplayEnd: true })

      this.scrollBy(this.props.autoplayDirection ? 1 : -1)
    }, this.props.autoplayTimeout * 1000)
  }

  /**
   * Scroll begin handle
   * @param  {object} e native event
   */
  onScrollBegin = e => {
    // update scroll state
    this.internals.isScrolling = true
    this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e, this.fullState(), this)
  }

  /**
   * Scroll end handle
   * @param  {object} e native event
   */
  onScrollEnd = e => {
    // update scroll state
    this.internals.isScrolling = false

    // making our events coming from android compatible to updateIndex logic
    if (!e.nativeEvent.contentOffset) {
      if (this.state.dir === 'x') {
        e.nativeEvent.contentOffset = {x: e.nativeEvent.position * this.state.width}
      } else {
        e.nativeEvent.contentOffset = {y: e.nativeEvent.position * this.state.height}
      }
    }

    this.updateIndex(e.nativeEvent.contentOffset, this.state.dir, () => {
      this.autoplay()
      this.loopJump()

      // if `onMomentumScrollEnd` registered will be called here
      this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(e, this.fullState(), this)
    })
  }

  /*
   * Drag end handle
   * @param {object} e native event
   */
  onScrollEndDrag = e => {
    const { contentOffset } = e.nativeEvent
    const { horizontal, children } = this.props
    const { index } = this.state
    const { offset } = this.internals
    const previousOffset = horizontal ? offset.x : offset.y
    const newOffset = horizontal ? contentOffset.x : contentOffset.y

    if (previousOffset === newOffset &&
      (index === 0 || index === children.length - 1)) {
      this.internals.isScrolling = false
    }
  }

  /**
   * Update index after scroll
   * @param  {object} offset content offset
   * @param  {string} dir    'x' || 'y'
   */
  updateIndex = (offset, dir, cb) => {
    const state = this.state
    let index = state.index
    const diff = offset[dir] - this.internals.offset[dir]
    const step = dir === 'x' ? state.width : state.height
    let loopJump = false

    // Do nothing if offset no change.
    if (!diff) return

    // Note: if touch very very quickly and continuous,
    // the variation of `index` more than 1.
    // parseInt() ensures it's always an integer
    index = parseInt(index + Math.round(diff / step))

    if (this.props.loop) {
      if (index <= -1) {
        index = state.total - 1
        offset[dir] = step * state.total
        loopJump = true
      } else if (index >= state.total) {
        index = 0
        offset[dir] = step
        loopJump = true
      }
    }

    const newState = {}
    newState.index = index
    newState.loopJump = loopJump

    this.internals.offset = offset

    // only update offset in state if loopJump is true
    if (loopJump) {
      // when swiping to the beginning of a looping set for the third time,
      // the new offset will be the same as the last one set in state.
      // Setting the offset to the same thing will not do anything,
      // so we increment it by 1 then immediately set it to what it should be,
      // after render.
      if (offset[dir] === this.state.offset[dir]) {
        newState.offset = { x: 0, y: 0 }
        newState.offset[dir] = offset[dir] + 1
        this.setState(newState, () => {
          this.setState({ offset: offset }, cb)
        })
      } else {
        newState.offset = offset
        this.setState(newState, cb)
      }
    } else {
      this.setState(newState, cb)
    }
  }

  /**
   * Scroll by index
   * @param  {number} index offset index
   * @param  {bool} animated
   */

  scrollBy = (index, animated = true) => {
    if (this.internals.isScrolling || this.state.total < 2) return
    const state = this.state
    const diff = (this.props.loop ? 1 : 0) + index + this.state.index
    let x = 0
    let y = 0
    if (state.dir === 'x') x = diff * state.width
    if (state.dir === 'y') y = diff * state.height

    if (Platform.OS === 'android') {
      this.refs.scrollView && this.refs.scrollView[animated ? 'setPage' : 'setPageWithoutAnimation'](diff)
    } else {
      this.refs.scrollView && this.refs.scrollView.scrollTo({ x, y, animated })
    }

    // update scroll state
    this.internals.isScrolling = true
    this.setState({
      autoplayEnd: false
    })

    // trigger onScrollEnd manually in android
    if (!animated || Platform.OS === 'android') {
      setImmediate(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff
          }
        })
      })
    }
  }

  scrollViewPropOverrides = () => {
    const props = this.props
    let overrides = {}

    /*
    const scrollResponders = [
      'onMomentumScrollBegin',
      'onTouchStartCapture',
      'onTouchStart',
      'onTouchEnd',
      'onResponderRelease',
    ]
    */

    for (let prop in props) {
      // if(~scrollResponders.indexOf(prop)
      if (typeof props[prop] === 'function' &&
        prop !== 'onMomentumScrollEnd' &&
        prop !== 'renderPagination' &&
        prop !== 'onScrollBeginDrag'
      ) {
        let originResponder = props[prop]
        overrides[prop] = (e) => originResponder(e, this.fullState(), this)
      }
    }

    return overrides
  }

  /**
   * Render pagination
   * @return {object} react-dom
   */
  renderPagination = () => {
     // By default, dots only show when `total` >= 2
    if (this.state.total <= 1) return null

    let dots = []
    const ActiveDot = this.props.activeDot || <View style={[{
      backgroundColor: this.props.activeDotColor || '#007aff',
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3
    }, this.props.activeDotStyle]} />
    const Dot = this.props.dot || <View style={[{
      backgroundColor: this.props.dotColor || 'rgba(0,0,0,.2)',
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3
    }, this.props.dotStyle ]} />
    for (let i = 0; i < this.state.total; i++) {
      dots.push(i === this.state.index
        ? React.cloneElement(ActiveDot, {key: i})
        : React.cloneElement(Dot, {key: i})
      )
    }

    return (
      <View pointerEvents='none' style={[styles['pagination_' + this.state.dir], this.props.paginationStyle]}>
        {dots}
      </View>
    )
  }

  renderTitle = () => {
    const child = this.props.children[this.state.index]
    const title = child && child.props && child.props.title
    return title
      ? (<View style={styles.title}>
        {this.props.children[this.state.index].props.title}
      </View>)
      : null
  }

  renderNextButton = () => {
    let button = null

    if (this.props.loop ||
      this.state.index !== this.state.total - 1) {
      button = this.props.nextButton || <Text style={styles.buttonText}>›</Text>
    }

    return (
      <TouchableOpacity onPress={() => button !== null && this.scrollBy(1)}>
        <View>
          {button}
        </View>
      </TouchableOpacity>
    )
  }

  renderPrevButton = () => {
    let button = null

    if (this.props.loop || this.state.index !== 0) {
      button = this.props.prevButton || <Text style={styles.buttonText}>‹</Text>
    }

    return (
      <TouchableOpacity onPress={() => button !== null && this.scrollBy(-1)}>
        <View>
          {button}
        </View>
      </TouchableOpacity>
    )
  }

  renderButtons = () => {
    return (
      <View pointerEvents='box-none' style={[styles.buttonWrapper, {
        width: this.state.width,
        height: this.state.height
      }, this.props.buttonWrapperStyle]}>
        {this.renderPrevButton()}
        {this.renderNextButton()}
      </View>
    )
  }

  renderScrollView = pages => {
    if (Platform.OS === 'ios') {
      return (
        <ScrollView ref='scrollView'
          {...this.props}
          {...this.scrollViewPropOverrides()}
          contentContainerStyle={[styles.wrapper, this.props.style]}
          contentOffset={this.state.offset}
          onScrollBeginDrag={this.onScrollBegin}
          onMomentumScrollEnd={this.onScrollEnd}
          onScrollEndDrag={this.onScrollEndDrag}>
          {pages}
        </ScrollView>
       )
    }
    return (
      <ViewPagerAndroid ref='scrollView'
        {...this.props}
        initialPage={this.props.loop ? this.state.index + 1 : this.state.index}
        onPageSelected={this.onScrollEnd}
        style={{flex: 1}}>
        {pages}
      </ViewPagerAndroid>
    )
  }

  /**
   * Default render
   * @return {object} react-dom
   */
  render () {
    const state = this.state
    const props = this.props
    const children = props.children
    const index = state.index
    const total = state.total
    const loop = props.loop
    // let dir = state.dir
    // let key = 0
    const loopVal = loop ? 1 : 0

    let pages = []

    const pageStyle = [{width: state.width, height: state.height}, styles.slide]
    const pageStyleLoading = {
      width: this.state.width,
      height: this.state.height,
      justifyContent: 'center',
      alignItems: 'center'
    }

    // For make infinite at least total > 1
    if (total > 1) {
      // Re-design a loop model for avoid img flickering
      pages = Object.keys(children)
      if (loop) {
        pages.unshift(total - 1 + '')
        pages.push('0')
      }

      pages = pages.map((page, i) => {
        if (props.loadMinimal) {
          if (i >= (index + loopVal - props.loadMinimalSize) &&
            i <= (index + loopVal + props.loadMinimalSize)) {
            return <View style={pageStyle} key={i}>{children[page]}</View>
          } else {
            return (
              <View style={pageStyleLoading} key={`loading-${i}`}>
                {props.loadMinimalLoader ? props.loadMinimalLoader : <ActivityIndicator />}
              </View>
            )
          }
        } else {
          return <View style={pageStyle} key={i}>{children[page]}</View>
        }
      })
    } else {
      pages = <View style={pageStyle} key={0}>{children}</View>
    }

    return (
      <View style={[styles.container, {
        width: state.width,
        height: state.height
      }]}>
        {this.renderScrollView(pages)}
        {props.showsPagination && (props.renderPagination
          ? this.props.renderPagination(state.index, state.total, this)
          : this.renderPagination())}
        {this.renderTitle()}
        {this.props.showsButtons && this.renderButtons()}
      </View>
    )
  }
}
