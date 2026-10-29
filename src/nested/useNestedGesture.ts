import {useCallback, useMemo} from 'react'
import {Gesture} from 'react-native-gesture-handler'
import {cancelAnimation, useSharedValue} from 'react-native-reanimated'
import {scheduleOnRN} from 'react-native-worklets'
import type {SwiperSurface} from './ControlledSwiper'
import {
  consumeNestedDrag,
  getDragTarget,
  getElasticOffset,
  getGestureParentIndex,
  getNestedEntryIndex,
  getSwipeDirection,
} from './geometry'

type Options = {
  parent: SwiperSurface | null
  child?: SwiperSurface
  children: (SwiperSurface | undefined)[]
  enabled: boolean
  bounces: boolean
  beginInteraction: (token: string) => void
  endInteraction: (token: string) => void
}

export function useNestedGesture({
  parent,
  child,
  children,
  enabled,
  bounces,
  beginInteraction,
  endInteraction,
}: Options) {
  const parentPosition = parent?.position
  const parentOverscroll = parent?.overscroll
  const parentSize = parent?.size || 1
  const parentCount = parent?.count || 0
  const parentAxis = parent?.axis || 'horizontal'
  const hasChild = Boolean(child)
  const sourceParent = useSharedValue(0)
  const parentStart = useSharedValue(0)
  const childStart = useSharedValue(0)
  const axis = useSharedValue(-1)
  const parentInterrupted = useSharedValue(false)
  const preparedDirection = useSharedValue(0)
  const prepareDestination = useCallback(
    (target: number, direction: number) => {
      const destination = children[target]
      destination?.snapTo(
        getNestedEntryIndex(destination.count, direction),
        false,
      )
    },
    [children],
  )
  const beginPointer = useCallback(
    () => beginInteraction('nested:pointer'),
    [beginInteraction],
  )
  const endPointer = useCallback(
    () => endInteraction('nested:pointer'),
    [endInteraction],
  )
  const beginMovement = useCallback(
    (source: number) => {
      children[source]?.begin()
    },
    [children],
  )
  const settle = useCallback(
    (childIndex: number, parentIndex: number, source: number) => {
      children[source]?.snapTo(childIndex)
      parent?.snapTo(parentIndex)
    },
    [children, parent],
  )
  const gesture = useMemo(() => {
    const prepareHandoff = (direction: number) => {
      'worklet'
      if (parentCount <= 1 || preparedDirection.value === direction) return
      const target = sourceParent.value + direction
      if (target < 0 || target >= parentCount) return
      const destination = children[target]
      if (destination) {
        // Position the incoming boundary card before revealing the parent page.
        cancelAnimation(destination.position)
        destination.position.value =
          getNestedEntryIndex(destination.count, direction) * destination.size
        scheduleOnRN(prepareDestination, target, direction)
      }
      preparedDirection.value = direction
    }
    const pan = Gesture.Pan()
      .enabled(enabled && Boolean(parent) && (hasChild || parentCount > 1))
      .minDistance(12)
    if (parentAxis === 'horizontal')
      pan.activeOffsetX([-12, 12]).failOffsetY([-8, 8])
    else pan.activeOffsetY([-12, 12]).failOffsetX([-8, 8])
    return pan
      .onBegin(() => {
        'worklet'
        axis.value = -1
        if (parentOverscroll) {
          cancelAnimation(parentOverscroll)
          parentOverscroll.value = 0
        }
        preparedDirection.value = 0
        childStart.value = 0
        if (parentPosition) {
          cancelAnimation(parentPosition)
          parentStart.value = parentPosition.value
          parentInterrupted.value =
            Math.abs(
              parentPosition.value -
                Math.round(parentPosition.value / parentSize) * parentSize,
            ) > 0.5
        }
        // Resolve ownership from the actual UI position, even before React has
        // received the previous transition's selection callback.
        sourceParent.value = getGestureParentIndex(
          parentStart.value,
          parentSize,
          parentCount,
        )
        const currentChild = children[sourceParent.value]
        if (currentChild) {
          cancelAnimation(currentChild.overscroll)
          currentChild.overscroll.value = 0
          cancelAnimation(currentChild.position)
          childStart.value = currentChild.position.value
        }
        scheduleOnRN(beginPointer)
      })
      .onStart(() => {
        'worklet'
        scheduleOnRN(beginMovement, sourceParent.value)
      })
      .onUpdate((event) => {
        'worklet'
        const currentChild = children[sourceParent.value]
        const childPosition = currentChild?.position
        const childOverscroll = currentChild?.overscroll
        const childCount = currentChild?.count || 0
        const childSize = currentChild?.size || 1
        if (axis.value < 0) {
          if (
            Math.max(
              Math.abs(event.translationX),
              Math.abs(event.translationY),
            ) < 1
          )
            return
          axis.value =
            Math.abs(event.translationY) > Math.abs(event.translationX) ? 1 : 0
        }
        const delta = -(axis.value ? event.translationY : event.translationX)
        if (parentInterrupted.value) {
          if (parentPosition) {
            const requested = parentStart.value + delta
            parentPosition.value = Math.max(
              0,
              Math.min((parentCount - 1) * parentSize, requested),
            )
            if (parentOverscroll)
              parentOverscroll.value = bounces
                ? getElasticOffset(requested - parentPosition.value, parentSize)
                : 0
          }
          return
        }
        const drag = consumeNestedDrag(
          childStart.value,
          Math.max(0, childCount - 1) * childSize,
          parentStart.value,
          Math.max(0, parentCount - 1) * parentSize,
          delta,
        )
        if (childPosition) childPosition.value = drag.child
        const excess = parentStart.value + drag.remainder - drag.parent
        const matchesParent =
          (axis.value === 0 ? 'horizontal' : 'vertical') === parentAxis
        if (parentOverscroll)
          parentOverscroll.value =
            bounces && matchesParent ? getElasticOffset(excess, parentSize) : 0
        if (childOverscroll)
          childOverscroll.value =
            bounces && !matchesParent ? getElasticOffset(excess, childSize) : 0
        if (Math.abs(drag.remainder) > 4)
          prepareHandoff(drag.remainder < 0 ? -1 : 1)
        if (parentPosition && matchesParent) parentPosition.value = drag.parent
      })
      .onEnd((event) => {
        'worklet'
        const currentChild = children[sourceParent.value]
        const childCount = currentChild?.count || 0
        const childSize = currentChild?.size || 1
        if (axis.value < 0)
          axis.value =
            Math.abs(event.translationY) > Math.abs(event.translationX) ? 1 : 0
        const delta = -(axis.value ? event.translationY : event.translationX)
        const velocity = -(axis.value ? event.velocityY : event.velocityX)
        if (parentInterrupted.value) {
          const direction = getSwipeDirection(delta, velocity, parentSize)
          const end = Math.max(
            0,
            Math.min((parentCount - 1) * parentSize, parentStart.value + delta),
          )
          scheduleOnRN(
            settle,
            Math.round(childStart.value / childSize),
            getDragTarget(
              parentStart.value,
              end,
              parentSize,
              parentCount,
              direction,
            ),
            sourceParent.value,
          )
          return
        }
        const drag = consumeNestedDrag(
          childStart.value,
          Math.max(0, childCount - 1) * childSize,
          parentStart.value,
          Math.max(0, parentCount - 1) * parentSize,
          delta,
        )
        const parentIndex = Math.max(
          0,
          Math.min(parentCount - 1, Math.round(parentStart.value / parentSize)),
        )
        const childIndex = Math.max(
          0,
          Math.min(childCount - 1, Math.round(childStart.value / childSize)),
        )
        const parentDirection = getSwipeDirection(
          drag.remainder,
          velocity,
          parentSize,
        )
        let nextParent = parentIndex
        let nextChild = childIndex
        if (
          parentDirection &&
          parentCount > 1 &&
          Math.abs(drag.remainder) > 4
        ) {
          prepareHandoff(parentDirection)
          nextParent = getDragTarget(
            parentStart.value,
            drag.parent,
            parentSize,
            parentCount,
            parentDirection,
          )
          nextChild = delta > 0 ? Math.max(0, childCount - 1) : 0
        } else if (childCount > 0) {
          const direction = getSwipeDirection(delta, velocity, childSize)
          nextChild = getDragTarget(
            childStart.value,
            drag.child,
            childSize,
            childCount,
            direction,
          )
        } else {
          const direction = getSwipeDirection(delta, velocity, parentSize)
          if (parentCount > 1 && direction) {
            prepareHandoff(direction)
            nextParent = getDragTarget(
              parentStart.value,
              drag.parent,
              parentSize,
              parentCount,
              direction,
            )
          }
        }
        scheduleOnRN(settle, nextChild, nextParent, sourceParent.value)
      })
      .onFinalize((_event, success) => {
        'worklet'
        const currentChild = children[sourceParent.value]
        const childSize = currentChild?.size || 1
        if (!success)
          scheduleOnRN(
            settle,
            Math.round(childStart.value / childSize),
            Math.round(parentStart.value / parentSize),
            sourceParent.value,
          )
        scheduleOnRN(endPointer)
      })
  }, [
    enabled,
    bounces,
    parent,
    children,
    sourceParent,
    hasChild,
    preparedDirection,
    prepareDestination,
    parentPosition,
    parentOverscroll,
    parentStart,
    parentInterrupted,
    childStart,
    axis,
    beginPointer,
    beginMovement,
    parentCount,
    parentAxis,
    parentSize,
    settle,
    endPointer,
  ])
  return gesture
}
