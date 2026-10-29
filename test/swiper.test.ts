import {describe, it, afterEach} from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import {transformSync} from 'esbuild'
import React from 'react'
const require = createRequire(import.meta.url)
const instances: any[] = []
const FakeScrollView = () => null
const native: any = {
  View: () => null,
  Text: () => null,
  ScrollView: FakeScrollView,
  Dimensions: {get: () => ({width: 360, height: 500})},
  TouchableOpacity: () => null,
  ActivityIndicator: () => null,
  Platform: {OS: 'ios'},
}
const code = transformSync(
  readFileSync(new URL('../src/index.js', import.meta.url), 'utf8'),
  {loader: 'jsx', format: 'cjs', target: 'es2020'},
).code
const exported: any = {exports: {}}
new Function('require', 'module', 'exports', code)(
  (id: string) =>
    id === 'react-native'
      ? native
      : id === './geometry'
        ? require('../src/geometry')
        : require(id),
  exported,
  exported.exports,
)
const Swiper = exported.exports.default
function create(props: any = {}) {
  const instance = new Swiper({
    ...Swiper.defaultProps,
    width: 360,
    height: 500,
    loop: false,
    children: [
      React.createElement('a'),
      React.createElement('b'),
      React.createElement('c'),
    ],
    ...props,
  })
  instance.scrollView = {
    calls: [] as any[],
    scrollTo(value: any) {
      this.calls.push(value)
    },
  }
  instance.setState = (update: any, cb?: () => void) => {
    const previous = instance.state
    instance.state = {
      ...previous,
      ...(typeof update === 'function' ? update(previous) : update),
    }
    instance.componentDidUpdate(instance.props, previous)
    cb?.()
  }
  instance.onLayout({nativeEvent: {layout: {width: 360, height: 500}}})
  instances.push(instance)
  return instance
}
afterEach(() =>
  instances.splice(0).forEach((instance) => instance.componentWillUnmount()),
)

describe('core spaceBetween integration', () => {
  it('preserves native paging when spaceBetween is zero', () => {
    const instance = create()
    assert.equal(instance.renderScrollView([]).props.pagingEnabled, true)
    assert.equal(instance.renderScrollView([]).props.snapToInterval, undefined)
    assert.equal(instance.getStep(), 360)
  })
  it('uses stride-aware snapping without stretching page content', () => {
    const instance = create({spaceBetween: 10})
    const scroll = instance.renderScrollView([])
    assert.equal(scroll.props.pagingEnabled, false)
    assert.equal(scroll.props.snapToInterval, 370)
    const rendered = instance.render().props.children[0].props.children
    assert.equal(rendered[0].props.style[0][0].width, 360)
    assert.equal(rendered[0].props.style[1].marginRight, 10)
    assert.equal(rendered[2].props.style[1].marginRight, 0)
  })
  it('does not add a nonexistent loop clone when a single page changes spacing', () => {
    const instance = create({
      loop: true,
      children: [React.createElement('only')],
    })
    const previous = instance.props
    instance.props = {...previous, spaceBetween: 10}
    instance.componentDidUpdate(previous, instance.state)
    assert.equal(instance.internals.offset.x, 0)
    instance.commitIndex(0)
    assert.equal(instance.internals.offset.x, 0)
  })
  it('converts programmatic horizontal and vertical positions using the same gap', async () => {
    const horizontal = create({spaceBetween: 10})
    horizontal.scrollTo(2, false)
    await new Promise((resolve) => setImmediate(resolve))
    assert.deepEqual(horizontal.scrollView.calls.at(-1), {
      x: 740,
      y: 0,
      animated: false,
    })
    assert.equal(horizontal.state.index, 2)
    const vertical = create({spaceBetween: 10, horizontal: false})
    vertical.scrollTo(2, false)
    await new Promise((resolve) => setImmediate(resolve))
    assert.deepEqual(vertical.scrollView.calls.at(-1), {
      x: 0,
      y: 1020,
      animated: false,
    })
    assert.equal(vertical.state.index, 2)
  })
  it('accounts for loop clones with spacing', async () => {
    const instance = create({spaceBetween: 10, loop: true})
    assert.equal(instance.internals.offset.x, 370)
    instance.scrollTo(2, false)
    await new Promise((resolve) => setImmediate(resolve))
    assert.equal(instance.scrollView.calls.at(-1).x, 1110)
    assert.equal(instance.state.index, 2)
  })
  it('realigns after a dynamic spacing change and viewport layout', () => {
    const instance = create({spaceBetween: 10})
    instance.commitIndex(2)
    const old = instance.props
    instance.props = {...old, spaceBetween: 20}
    instance.componentDidUpdate(old, instance.state)
    assert.equal(instance.scrollView.calls.at(-1).x, 760)
    instance.onLayout({nativeEvent: {layout: {width: 400, height: 600}}})
    assert.equal(instance.scrollView.calls.at(-1).x, 840)
  })
  it('confirms controlled indices directly, even when previous callbacks were interrupted', () => {
    const indices: number[] = []
    const instance = create({
      spaceBetween: 10,
      onIndexChanged: (index: number) => indices.push(index),
    })
    instance.commitIndex(1)
    instance.commitIndex(2)
    assert.deepEqual(indices, [1, 2])
    assert.equal(instance.internals.offset.x, 740)
    assert.equal(instance.internals.isScrolling, false)
  })
  it('exposes a ScrollView transport ref without loading nested optional dependencies', () => {
    const CustomScroll = () => null
    let ref: any
    const instance = create({
      ScrollViewComponent: CustomScroll,
      onScrollViewRef: (value: any) => {
        ref = value
      },
    })
    assert.equal(instance.renderScrollView([]).type, CustomScroll)
    instance.refScrollView('handle')
    assert.equal(ref, 'handle')
    instance.refScrollView(null)
    assert.equal(ref, null)
  })
})
