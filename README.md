# react-native-swiper

[![npm version](http://img.shields.io/npm/v/react-native-swiper.svg?style=flat-square)](https://npmjs.org/package/react-native-swiper "View this project on npm")
[![npm version](http://img.shields.io/npm/dm/react-native-swiper.svg?style=flat-square)](https://npmjs.org/package/react-native-swiper "View this project on npm")
[![Issue Stats](http://issuestats.com/github/leecade/react-native-swiper/badge/pr?style=flat-square)](https://github.com/leecade/react-native-swiper/pulls?q=is%3Apr+is%3Aclosed)
[![Issue Stats](http://issuestats.com/github/leecade/react-native-swiper/badge/issue?style=flat-square)](https://github.com/leecade/react-native-swiper/issues?q=is%3Aissue+is%3Aclosed)
[![Join the chat at https://gitter.im/leecade/react-native-swiper](https://badges.gitter.im/leecade/react-native-swiper.svg)](https://gitter.im/leecade/react-native-swiper?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![logo](http://i.imgur.com/P4cRUgD.png)

The best Swiper component for React Native.

## Roadmap

### V2

- [ ] **Compatible with android**

- [ ] Fixes currently bugs

- [ ] More features

- [ ] Improve performance

- [ ] Landscape mode

> Please track in [milestones:v2](https://github.com/leecade/react-native-swiper/milestones/v2)

> Contribute code to [branch:Android](https://github.com/leecade/react-native-swiper/tree/android) and [branch:V2](https://github.com/leecade/react-native-swiper/tree/v2)

> Provide creative in [issues](https://github.com/leecade/react-native-swiper/issues)

-----

### V1

- [ ] **Support for Android**

- [ ] More switch effects

- [ ] Unit tests

- [ ] Check typo

- [x] Infinite loop

- [x] Direction control

- [x] Complete custom style

- [x] Allow title display & custom

- [x] Multiple instances

- [x] Custom container size

- [x] Control buttons

- [x] Autoplay

- [x] Custom pagination style

- [x] State inject

## Changelogs

- **[1.4.4]**
  + Support for React Native latest(`^0.26.0`)
  + Updates examples to work with react-native-swiper 1.4.4
  + Examples now run on Android (some are still buggy, needs more work)
  + Removes old examples folder

- **[1.4.3]**
  + Fixed auto play issue when only a child view

- [v1.4.0]
  + Support for React Native latest(`^0.17.0`) & Upgrade examples base on Xcode `7.2` / React Native `0.17.0`

  + Upgrade build tool to babel6

  + Add missing deps `react-timer-mixin`

  + [1f8643a](https://github.com/leecade/react-native-swiper/commit/1f8643a67e2768d165132a19629a991a86672036) Move Dimensions import to deconstructed React import for react-native (@thanks [@jedrekk](https://github.com/jedrekk)).

  + [e28af9b](https://github.com/leecade/react-native-swiper/commit/e28af9b205f17447cb3149b45fc220beec037bce) Support index property in combination with loop property (@thanks [@almost](https://github.com/almost)).

  + [6c832d](https://github.com/leecade/react-native-swiper/commit/6c832d6a23da3737a2e8a2667273dc6093bcc9ee) fix warnings about keys for dots (@thanks [@sunnylqm](https://github.com/sunnylqm)).

  + [8de1afc](https://github.com/leecade/react-native-swiper/commit/8de1afcb75a003424231bb089802db53bbbf84e4) Changes to make the example work in xcode 7 (@thanks [@allomov](https://github.com/allomov)).

- [v1.3.0]
  + [8d6d75c](https://github.com/leecade/react-native-swiper/commit/8d6d75c00edf87b603c218aad0018932277814b5) inject `state` in ScrollResponders (@thanks [@smothers](https://github.com/smothers)).

- [v1.2.2]
  + [890c0ce](https://github.com/leecade/react-native-swiper/commit/890c0ce64e2192c2ca7830e6699f67b88171e74b) ensure `onMomentumScrollEnd` synchronous update `index`.

- [v1.2.0]
  + [838b24c](https://github.com/leecade/react-native-swiper/commit/838b24cbeaf49b9ca1dabb4eed8305e314503fb1) Re-design a loop model for avoid img flickering.
  + [9cb91c5](https://github.com/leecade/react-native-swiper/commit/9cb91c58c84034b0b8b874dbfc2a44da982686a8) fixes [#7](https://github.com/leecade/react-native-swiper/issues/6) `onMomentumScrollEnd` lost `event` param. (thanks [@smothers](https://github.com/smothers))

- [v1.1.1]
  + [21f0b00](https://github.com/leecade/react-native-swiper/commit/21f0b00138b6936cd3dfac2eb107a14c99c7392b) fixes [#6](https://github.com/leecade/react-native-swiper/issues/6) a define-propType error. (thanks [@benjamingeorge](https://github.com/benjamingeorge))

- [v1.1.0]
  + [44ec630](https://github.com/leecade/react-native-swiper/commit/44ec630b62844dbeaccee73adaa0996e319ebffb) fixes [#4](https://github.com/leecade/react-native-swiper/issues/4) `onMoementumScrollEnd` gets overridden. (thanks [@subpublicanders](https://github.com/subpublicanders))
  + [5de06a7](https://github.com/leecade/react-native-swiper/commit/5de06a7aa86318ad38720728022b80e5cf98a2ab) New prop: `renderPagination`. (thanks [@aksonov](https://github.com/aksonov))

- [v1.0.4]
  + [21cb373](https://github.com/leecade/react-native-swiper/commit/21cb3732578588f9d47ee7ddda541577ad691970) fixes [#2](https://github.com/leecade/react-native-swiper/issues/2) Solve the problem of installation. (thanks [@jamwaffles](https://github.com/jamwaffles))

- [v1.0.3]
  + [0f796f3](https://github.com/leecade/react-native-swiper/commit/0f796f3557b5aeb1772573cd7ecae2e835bccc0b) fixes [#1](https://github.com/leecade/react-native-swiper/issues/1) Two 'horizontal' in propTypes. (thanks [@MacyzZ](https://github.com/MacyzZ))

## Show Cases

> Try these cases by yourself very easy, Just open `examples/ios/swiper.xcodeproj` in Xcode, then press `Cmd + R`; you may edit `examples/index.ios.js` for switch cases.

### [examples/basic.js](https://github.com/leecade/react-native-swiper/blob/master/examples/examples/basic.js)

![](http://i.imgur.com/zrsazAG.gif =300x)

### [examples/swiper.js](https://github.com/leecade/react-native-swiper/blob/master/examples/examples/swiper.js)

![](http://i.imgur.com/hP3f3oO.gif =300x)

### [examples/swiper_number.js](https://github.com/leecade/react-native-swiper/blob/master/examples/examples/swiper_number.js)

![](http://i.imgur.com/0rqESVb.gif =300x)

### [examples/phone.js](https://github.com/leecade/react-native-swiper/blob/master/examples/examples/phone.js)

![](http://i.imgur.com/c1BhjZm.gif =300x)

## Getting Started

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Properties](#properties)
  + [Basic](#basic)
  + [Custom basic style & content](#custom-basic-style--content)
  + [Pagination](#pagination)
  + [Autoplay](#autoplay)
  + [Control buttons](#control-buttons)
  + [Props of Children](#props-of-children)
  + [Basic props of `<ScrollView />`](#basic-props-of-scrollview-)
  + [Supported ScrollResponder](#supported-scrollresponder)
- [Examples](#examples)
- [Development](#development)

### Installation

```bash
$ npm i react-native-swiper --save
```

### Basic Usage

- Install `react-native` first

```bash
$ npm i react-native -g
```

- Initialization of a react-native project

```bash
$ react-native init myproject
```

- Then, edit `myproject/index.ios.js`, like this:

```jsx
var Swiper = require('react-native-swiper')
// es6
// import Swiper from 'react-native-swiper'

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

var swiper = React.createClass({
  render: function() {
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
    )
  }
})

AppRegistry.registerComponent('swiper', () => swiper)
```

### Properties

#### Basic

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| horizontal | true | `bool` | If `true`, the scroll view's children are arranged horizontally in a row instead of vertically in a column. |
| loop | true | `bool` | Set to `false` to disable continuous loop mode. |
| index | 0 | `number` | Index number of initial slide. |
| showsButtons | false | `bool` | Set to `true` make control buttons visible. |
| autoplay | false | `bool` | Set to `true` enable auto play mode. |

#### Custom basic style & content

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| width | - | `number` | If no specify default enable fullscreen mode by `flex: 1`. |
| height | - | `number` | If no specify default fullscreen mode by `flex: 1`. |
| style | {...} | `style` | See default style in source. |

#### Pagination

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| showsPagination | true | `bool` | Set to `true` make pagination visible. |
| paginationStyle | {...} | `style` | Custom styles will merge with the default styles. |
| renderPagination | - | `function` | Complete control how to render pagination with three params (`index`, `total`, `context`) ref to `this.state.index` / `this.state.total` / `this`, For example: show numbers instead of dots. |
| dot | `<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />` | `element` | Allow custom the dot element. |
| activeDot | `<View style={{backgroundColor: '#007aff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />` | `element` | Allow custom the active-dot element. |

#### Autoplay

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| autoplay | true | `bool` | Set to `true` enable auto play mode. |
| autoplayTimeout | 2.5 | `number` | Delay between auto play transitions (in second). |
| autoplayDirection | true | `bool` | Cycle direction control. |

#### Control buttons

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| showsButtons | true | `bool` | Set to `true` make control buttons visible. |
| buttonWrapperStyle | `{backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center'}` | `style` | Custom styles. |
| nextButton | `<Text style={styles.buttonText}>›</Text>` | `element` | Allow custom the next button. |
| prevButton | `<Text style={styles.buttonText}>‹</Text>` | `element` | Allow custom the prev button. |

#### Props of Children

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| style | {...} | `style` | Custom styles will merge with the default styles. |
| title | {<Text numberOfLines={1}>...</Text>} | `element` | If this parameter is not specified, will not render the title. |

#### Basic props of `<ScrollView />`

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| horizontal | true | `bool` | If `true`, the scroll view's children are arranged horizontally in a row instead of vertically in a column. |
| pagingEnabled | true | `bool` | If true, the scroll view stops on multiples of the scroll view's size when scrolling. This can be used for horizontal pagination.  |
| showsHorizontalScrollIndicator | false | `bool` | Set to `true` if you want to show horizontal scroll bar. |
| showsVerticalScrollIndicator | false | `bool` |  Set to `true` if you want to show vertical scroll bar. |
| bounces | false | `bool` | If `true`, the scroll view bounces when it reaches the end of the content if the content is larger then the scroll view along the axis of the scroll direction. If `false`, it disables all bouncing even if the alwaysBounce* props are true.  |
| scrollsToTop | false | `bool` | If true, the scroll view scrolls to top when the status bar is tapped.  |
| removeClippedSubviews | true | `bool` | If true, offscreen child views (whose overflow value is hidden) are removed from their native backing superview when offscreen. This canimprove scrolling performance on long lists.  |
| automaticallyAdjustContentInsets | false | `bool` | Set to `true` if you need adjust content insets automation. |

> @see: http://facebook.github.io/react-native/docs/scrollview.html

#### Supported ScrollResponder

| Prop  | Params  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| onScrollBeginDrag | `e` / `state` / `context` | `function` | When animation begins after letting up |
| onMomentumScrollEnd | `e` / `state` / `context` | `function` | Makes no sense why this occurs first during bounce |
| onTouchStartCapture | `e` / `state` / `context` | `function` | Immediately after `onMomentumScrollEnd` |
| onTouchStart | `e` / `state` / `context` | `function` | Same, but bubble phase |
| onTouchEnd | `e` / `state` / `context` | `function` | You could hold the touch start for a long time |
| onResponderRelease | `e` / `state` / `context` | `function` | When lifting up - you could pause forever before * lifting |

> Note: each ScrollResponder be injected with two params: `state` and `context`, you can get `state` and `context`(ref to swiper's `this`) from params, for example:

```jsx
var swiper = React.createClass({
  _onMomentumScrollEnd: function (e, state, context) {
    console.log(state, context.state)
  },
  render: function() {
    return (
      <Swiper style={styles.wrapper}
      onMomentumScrollEnd ={this._onMomentumScrollEnd}
     ...
      </Swiper>
    )
  }
})
```

> More ScrollResponder info, see: https://github.com/facebook/react-native/blob/master/Libraries/Components/ScrollResponder.js

### Examples

@TODO, see code in [examples](https://github.com/leecade/react-native-swiper/tree/master/examples/examples) first.

### Development

```bash
$ npm start
```

## Contribution

- [@leecade](mailto:leecade@163.com) The main author.
- [@rajkissu](mailto:rajkissu@gmail.com) The secondary contributor.

## Questions

Feel free to [contact me](mailto:leecade@163.com) or [create an issue](https://github.com/leecade/react-native-swiper/issues/new)

> Inspired by [nolimits4web/Swiper](https://github.com/nolimits4web/swiper/) & Design material from [Dribbble](https://dribbble.com/) & made with ♥.
