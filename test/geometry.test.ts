import {describe, it} from 'node:test'
import assert from 'node:assert/strict'
import {createRequire} from 'node:module'
import {
  consumeNestedDrag,
  getDragTarget,
  getElasticOffset,
  getGestureParentIndex,
  getNestedEntryIndex,
  getPageStride,
  getSwipeDirection,
} from '../src/nested/geometry'
import {getVisiblePagination} from '../src/nested/pagination'
const require = createRequire(import.meta.url)
const {getPageSize, getSpaceBetween} = require('../src/geometry')

describe('spacing', () => {
  it('keeps zero spacing compatible and uses viewport plus gap in both axes', () => {
    assert.equal(getPageSize(360, 0), 360)
    assert.equal(getPageSize(360, 10), 370)
    assert.equal(getPageSize(500, 16), 516)
    for (const value of [-10, NaN, Infinity, undefined])
      assert.equal(getSpaceBetween(value), 0)
  })
  it('does not double an existing page stride', () => {
    assert.equal(getPageStride(360, 10, 370), 370)
  })
})

describe('nested ownership and release', () => {
  it('consumes the child first and forwards only the remaining distance', () => {
    assert.deepEqual(consumeNestedDrag(0, 740, 0, 370, 200), {
      child: 200,
      parent: 0,
      remainder: 0,
    })
    assert.deepEqual(consumeNestedDrag(650, 740, 0, 370, 240), {
      child: 740,
      parent: 150,
      remainder: 150,
    })
    assert.deepEqual(consumeNestedDrag(0, 740, 370, 370, -200), {
      child: 0,
      parent: 170,
      remainder: -200,
    })
  })
  it('selects the B surface from the actual UI position before React settles', () => {
    const children = [
      {count: 2, size: 370},
      {count: 3, size: 370},
    ]
    const source = getGestureParentIndex(370, 370, 2)
    assert.equal(source, 1)
    const child = children[source]
    const drag = consumeNestedDrag(
      0,
      (child.count - 1) * child.size,
      370,
      370,
      260,
    )
    assert.equal(drag.remainder, 0)
    assert.equal(getDragTarget(0, drag.child, child.size, child.count, 1), 1)
  })
  it('enters the preceding group at its last child and the next group at its first', () => {
    assert.equal(getNestedEntryIndex(2, -1), 1)
    assert.equal(getNestedEntryIndex(3, 1), 0)
  })
  it('does not wrap at either global boundary', () => {
    assert.equal(getDragTarget(0, 0, 370, 2, -1), 0)
    assert.equal(getDragTarget(370, 370, 370, 2, 1), 1)
    assert.equal(getDragTarget(740, 740, 370, 3, 1), 2)
  })
  it('can reverse an interrupted parent animation without skipping a page', () => {
    assert.equal(getDragTarget(190, 300, 370, 2, 1), 1)
    assert.equal(getDragTarget(190, 20, 370, 2, -1), 0)
  })
  it('rejects small jitter but accepts a clear flick', () => {
    assert.equal(getSwipeDirection(3, 900, 370), 0)
    assert.equal(getSwipeDirection(10, 100, 370), 0)
    assert.equal(getSwipeDirection(10, 900, 370), 1)
    assert.equal(getSwipeDirection(-80, -100, 370), -1)
  })
  it('uses bounded symmetric resistance without changing the page index', () => {
    assert.equal(getElasticOffset(0, 370), 0)
    assert.equal(getElasticOffset(100, 370), -getElasticOffset(-100, 370))
    assert.ok(getElasticOffset(3000, 370) < 370 / 4)
    assert.equal(getDragTarget(0, 0, 370, 2, -1), 0)
  })
})

describe('visible pagination', () => {
  it('shows 1-2-3 while A2 is interrupted before its settled callback', () => {
    const read = (parent: number, a: number, b: number) =>
      getVisiblePagination(parent, 370, [
        {count: 2, position: a, size: 370},
        {count: 3, position: b, size: 370},
      ])
    assert.deepEqual(
      [
        read(0, 0, 0),
        read(0, 210, 0),
        read(100, 370, 0),
        read(220, 370, 0),
      ].map((x) => x.activeIndex),
      [0, 1, 1, 2],
    )
    assert.deepEqual(read(370, 370, 740), {count: 5, activeIndex: 4})
    assert.deepEqual(
      [read(370, 370, 0), read(160, 370, 0), read(0, 170, 0)].map(
        (x) => x.activeIndex,
      ),
      [2, 1, 0],
    )
  })
  it('does not invent intermediate visible dots during a programmatic first/last jump', () => {
    const pages = [
      {count: 2, position: 0, size: 370},
      {count: 3, position: 740, size: 370},
    ]
    assert.deepEqual(
      [370, 210, 150, 0].map(
        (offset) => getVisiblePagination(offset, 370, pages).activeIndex,
      ),
      [4, 4, 0, 0],
    )
  })
  it('handles ordinary pages, empty groups and changing counts', () => {
    assert.deepEqual(
      getVisiblePagination(370, 370, [
        {count: 1, position: 0, size: 1},
        {count: 1, position: 740, size: 370},
      ]),
      {count: 2, activeIndex: 1},
    )
    assert.deepEqual(getVisiblePagination(0, 370, []), {
      count: 0,
      activeIndex: 0,
    })
  })
})
