import {getGestureParentIndex} from './geometry'
type VisiblePage = {count: number; position: number; size: number}

export function getVisiblePagination(
  parentPosition: number,
  parentSize: number,
  pages: VisiblePage[],
) {
  'worklet'
  const parent = getGestureParentIndex(
    parentPosition,
    Math.max(1, parentSize),
    pages.length,
  )
  let count = 0
  let activeIndex = 0
  for (let index = 0; index < pages.length; index++) {
    const page = pages[index]
    const pageCount = Math.max(1, page.count)
    if (index === parent)
      activeIndex =
        count +
        getGestureParentIndex(page.position, Math.max(1, page.size), pageCount)
    count += pageCount
  }
  return {count, activeIndex}
}
