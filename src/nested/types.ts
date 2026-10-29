import type {ReactNode} from 'react'
import type {StyleProp, ViewStyle} from 'react-native'

export type NestedSwiperProps = {
  children: ReactNode
  width: number
  height: number
  horizontal?: boolean
  /** Inherited by children unless they provide their own value. */
  spaceBetween?: number
  /** Nested mode is deliberately bounded; it never clones child instances. */
  loop?: false
  index?: number
  bounces?: boolean
  autoplay?: boolean
  /** Seconds. The root owns the only autoplay timer. */
  autoplayTimeout?: number
  showsPagination?: boolean
  paginationStyle?: StyleProp<ViewStyle>
  dotStyle?: StyleProp<ViewStyle>
  dotColor?: string
  activeDotColor?: string
  onIndexChanged?: (index: number) => void
  onNestedIndexChanged?: (index: number, total: number) => void
}

export type NestedSwiperHandle = {
  scrollTo: (index: number, animated?: boolean) => void
  scrollBy: (delta: number, animated?: boolean) => void
  getIndex: () => number
}
