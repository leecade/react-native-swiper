/**
 * react-native-swiper
 * @author leecade<leecade@163.com>
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  ViewPropTypes,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  ActivityIndicator
} from 'react-native'

/**
 * Default styles
 * @type {StyleSheetPropType}
 */
const styles = {
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
    color: '#007aff'
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
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    scrollViewStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    pagingEnabled: PropTypes.bool,
    showsHorizontalScrollIndicator: PropTypes.bool,
    showsVerticalScrollIndicator: PropTypes.bool,
    bounces: PropTypes.bool,
    scrollsToTop: PropTypes.bool,
    removeClippedSubviews: PropTypes.bool,
    automaticallyAdjustContentInsets: PropTypes.bool,
    showsPagination: PropTypes.bool,
    showsButtons: PropTypes.bool,
    disableNextButton: PropTypes.bool,
    disablePrevButton: PropTypes.bool,
    loadMinimal: PropTypes.bool,
    loadMinimalSize: PropTypes.number,
    loadMinimalLoader: PropTypes.element,
    loop: PropTypes.bool,
    autoplay: PropTypes.bool,
    autoplayTimeout: PropTypes.number,
    autoplayDirection: PropTypes.bool,
    index: PropTypes.number,
    renderPagination: PropTypes.func,
    dotStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    activeDotStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    dotColor: PropTypes.string,
    activeDotColor: PropTypes.string,
    /**
     * Called when the index has changed because the user swiped.
     */
    onIndexChanged: PropTypes.func,

    showAdjacentViews: PropTypes.bool,
    adjacentViewsWidth: PropTypes.number,
    adjacentViewsPadding: PropTypes.number,
    decelerationRate: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['fast', 'normal'])
    ])
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
    disableNextButton: false,
    disablePrevButton: false,
    loop: true,
    loadMinimal: false,
    loadMinimalSize: 1,
    autoplay: false,
    autoplayTimeout: 2.5,
    autoplayDirection: true,
    index: 0,
    onIndexChanged: () => null,

    showAdjacentViews: false,
    adjacentViewsWidth: 8,
    adjacentViewsPadding: 4,
    decelerationRate: 'normal'
  }

  /**
   * Init states
   * @return {object} states
   */
  state = this.initState(this.props)

  /**
   * Initial render flag
   * @type {bool}
   */
  initialRender = true

  /**
   * autoplay timer
   * @type {null}
   */
  autoplayTimer = null
  loopJumpTimer = null

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.autoplay && this.autoplayTimer)
      clearTimeout(this.autoplayTimer)
    if (nextProps.index === this.props.index) return
    this.setState(
      this.initState(nextProps, this.props.index !== nextProps.index)
    )
  }

  componentDidMount() {
    this.autoplay()
  }

  componentWillUnmount() {
    this.autoplayTimer && clearTimeout(this.autoplayTimer)
    this.loopJumpTimer && clearTimeout(this.loopJumpTimer)
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    // If the index has changed, we notify the parent via the onIndexChanged callback
    if (this.state.index !== nextState.index)
      this.props.onIndexChanged(nextState.index)
  }

  componentDidUpdate(prevProps) {
    // If autoplay props updated to true, autoplay immediately
    if (this.props.autoplay && !prevProps.autoplay) {
      this.autoplay()
    }
    if (this.props.children !== prevProps.children) {
      if (this.props.loadMinimal && Platform.OS === 'ios') {
        this.setState({ ...this.props, index: this.state.index })
      } else {
        this.setState(
          this.initState({ ...this.props, index: this.state.index }, true)
        )
      }
    }
  }

  initState(props, updateIndex = false) {
    // set the current state
    const state = this.state || { width: 0, height: 0, offset: { x: 0, y: 0 } }

    const initState = {
      autoplayEnd: false,
      children: null,
      loopJump: false,
      offset: {}
    }

    // Support Optional render page
    initState.children = Array.isArray(props.children)
      ? props.children.filter((child) => child)
      : props.children

    initState.total = initState.children ? initState.children.length || 1 : 0

    if (state.total === initState.total && !updateIndex) {
      // retain the index
      initState.index = state.index
    } else {
      initState.index =
        initState.total > 1 ? Math.min(props.index, initState.total - 1) : 0
    }

    // Default: horizontal
    const { width, height } = Dimensions.get('window')

    initState.dir = props.horizontal === false ? 'y' : 'x'

    // By default RN-Swiper spreads the whole element to full-width,
    // So adjacentViewsWidth indicates number of px we need to show of adjacent View
    // and adjacentViewsPadding works like margin between these elements
    // So we take both of these and subtract with full-width to get new width

    const isHorizontal = props.horizontal

    const adjacentViewDiffWidth = this.props.showAdjacentViews
      ? this.props.adjacentViewsPadding + this.props.adjacentViewsWidth
      : 0

    const horizontalDiff = isHorizontal ? 2 * adjacentViewDiffWidth : 0
    const verticalDiff = isHorizontal ? 0 : 2 * adjacentViewDiffWidth

    if (props.width) {
      initState.width = props.width - horizontalDiff
    } else if (this.state && this.state.width) {
      initState.width = this.state.width
    } else {
      initState.width = width - horizontalDiff
    }

    if (props.height) {
      initState.height = props.height - verticalDiff
    } else if (this.state && this.state.height) {
      initState.height = this.state.height
    } else {
      initState.height = height - verticalDiff
    }

    // We duplicate 2 elements on both ends of list, so we need to consider this value
    // while calculating offset because 1 element is actually now positioned at 3 element in list
    // that's why 1+2=3
    let loopVal = this.props.loop ? 2 : 0
    initState.offset[initState.dir] =
      initState.dir === 'y'
        ? (initState.height * (props.index + loopVal)) - adjacentViewDiffWidth
        : (initState.width * (props.index + loopVal)) - adjacentViewDiffWidth

    this.internals = {
      ...this.internals,
      isScrolling: false,
      adjacentViewDiffWidth
    }
    return initState
  }

  // include internals with state
  fullState() {
    return Object.assign({}, this.state, this.internals)
  }

  onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout
    const offset = (this.internals.offset = { x: 0, y: 0 })
    const isHorizontal = this.props.horizontal
    const { adjacentViewDiffWidth } = this.internals
    const totalAdjacentWidth = 2 * adjacentViewDiffWidth
    const state = {
      width: width - (isHorizontal ? totalAdjacentWidth : 0),
      height: height - (isHorizontal ? 0 : totalAdjacentWidth)
    }

    if (this.state.total > 1) {
      let setup = this.state.index
      if (this.props.loop) {
        setup += 2
      }
      /// ScrollView renders from 0 pixels but we want a custom offset to scrollTo so our adjacent views can be displayed
      offset[this.state.dir] =
        this.state.dir === 'y'
          ? state.height * setup - adjacentViewDiffWidth
          : state.width * setup - adjacentViewDiffWidth
    }

    // only update the offset in state if needed, updating offset while swiping
    // causes some bad jumping / stuttering
    if (!this.state.offset) {
      state.offset = offset
    }

    // related to https://github.com/leecade/react-native-swiper/issues/570
    // contentOffset is not working in react 0.48.x so we need to use scrollTo
    // to emulate offset.
    if (this.state.total > 1) {
      this.scrollView.scrollTo({ ...offset, animated: false })
    }

    if (this.initialRender) {
      this.initialRender = false
    }

    this.setState(state)
  }

  loopJump = () => {
    if (!this.state.loopJump) return
    const i = this.state.index + (this.props.loop ? 2 : 0)
    const scrollView = this.scrollView
    const offsetDiff = this.internals.adjacentViewDiffWidth
    // RN-SWIPER duplicates last element in start and first element in last
    // So when we swipe from 0 to last-element (Which is duplicate element) or last-element to 0 (Which is duplicate element),
    // RN-SWIPER will fire this function to manually scroll to actual element
    // So we need to add our customOffset which is considered while loop jumping
    this.loopJumpTimer = setTimeout(
      () => {
        if (scrollView.setPageWithoutAnimation) {
          scrollView.setPageWithoutAnimation(i)
        } else {
          if (this.state.index === 0) {
            scrollView.scrollTo(
              this.props.horizontal === false
                ? {
                    x: 0,
                    y: 2 * this.state.height - offsetDiff,
                    animated: false
                  }
                : {
                    x: 2 * this.state.width - offsetDiff,
                    y: 0,
                    animated: false
                  }
            )
          } else if (this.state.index === 1) {
            this.props.horizontal === false
              ? this.scrollView.scrollTo({
                  x: 0,
                  y: 3 * this.state.height - offsetDiff,
                  animated: false
                })
              : this.scrollView.scrollTo({
                  x: 3 * this.state.width - offsetDiff,
                  y: 0,
                  animated: false
                })
          } else if (this.state.index === this.state.total - 1) {
            this.props.horizontal === false
              ? this.scrollView.scrollTo({
                  x: 0,
                  y: this.state.height * (this.state.total + 1) - offsetDiff,
                  animated: false
                })
              : this.scrollView.scrollTo({
                  x: this.state.width * (this.state.total + 1) - offsetDiff,
                  y: 0,
                  animated: false
                })
          } else if (this.state.index === this.state.total - 2) {
            this.props.horizontal === false
              ? this.scrollView.scrollTo({
                  x: 0,
                  y: this.state.height * this.state.total - offsetDiff,
                  animated: false
                })
              : this.scrollView.scrollTo({
                  x: this.state.width * this.state.total - offsetDiff,
                  y: 0,
                  animated: false
                })
          }
        }
      },
      // Important Parameter
      // ViewPager 50ms, ScrollView 300ms
      scrollView.setPageWithoutAnimation ? 50 : 300
    )
  }

  /**
   * Automatic rolling
   */
  autoplay = () => {
    if (
      !Array.isArray(this.state.children) ||
      !this.props.autoplay ||
      this.internals.isScrolling ||
      this.state.autoplayEnd
    )
      return

    this.autoplayTimer && clearTimeout(this.autoplayTimer)
    this.autoplayTimer = setTimeout(() => {
      if (
        !this.props.loop &&
        (this.props.autoplayDirection
          ? this.state.index === this.state.total - 1
          : this.state.index === 0)
      )
        return this.setState({ autoplayEnd: true })

      this.scrollBy(this.props.autoplayDirection ? 1 : -1)
    }, this.props.autoplayTimeout * 1000)
  }

  /**
   * Scroll begin handle
   * @param  {object} e native event
   */
  onScrollBegin = (e) => {
    // update scroll state
    this.internals.isScrolling = true
    this.props.onScrollBeginDrag &&
      this.props.onScrollBeginDrag(e, this.fullState(), this)
  }

  /**
   * Scroll end handle
   * @param  {object} e native event
   */
  onScrollEnd = (e) => {
    // update scroll state
    this.internals.isScrolling = false

    // making our events coming from android compatible to updateIndex logic
    if (!e.nativeEvent.contentOffset) {
      if (this.state.dir === 'x') {
        e.nativeEvent.contentOffset = {
          x: e.nativeEvent.position * this.state.width
        }
      } else {
        e.nativeEvent.contentOffset = {
          y: e.nativeEvent.position * this.state.height
        }
      }
    }
    // It breaks index values with greater adjacentWidth and padding
    // if (this.props.showAdjacentViews && this.state.dir === 'x') {
    //   e.nativeEvent.contentOffset.x = e.nativeEvent.contentOffset.x - (3 * this.internals.adjacentViewDiffWidth)
    // }

    this.updateIndex(e.nativeEvent.contentOffset, this.state.dir, () => {
      this.autoplay()
      this.loopJump()
    })
    // if `onMomentumScrollEnd` registered will be called here
    this.props.onMomentumScrollEnd &&
      this.props.onMomentumScrollEnd(e, this.fullState(), this)
  }

  /*
   * Drag end handle
   * @param {object} e native event
   */
  onScrollEndDrag = (e) => {
    const { contentOffset } = e.nativeEvent
    const { horizontal } = this.props
    const { children, index } = this.state
    const { offset } = this.internals
    const previousOffset = horizontal ? offset.x : offset.y
    const newOffset = horizontal ? contentOffset.x : contentOffset.y

    if (
      previousOffset === newOffset &&
      (index === 0 || index === children.length - 1)
    ) {
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
    // Android ScrollView will not scrollTo certain offset when props change
    let index = state.index
    if (!this.internals.offset)
      // Android not setting this onLayout first? https://github.com/leecade/react-native-swiper/issues/582
      this.internals.offset = {}

    const diff = offset[dir] - (this.internals.offset[dir] || 0)
    const step = dir === 'x' ? state.width : state.height
    let loopJump = false

    // Do nothing if offset no change.
    if (!diff) return

    const { total } = state
    // Some time when our swipe goes from last element to duplicate of first elemet it doesn't update index to over total limit
    // So it will never autoScroll to our orignal element that's why totalOffsetScreen ensures if we go out of the bounds
    // it will update the index to 0 and therefore our loop will start working absolutely fine
    const totalOffsetScreen = (total + 1) * step

    // Note: if touch very very quickly and continuous,
    // the variation of `index` more than 1.
    // parseInt() ensures it's always an integer
    index = parseInt(index + Math.round(diff / step))

    // During onLayout we fire one autoScroll and we need to maintain that same offset when we loop through
    // to give us accurate index, so step is full width of element including the padding
    // therefore we deduct the adjacentViewWidth and it's padding to get the accurate offset as before and get accurate index
    const diffOffset = this.internals.adjacentViewDiffWidth
    if (this.props.loop) {
      if (index <= -1) {
        // If swiping hard to from orignal 0 element user might end up seeing first duplicate element,
        // which is actually second last element of array so we manually scroll to particular that element
        // otherwise we will scroll to 0 element
        if (offset[dir] <= 0) {
          index = total - 2
          offset[dir] = step * total - diffOffset
          loopJump = true
        } else {
          index = total - 1
          offset[dir] = step * (total + 1) - diffOffset
          loopJump = true
        }
      } else if (index >= total || offset[dir] > totalOffsetScreen) {
        // If swiping hard to from orignal last element user might end up seeing last duplicate element,
        // which is actually second element of array so we manually scroll to particular that element
        // otherwise we will scroll to last element
        if (offset[dir] > totalOffsetScreen + step) {
          index = 1
          offset[dir] = step * 3 - diffOffset
          loopJump = true
        } else {
          index = 0
          offset[dir] = step * 2 - diffOffset
          loopJump = true
        }
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
      if (offset[dir] === this.internals.offset[dir]) {
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
    const diff = (this.props.loop ? 2 : 0) + index + this.state.index
    let x = 0
    let y = 0
    if (state.dir === 'x')
      x = diff * state.width - this.internals.adjacentViewDiffWidth
    if (state.dir === 'y')
      y = diff * state.height - this.internals.adjacentViewDiffWidth

    this.scrollView && this.scrollView.scrollTo({ x, y, animated })

    // update scroll state
    this.internals.isScrolling = true
    this.setState({
      autoplayEnd: false
    })

    // trigger onScrollEnd manually in android
    if (!animated || Platform.OS !== 'ios') {
      setImmediate(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff
          }
        })
      })
    }
  }

  /**
   * Scroll to index
   * @param  {number} index page
   * @param  {bool} animated
   */

  scrollTo = (index, animated = true) => {
    if (
      this.internals.isScrolling ||
      this.state.total < 2 ||
      index == this.state.index
    )
      return

    const state = this.state
    const diff = this.state.index + (index - this.state.index)

    let x = 0
    let y = 0
    if (state.dir === 'x') x = diff * state.width
    if (state.dir === 'y') y = diff * state.height

    this.scrollView && this.scrollView.scrollTo({ x, y, animated })

    // update scroll state
    this.internals.isScrolling = true
    this.setState({
      autoplayEnd: false
    })

    // trigger onScrollEnd manually in android
    if (!animated || Platform.OS !== 'ios') {
      setImmediate(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff
          }
        })
      })
    }
  }

  scrollViewPropOverrides = (pages) => {
    const props = this.props
    let overrides = {}

    // snapDiff is calculated to define our offset on every swipe
    // this.state.width is initial width of the item so we subtract padding and adjacentView port widths to derive our snapDifference
    const snappDiff = this.internals.adjacentViewDiffWidth
    const step = this.props.horizontal ? this.state.width : this.state.height

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
      if (
        typeof props[prop] === 'function' &&
        prop !== 'onMomentumScrollEnd' &&
        prop !== 'renderPagination' &&
        prop !== 'onScrollBeginDrag'
      ) {
        let originResponder = props[prop]
        overrides[prop] = (e) => originResponder(e, this.fullState(), this)
      }
      if (prop === 'pagingEnabled') {
        if (props[prop] && props.showAdjacentViews) {
          overrides[prop] = false
          overrides['snapToOffsets'] = pages.map((x, i) => i * step - snappDiff)
          overrides['snapToAlignment'] = 'center'
        }
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
    const ActiveDot = this.props.activeDot || (
      <View
        style={[
          {
            backgroundColor: this.props.activeDotColor || '#007aff',
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3
          },
          this.props.activeDotStyle
        ]}
      />
    )
    const Dot = this.props.dot || (
      <View
        style={[
          {
            backgroundColor: this.props.dotColor || 'rgba(0,0,0,.2)',
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3
          },
          this.props.dotStyle
        ]}
      />
    )
    for (let i = 0; i < this.state.total; i++) {
      dots.push(
        i === this.state.index
          ? React.cloneElement(ActiveDot, { key: i })
          : React.cloneElement(Dot, { key: i })
      )
    }

    return (
      <View
        pointerEvents="none"
        style={[
          styles['pagination_' + this.state.dir],
          this.props.paginationStyle
        ]}
      >
        {dots}
      </View>
    )
  }

  renderTitle = () => {
    const child = this.state.children[this.state.index]
    const title = child && child.props && child.props.title
    return title ? (
      <View style={styles.title}>
        {this.state.children[this.state.index].props.title}
      </View>
    ) : null
  }

  renderNextButton = () => {
    let button = null

    if (this.props.loop || this.state.index !== this.state.total - 1) {
      button = this.props.nextButton || <Text style={styles.buttonText}>›</Text>
    }

    return (
      <TouchableOpacity
        onPress={() => button !== null && this.scrollBy(1)}
        disabled={this.props.disableNextButton}
      >
        <View>{button}</View>
      </TouchableOpacity>
    )
  }

  renderPrevButton = () => {
    let button = null

    if (this.props.loop || this.state.index !== 0) {
      button = this.props.prevButton || <Text style={styles.buttonText}>‹</Text>
    }

    return (
      <TouchableOpacity
        onPress={() => button !== null && this.scrollBy(-1)}
        disabled={this.props.disablePrevButton}
      >
        <View>{button}</View>
      </TouchableOpacity>
    )
  }

  renderButtons = () => {
    return (
      <View
        pointerEvents="box-none"
        style={[
          styles.buttonWrapper,
          {
            width: Dimensions.get('window').width,
            height: this.state.height
          },
          this.props.buttonWrapperStyle
        ]}
      >
        {this.renderPrevButton()}
        {this.renderNextButton()}
      </View>
    )
  }

  refScrollView = (view) => {
    this.scrollView = view
  }

  onPageScrollStateChanged = (state) => {
    switch (state) {
      case 'dragging':
        return this.onScrollBegin()

      case 'idle':
      case 'settling':
        if (this.props.onTouchEnd) this.props.onTouchEnd()
    }
  }

  renderScrollView = (pages) => {
    return (
      <ScrollView
        ref={this.refScrollView}
        {...this.props}
        {...this.scrollViewPropOverrides(pages)}
        contentContainerStyle={[styles.wrapperIOS, this.props.style]}
        contentOffset={this.state.offset}
        onScrollBeginDrag={this.onScrollBegin}
        onMomentumScrollEnd={this.onScrollEnd}
        onScrollEndDrag={this.onScrollEndDrag}
        style={this.props.scrollViewStyle}
      >
        {pages}
      </ScrollView>
    )
  }

  /**
   * Default render
   * @return {object} react-dom
   */
  render() {
    const { index, total, width, height, children } = this.state
    const {
      containerStyle,
      loop,
      loadMinimal,
      loadMinimalSize,
      loadMinimalLoader,
      renderPagination,
      showsButtons,
      showsPagination,
      showAdjacentViews,
      adjacentViewsPadding,
      horizontal
    } = this.props
    // let dir = state.dir
    // let key = 0
    const loopVal = loop ? 2 : 0
    let pages = []
    let paddingHorizontal =
      horizontal && showAdjacentViews ? adjacentViewsPadding : 0
    let paddingVertical =
      !horizontal && showAdjacentViews ? adjacentViewsPadding : 0

    const pageStyle = [
      { width: width, height, paddingHorizontal, paddingVertical },
      styles.slide
    ]

    const pageStyleLoading = {
      width,
      height,
      paddingHorizontal,
      paddingVertical,
      justifyContent: 'center',
      alignItems: 'center'
    }
    // For make infinite at least total > 1
    if (total > 1) {
      // Re-design a loop model for avoid img flickering
      pages = Object.keys(children)
      if (loop) {
        // added 2 duplicate elements in start and end of swiper
        // so when we swipe to duplicate element we will no longer see
        // readjusting, though we will see when touch speed is strong and
        // we end up scrolling to last duplicate element
        pages.unshift(total - 1 + '')
        pages.unshift(total - 2 + '')
        pages.push('0')
        pages.push('1')
      }

      pages = pages.map((page, i) => {
        if (loadMinimal) {
          if (
            (i >= index + loopVal - loadMinimalSize &&
              i <= index + loopVal + loadMinimalSize) ||
            // when at 0 index we will force render the real last element and first duplicate element of end list so we don't see any blank jumps when looping,
            // also when we are at last index value, we will force render the real first element and first duplicate element of start list so we don't see any blank jumps when looping.
            // this approach will give less re-renders and we can lazy load more elements
            (loop && i === pages.length - 3 && index === 0) ||
            (loop && i === pages.length - 2 && index === 0) ||
            (loop && i === 2 && index === total - 1) ||
            (loop && i === 1 && index === total - 1)
          ) {
            return (
              <View style={pageStyle} key={i}>
                {children[page]}
              </View>
            )
          } else {
            return (
              <View style={pageStyleLoading} key={i}>
                {loadMinimalLoader ? loadMinimalLoader : <ActivityIndicator />}
              </View>
            )
          }
        } else {
          return (
            <View style={pageStyle} key={i}>
              {children[page]}
            </View>
          )
        }
      })
    } else {
      pages = (
        <View style={pageStyle} key={0}>
          {children}
        </View>
      )
    }

    return (
      <View style={[styles.container, containerStyle]} onLayout={this.onLayout}>
        {pages.length > 1 ? this.renderScrollView(pages) : pages[0]}
        {showsPagination &&
          (renderPagination
            ? renderPagination(index, total, this)
            : this.renderPagination())}
        {this.renderTitle()}
        {showsButtons && this.renderButtons()}
      </View>
    )
  }
}
