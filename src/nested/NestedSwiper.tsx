import {
  Children,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {StyleSheet, View} from 'react-native'
import {GestureDetector} from 'react-native-gesture-handler'
import type {SharedValue} from 'react-native-reanimated'
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'
import {scheduleOnRN} from 'react-native-worklets'
import {ControlledSwiper} from './ControlledSwiper'
import type {SwiperSurface} from './ControlledSwiper'
import {getGestureParentIndex} from './geometry'
import {getVisiblePagination} from './pagination'
import {useNestedGesture} from './useNestedGesture'
import type {NestedSwiperHandle, NestedSwiperProps} from './types'

type Registration = {owner: object; surface: SwiperSurface}
type Root = {
  register: (slot: number, owner: object, surface?: SwiperSurface) => void
  changed: () => void
  begin: (token: string) => void
  end: (token: string) => void
}
type Slot = {
  root: Root
  slot: number
  depth: number
  horizontal: boolean
  spaceBetween: number
}
const SlotContext = createContext<Slot | null>(null)

/** Opt-in, two-level nested carousel. Ordinary Swiper imports have no optional dependencies. */
const NestedSwiper = forwardRef<NestedSwiperHandle, NestedSwiperProps>(
  function NestedSwiper(props, ref) {
    const slot = useContext(SlotContext)
    const isRoot = !slot
    const horizontal = props.horizontal ?? slot?.horizontal ?? true
    const requestedGap = props.spaceBetween ?? slot?.spaceBetween ?? 0
    const spaceBetween =
      Number.isFinite(requestedGap) && requestedGap > 0 ? requestedGap : 0
    const axis = horizontal ? 'horizontal' : 'vertical'
    const pages = Children.toArray(props.children)
    const [surface, setSurface] = useState<SwiperSurface | null>(null)
    const [registrations, setRegistrations] = useState<
      Record<number, Registration>
    >({})
    const [selected, setSelected] = useState(props.index || 0)
    const [revision, setRevision] = useState(0)
    const [paused, setPaused] = useState(false)
    const tokens = useRef(new Set<string>())
    const owner = useRef({}).current
    const latest = useRef(props)
    latest.current = props
    const currentIndex = useRef(props.index || 0)
    const begin = useCallback((token: string) => {
      tokens.current.add(token)
      setPaused(true)
    }, [])
    const end = useCallback((token: string) => {
      tokens.current.delete(token)
      if (!tokens.current.size) setPaused(false)
    }, [])
    const changed = useCallback(() => setRevision((value) => value + 1), [])
    const register = useCallback(
      (index: number, childOwner: object, child?: SwiperSurface) => {
        setRegistrations((previous) => {
          const old = previous[index]
          if (old && old.owner !== childOwner)
            throw new Error(
              'Only one NestedSwiper may register in each parent page',
            )
          if (old?.surface === child) return previous
          const next = {...previous}
          if (child) next[index] = {owner: childOwner, surface: child}
          else delete next[index]
          return next
        })
      },
      [],
    )
    const ownRoot = useMemo(
      () => ({register, changed, begin, end}),
      [register, changed, begin, end],
    )
    const root = slot?.root || ownRoot
    const childSurfaces = useMemo(
      () =>
        Array.from(
          {length: pages.length},
          (_, index) => registrations[index]?.surface,
        ),
      [pages.length, registrations],
    )
    const onSelected = useCallback(
      (index: number) => {
        setSelected(index)
        root.changed()
        if (currentIndex.current !== index)
          latest.current.onIndexChanged?.(index)
        currentIndex.current = index
      },
      [root],
    )
    const motionBegin = useCallback(
      () =>
        root.begin(
          isRoot ? 'parent:animation' : `child:${slot.slot}:animation`,
        ),
      [root, isRoot, slot?.slot],
    )
    const motionEnd = useCallback(
      () =>
        root.end(isRoot ? 'parent:animation' : `child:${slot.slot}:animation`),
      [root, isRoot, slot?.slot],
    )

    const parentRoot = slot?.root
    const parentSlot = slot?.slot
    useEffect(() => {
      if (!parentRoot || parentSlot === undefined || !surface) return
      parentRoot.register(parentSlot, owner, surface)
      return () => parentRoot.register(parentSlot, owner)
    }, [parentRoot, parentSlot, owner, surface])
    useEffect(() => {
      if (
        surface &&
        props.index !== undefined &&
        Math.abs(surface.position.value - props.index * surface.size) > 0.5
      )
        surface.snapTo(props.index, false)
    }, [props.index, surface])
    useEffect(() => () => motionEnd(), [motionEnd])
    useImperativeHandle(
      ref,
      () => ({
        scrollTo: (index, animated = true) => surface?.snapTo(index, animated),
        scrollBy: (delta, animated = true) => {
          if (surface)
            surface.snapTo(
              getGestureParentIndex(
                surface.position.value,
                surface.size,
                surface.count,
              ) + delta,
              animated,
            )
        },
        getIndex: () =>
          surface
            ? getGestureParentIndex(
                surface.position.value,
                surface.size,
                surface.count,
              )
            : 0,
      }),
      [surface],
    )

    const gesture = useNestedGesture({
      parent: surface,
      child: childSurfaces[selected],
      children: childSurfaces,
      enabled: isRoot,
      bounces: Boolean(props.bounces),
      beginInteraction: begin,
      endInteraction: end,
    })
    const visibleIndex = useDerivedValue(
      () =>
        surface
          ? getVisiblePagination(
              surface.position.value,
              surface.size,
              childSurfaces.map((child) => ({
                count: child?.count || 1,
                size: child?.size || 1,
                position: child?.position.value || 0,
              })),
            ).activeIndex
          : 0,
      [surface, childSurfaces],
    )
    const total = childSurfaces.reduce(
      (sum, child) => sum + (child?.count || 1),
      0,
    )
    const visibleChanged = useCallback(
      (index: number, count: number) =>
        latest.current.onNestedIndexChanged?.(index, count),
      [],
    )
    useAnimatedReaction(
      () => ({index: visibleIndex.value, count: total}),
      (next, previous) => {
        if (
          isRoot &&
          (!previous ||
            next.index !== previous.index ||
            next.count !== previous.count)
        )
          scheduleOnRN(visibleChanged, next.index, next.count)
      },
      [isRoot, total, visibleChanged, visibleIndex],
    )

    // A settled child restarts the root delay even when the parent index stays the same.
    // biome-ignore lint/correctness/useExhaustiveDependencies: revision is the child-settled notification.
    useEffect(() => {
      if (!isRoot || !props.autoplay || paused || !surface) return
      const child = childSurfaces[selected]
      const index = child
        ? getGestureParentIndex(child.position.value, child.size, child.count)
        : 0
      if (selected >= surface.count - 1 && (!child || index >= child.count - 1))
        return
      const seconds =
        props.autoplayTimeout && props.autoplayTimeout > 0
          ? props.autoplayTimeout
          : 2.5
      const timer = setTimeout(() => {
        if (tokens.current.size) return
        if (child && index < child.count - 1) child.snapTo(index + 1)
        else {
          childSurfaces[selected + 1]?.snapTo(0, false)
          surface.snapTo(selected + 1)
        }
      }, seconds * 1000)
      return () => clearTimeout(timer)
    }, [
      isRoot,
      props.autoplay,
      props.autoplayTimeout,
      paused,
      surface,
      selected,
      childSurfaces,
      revision,
    ])

    if ((props as {loop?: boolean}).loop)
      throw new Error(
        'NestedSwiper supports loop={false}; nested child instances are not cloned',
      )
    if (slot && (slot.depth > 0 || horizontal !== slot.horizontal))
      throw new Error(
        'NestedSwiper currently supports one level of same-direction children',
      )
    if (!(props.width > 0 && props.height > 0))
      throw new Error('NestedSwiper requires positive width and height')
    const content = (
      <View style={{width: props.width, height: props.height}}>
        <ControlledSwiper
          ref={setSurface}
          width={props.width}
          height={props.height}
          axis={axis}
          spaceBetween={spaceBetween}
          bounces={Boolean(props.bounces)}
          onSettled={onSelected}
          onMotionStart={motionBegin}
          onMotionEnd={motionEnd}
        >
          {pages.map((page, index) => (
            <SlotContext.Provider
              key={(page as {key?: string}).key || index}
              value={{
                root,
                slot: index,
                depth: isRoot ? 0 : 1,
                horizontal,
                spaceBetween,
              }}
            >
              {page}
            </SlotContext.Provider>
          ))}
        </ControlledSwiper>
        {isRoot && props.showsPagination !== false && total > 1 ? (
          <View
            pointerEvents="none"
            style={[styles.pagination, props.paginationStyle]}
          >
            {Array.from({length: total}, (_, index) => (
              <Dot
                // biome-ignore lint/suspicious/noArrayIndexKey: dots represent fixed ordinal positions, not child identities.
                key={index}
                index={index}
                progress={visibleIndex}
                inactive={props.dotColor || 'rgba(0,0,0,0.2)'}
                active={props.activeDotColor || '#007aff'}
                style={props.dotStyle}
              />
            ))}
          </View>
        ) : null}
      </View>
    )
    return isRoot ? (
      <GestureDetector gesture={gesture}>{content}</GestureDetector>
    ) : (
      content
    )
  },
)

function Dot({
  index,
  progress,
  inactive,
  active,
  style,
}: {
  index: number
  progress: SharedValue<number>
  inactive: string
  active: string
  style: NestedSwiperProps['dotStyle']
}) {
  const color = useAnimatedStyle(
    () => ({backgroundColor: progress.value === index ? active : inactive}),
    [index, progress, active, inactive],
  )
  return <Animated.View style={[styles.dot, style, color]} />
}
const styles = StyleSheet.create({
  pagination: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {width: 8, height: 8, borderRadius: 4, marginHorizontal: 3},
})
export default NestedSwiper
