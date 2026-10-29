import type {ReactNode} from 'react'
import {
  Children,
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import {type ScrollView, View} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import Animated, {
  cancelAnimation,
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import RawSwiper from '../index'
import type Swiper from 'react-native-swiper'
import {scheduleOnRN} from 'react-native-worklets'
import {getPageStride} from './geometry'

export type SwiperSurface = {
  position: SharedValue<number>
  overscroll: SharedValue<number>
  size: number
  count: number
  axis: 'horizontal' | 'vertical'
  snapTo: (index: number, animated?: boolean) => void
  begin: () => void
}

type Props = {
  children: ReactNode
  width: number
  height: number
  axis?: 'horizontal' | 'vertical'
  spaceBetween?: number
  bounces?: boolean
  onSettled: (index: number) => void
  onMotionStart: () => void
  onMotionEnd: () => void
  onTransitionChange?: (moving: boolean) => void
}

const ContentContext = createContext<ReactNode[]>([])
function LivePage({index}: {index: number}) {
  return <>{useContext(ContentContext)[index]}</>
}
// Use the public declaration at the untyped legacy-JS boundary.
const StableSwiper = memo(RawSwiper as unknown as typeof Swiper)

// Swiper owns page layout and selection; its opt-in animated ScrollView transport
// lets one nested gesture coordinator drive offsets without JS per-frame events.
export const ControlledSwiper = forwardRef<SwiperSurface, Props>(
  function ControlledSwiper(
    {
      children,
      width,
      height,
      axis = 'horizontal',
      spaceBetween = 0,
      bounces = false,
      ...callbacks
    },
    ref,
  ) {
    const pages = Children.toArray(children)
    const keys = JSON.stringify(
      pages.map((page, index) => String((page as {key?: string}).key ?? index)),
    )
    // Keep Swiper's children stable while content updates through context.
    const stablePages = useMemo(
      () =>
        (JSON.parse(keys) as string[]).map((key, index) => (
          <LivePage key={key} index={index} />
        )),
      [keys],
    )
    const count = pages.length
    const size = getPageStride(
      axis === 'horizontal' ? width : height,
      spaceBetween,
    )
    const swiper = useRef<Swiper>(null)
    const nativeRef = useAnimatedRef<ScrollView>()
    const position = useSharedValue(0)
    const overscroll = useSharedValue(0)
    const elasticStyle = useAnimatedStyle(
      () => ({
        transform:
          axis === 'horizontal'
            ? [{translateX: -overscroll.value}]
            : [{translateY: -overscroll.value}],
      }),
      [axis],
    )
    const ready = useSharedValue(false)
    const geometry = useRef({count, size})
    geometry.current = {count, size}
    const selectedIndex = useRef(0)
    const latest = useRef(callbacks)
    latest.current = callbacks
    const onNativeRef = useCallback(
      (view: ScrollView | null) => {
        nativeRef(view)
        ready.value = Boolean(view)
      },
      [nativeRef, ready],
    )
    useAnimatedReaction(
      () => (ready.value ? position.value : -1),
      (value) => {
        if (value >= 0)
          scrollTo(
            nativeRef,
            axis === 'horizontal' ? value : 0,
            axis === 'vertical' ? value : 0,
            false,
          )
      },
      [axis],
    )
    const select = useCallback((index: number) => {
      selectedIndex.current = index
      swiper.current?.commitIndex(index)
      latest.current.onSettled(index)
    }, [])
    const finish = useCallback(() => {
      latest.current.onTransitionChange?.(false)
      latest.current.onMotionEnd()
    }, [])
    const commit = useCallback(
      (index: number) => {
        select(index)
        finish()
      },
      [select, finish],
    )
    const begin = useCallback(() => {
      latest.current.onTransitionChange?.(true)
    }, [])
    const snapTo = useCallback(
      (index: number, animated = true) => {
        const next = Math.max(0, Math.min(geometry.current.count - 1, index))
        latest.current.onMotionStart()
        begin()
        const target = next * geometry.current.size
        cancelAnimation(position)
        cancelAnimation(overscroll)
        if (animated && Math.abs(overscroll.value) > 0.5) {
          const alreadyAtPage = Math.abs(position.value - target) < 0.5
          // Page ownership must not wait for a spring that the next touch can cancel.
          if (alreadyAtPage) select(next)
          overscroll.value = withSpring(
            0,
            {damping: 20, stiffness: 220, mass: 0.7, overshootClamping: true},
            (finished) => {
              'worklet'
              if (finished && alreadyAtPage) scheduleOnRN(finish)
            },
          )
          if (alreadyAtPage) return
        } else overscroll.value = 0
        if (!animated || Math.abs(position.value - target) < 0.5) {
          position.value = target
          commit(next)
          return
        }
        position.value = withTiming(target, {duration: 350}, (finished) => {
          'worklet'
          if (finished) scheduleOnRN(commit, next)
        })
      },
      [begin, commit, select, finish, position, overscroll],
    )
    useImperativeHandle(
      ref,
      () => ({position, overscroll, size, count, axis, snapTo, begin}),
      [position, overscroll, size, count, axis, snapTo, begin],
    )
    useEffect(
      () => () => {
        cancelAnimation(position)
        cancelAnimation(overscroll)
        latest.current.onMotionEnd()
      },
      [position, overscroll],
    )
    useEffect(() => {
      const next = Math.max(0, Math.min(count - 1, selectedIndex.current))
      cancelAnimation(position)
      cancelAnimation(overscroll)
      overscroll.value = 0
      position.value = next * size
      commit(next)
    }, [count, size, commit, position, overscroll])
    const swiperWidth = width
    const swiperHeight = height
    const containerStyle = useMemo(
      () => ({width: swiperWidth, height: swiperHeight, flex: 0}),
      [swiperWidth, swiperHeight],
    )
    return (
      <View style={{width, height, overflow: 'hidden'}}>
        <ContentContext.Provider value={pages}>
          <Animated.View style={[{width, height}, elasticStyle]}>
            <StableSwiper
              ref={swiper}
              width={swiperWidth}
              height={swiperHeight}
              containerStyle={containerStyle}
              horizontal={axis === 'horizontal'}
              loop={false}
              spaceBetween={spaceBetween}
              bounces={bounces}
              alwaysBounceHorizontal={bounces && axis === 'horizontal'}
              alwaysBounceVertical={bounces && axis === 'vertical'}
              overScrollMode={bounces ? 'always' : 'never'}
              autoplay={false}
              showsPagination={false}
              disableScrollViewPanResponder
              scrollEnabled={false}
              removeClippedSubviews={false}
              ScrollViewComponent={Animated.ScrollView}
              onScrollViewRef={onNativeRef}
            >
              {stablePages}
            </StableSwiper>
          </Animated.View>
        </ContentContext.Provider>
      </View>
    )
  },
)
