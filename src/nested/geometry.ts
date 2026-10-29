// Mirrors Swiper's preventedByNestedSwiper / edge-release ownership rule.
export function getNestedEntryIndex(count: number, direction: number) {
  'worklet'
  return direction < 0 ? Math.max(0, count - 1) : 0
}

export function getGestureParentIndex(
  position: number,
  size: number,
  count: number,
) {
  'worklet'
  return Math.max(0, Math.min(count - 1, Math.round(position / size)))
}

// itemSize can already include a child-provided gap; do not add it twice.
export function getPageStride(
  viewportSize: number,
  spaceBetween: number,
  itemSize?: number,
) {
  return Math.max(viewportSize + spaceBetween, itemSize || 0)
}

export function getElasticOffset(excess: number, size: number) {
  'worklet'
  const limit = size * 0.25
  return (excess * 0.55 * limit) / (limit + Math.abs(excess) * 0.55)
}

export function consumeNestedDrag(
  childStart: number,
  childMax: number,
  parentStart: number,
  parentMax: number,
  delta: number,
) {
  'worklet'
  const child = Math.max(0, Math.min(childMax, childStart + delta))
  const remainder = delta - (child - childStart)
  return {
    child,
    parent: Math.max(0, Math.min(parentMax, parentStart + remainder)),
    remainder,
  }
}

export function getSwipeDirection(
  distance: number,
  velocity: number,
  size: number,
): -1 | 0 | 1 {
  'worklet'
  if (
    Math.abs(distance) < Math.max(16, size * 0.15) &&
    !(Math.abs(velocity) > 500 && Math.abs(distance) > 4)
  )
    return 0
  return distance < 0 ? -1 : 1
}

// An interrupted transition starts between pages: reverse returns toward the
// previous page and forward completes the next one, without skipping a page.
export function getDragTarget(
  start: number,
  end: number,
  size: number,
  count: number,
  direction: number,
) {
  'worklet'
  const startIndex = Math.round(start / size)
  const interrupted = Math.abs(start - startIndex * size) > 0.5
  const target = interrupted
    ? direction > 0
      ? Math.ceil(end / size)
      : direction < 0
        ? Math.floor(end / size)
        : Math.round(end / size)
    : startIndex + direction
  return Math.max(0, Math.min(count - 1, target))
}
