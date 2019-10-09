import {
  ViewStyle,
  StyleProp,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollViewProps
} from 'react-native'
import { Component } from 'react'

declare module 'react-native-swiper' {
  interface SwiperStates {
    autoplayEnd: false
    loopJump: false
    width: number
    height: number
    offset: {
      x: number
      y: number
    }
    total: number
    index: number
    dir: 'x' | 'y'
  }

  interface SwiperInternals extends SwiperStates {
    isScrolling: boolean
  }

  interface SwiperProps
    extends Omit<ScrollViewProps, 'onScrollBeginDrag' | 'onMomentumScrollEnd'> {
    // Basic
    // If true, the scroll view's children are arranged horizontally in a row instead of vertically in a column.
    horizontal?: boolean
    // If no specify default enable fullscreen mode by flex: 1.
    loop?: boolean
    // Index number of initial slide.
    index?: number
    // Set to true make control buttons visible.
    showsButtons?: boolean
    // Set to false to disable continuous loop mode.
    autoplay?: boolean
    // Called with the new index when the user swiped
    onIndexChanged?: (index: number) => void

    // Custom basic style & content
    // Set to true enable auto play mode.
    width?: number
    // If no specify default fullscreen mode by flex: 1.
    height?: number
    // See default style in source.
    style?: StyleProp<ViewStyle>
    // Customize the View container.
    containerStyle?: StyleProp<ViewStyle>
    // Only load current index slide , loadMinimalSize slides before and after.
    loadMinimal?: boolean
    // see loadMinimal
    loadMinimalSize?: number
    // Custom loader to display when slides aren't loaded
    loadMinimalLoader?: React.ReactNode

    // Pagination
    // Set to true make pagination visible.
    showsPagination?: boolean
    // Custom styles will merge with the default styles.
    paginationStyle?: StyleProp<ViewStyle>
    // Complete control how to render pagination with three params (index, total, context) ref to this.state.index / this.state.total / this, For example: show numbers instead of dots.
    renderPagination?: (
      index: number,
      total: number,
      swiper: Swiper
    ) => React.ReactNode
    // Allow custom the dot element.
    dot?: React.ReactNode
    // Allow custom the active-dot element.
    activeDot?: React.ReactNode
    // Allow custom the active-dot element.
    dotStyle?: StyleProp<ViewStyle>
    // Allow custom the active-dot element.
    dotColor?: string
    // Allow custom the active-dot element.
    activeDotColor?: string
    // Allow custom the active-dot element.
    activeDotStyle?: StyleProp<ViewStyle>

    // Autoplay
    // Delay between auto play transitions (in second).
    autoplayTimeout?: number
    // Cycle direction control.
    autoplayDirection?: boolean

    // Control buttons
    // Set to true make control buttons visible.
    buttonWrapperStyle?: StyleProp<ViewStyle>
    // Allow custom the next button.
    nextButton?: React.ReactNode
    // Allow custom the prev button.
    prevButton?: React.ReactNode

    // Supported ScrollResponder
    // When animation begins after letting up
    onScrollBeginDrag?: (
      e: NativeSyntheticEvent<NativeScrollEvent>,
      state: SwiperInternals,
      swiper: Swiper
    ) => void
    // Makes no sense why this occurs first during bounce
    onMomentumScrollEnd?: (
      e: NativeSyntheticEvent<NativeScrollEvent>,
      state: SwiperInternals,
      swiper: Swiper
    ) => void
    // Immediately after onMomentumScrollEnd
    onTouchStartCapture?: any
    // Same, but bubble phase
    onTouchStart?: any
    // You could hold the touch start for a long time
    onTouchEnd?: any
    // When lifting up - you could pause forever before * lifting
    onResponderRelease?: any

    // If true, the scroll view stops on multiples of the scroll view's size when scrolling. This can be used for
    // horizontal pagination.
    pagingEnabled?: boolean
    // Set to true if you want to show horizontal scroll bar.
    showsHorizontalScrollIndicator?: boolean
    // Set to true if you want to show vertical scroll bar.
    showsVerticalScrollIndicator?: boolean
    // If true, the scroll view bounces when it reaches the end of the content if the content is larger then the
    // scroll view along the axis of the scroll direction. If false, it disables all bouncing even if the
    // alwaysBounce* props are true.
    bounces?: boolean
    // If true, the scroll view scrolls to top when the status bar is tapped.
    scrollsToTop?: boolean
    // If true, offscreen child views (whose overflow value is hidden) are removed from their native backing
    // superview when offscreen. This canimprove scrolling performance on long lists.
    removeClippedSubviews?: boolean
    // Set to true if you need adjust content insets automation.
    automaticallyAdjustContentInsets?: boolean
    // Enables/Disables swiping
    scrollEnabled?: boolean
  }

  export default class Swiper extends Component<SwiperProps> {
    scrollBy: (index?: number, animated?: boolean) => void
    scrollTo: (index: number, animated?: boolean) => void
  }
}
