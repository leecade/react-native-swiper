# react-native-swiper

[![npm version](https://badge.fury.io/js/react-native-swiper.svg)](http://badge.fury.io/js/react-native-swiper)

![logo](http://i.imgur.com/P4cRUgD.png)

The best Swiper component for React Native.

## Feature & TODO

- [ ] More switch effects

- [ ] Unit tests

- [ ] Check typo

- [ ] Optimal performance when `<Image />` re-render

- [x] Infinite loop

- [x] Direction control

- [x] Complete custom style

- [x] Allow title display & custom

- [x] Multiple instances

- [x] Custom container size

- [x] Control buttons

- [x] Autoplay

- [x] Custom pagination style

## Changelogs

- **[v1.1.1]**
  + [21f0b00](https://github.com/leecade/react-native-swiper/commit/21f0b00138b6936cd3dfac2eb107a14c99c7392b) fixes [#6](https://github.com/leecade/react-native-swiper/issues/6) a define-propType error. (thanks [@benjamingeorge ](https://github.com/benjamingeorge))

- [v1.1.0]
  + [44ec630](https://github.com/leecade/react-native-swiper/commit/44ec630b62844dbeaccee73adaa0996e319ebffb) fixes [#4](https://github.com/leecade/react-native-swiper/issues/4) `onMoementumScrollEnd` gets overridden. (thanks [@subpublicanders](https://github.com/subpublicanders))
  + [5de06a7](https://github.com/leecade/react-native-swiper/commit/5de06a7aa86318ad38720728022b80e5cf98a2ab) New prop: `renderPagination`. (thanks [@aksonov](https://github.com/aksonov))

- [v1.0.4]
  + [21cb373](https://github.com/leecade/react-native-swiper/commit/21cb3732578588f9d47ee7ddda541577ad691970) fixes [#2](https://github.com/leecade/react-native-swiper/issues/2) Solve the problem of installation. (thanks [@jamwaffles](https://github.com/jamwaffles))

- [v1.0.3]
  + [0f796f3](https://github.com/leecade/react-native-swiper/commit/0f796f3557b5aeb1772573cd7ecae2e835bccc0b) fixes [#1](https://github.com/leecade/react-native-swiper/issues/1) Two 'horizontal' in propTypes. (thanks [@MacyzZ](https://github.com/MacyzZ))

## Show Cases

> Try these cases by yourself very easy, Just open `examples/swiper.xcodeproj` with Xcode, then press `Cmd + R`; you may edit `examples/index.ios.js` for switch cases.

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

```jsx
var Swiper = require('react-native-swiper')

// es6
// import Swiper from 'react-native-swiper'

var {
  AppRegistry,
} = React

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

| Prop  | Default  | Type | Describe |
| :------------ |:---------------:| :---------------:| :-----|
| horizontal | true | `bool` | If `true`, the scroll view's children are arranged horizontally in a row instead of vertically in a column. |
| loop | true | `bool` | Set to `true` to enable continuous loop mode. |
| index | 0 | `number` | Index number of initial slide. |
| showsButtons | false | `bool` | Set to `true` make control buttons visible. |
| autoplay | false | `bool` | Set to `true` enable auto play mode. |

#### Custom basic style & content

| Prop  | Default  | Type | Describe |
| :------------ |:---------------:| :---------------:| :-----|
| width | - | `number` | If no specify default enable fullscreen mode by `flex: 1`. |
| height | - | `number` | If no specify default fullscreen mode by `flex: 1`. |
| style | {...} | `style` | See default style in source. |

#### Pagination

| Prop  | Default  | Type | Describe |
| :------------ |:---------------:| :---------------:| :-----|
| showsPagination | true | `bool` | Set to `true` make pagination visible. |
| paginationStyle | {...} | `style` | Custom styles will merge with the default styles. |
| renderPagination | - | `function` | Complete control how to render pagination with two params (`index`, `total`) ref to `this.state.index` / `this.state.total`, For example: show numbers instead of dots. |
| dot | `<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />` | `element` | Allow custom the dot element. |
| activeDot | `<View style={{backgroundColor: '#007aff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />` | `element` | Allow custom the active-dot element. |

#### Autoplay

| Prop  | Default  | Type | Describe |
| :------------ |:---------------:| :---------------:| :-----|
| autoplay | true | `bool` | Set to `true` enable auto play mode. |
| autoplayTimeout | 2.5 | `number` | Delay between auto play transitions (in second). |
| autoplayDirection | true | `bool` | Cycle direction control. |

#### Control buttons

| Prop  | Default  | Type | Describe |
| :------------ |:---------------:| :---------------:| :-----|
| showsButtons | true | `bool` | Set to `true` make control buttons visible. |
| buttonWrapperStyle | `{backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center'}` | `style` | Custom styles. |
| nextButton | `<Text style={[styles.buttonText, {color: !this.props.loop && this.state.index == this.state.total - 1 ? 'rgba(0,0,0,0)' : '#007aff'}]}>›</Text>` | `element` | Allow custom the next button. |
| prevButton | `<Text style={[styles.buttonText, {color: !this.props.loop && this.state.index == 0 ? 'rgba(0,0,0,0)' : '#007aff'}]}>‹</Text>` | `element` | Allow custom the prev button. |

#### Props of Children

| Prop  | Default  | Type | Describe |
| :------------ |:---------------:| :---------------:| :-----|
| style | {...} | `style` | Custom styles will merge with the default styles. |
| title | {<Text numberOfLines={1}>...</Text>} | `element` | If this parameter is not specified, will not render the title. |

#### Basic props of `<ScrollView />`

| Prop  | Default  | Type | Describe |
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

| Prop  | Default  | Type | Describe |
| :------------ |:---------------:| :---------------:| :-----|
| onMomentumScrollBegin | - | `function` | When animation begins after letting up |
| onMomentumScrollEnd | - | `function` | Makes no sense why this occurs first during bounce |
| onTouchStartCapture | - | `function` | Immediately after `onMomentumScrollEnd` |
| onTouchStart | - | `function` | Same, but bubble phase |
| onTouchEnd | - | `function` | You could hold the touch start for a long time |
| onResponderRelease | - | `function` | When lifting up - you could pause forever before * lifting |

> @see: https://github.com/facebook/react-native/blob/master/Libraries/Components/ScrollResponder.js

### Examples

@TODO, see code in [examples](https://github.com/leecade/react-native-swiper/tree/master/examples/examples) first.

### Development

```bash
$ npm start
```

## Contribution

- [@leecade](mailto:leecade@163.com) The main author.

## Questions

Feel free to [contact me](mailto:leecade@163.com) or [create an issue](https://github.com/leecade/react-native-swiper/issues/new)

> Inspired by [nolimits4web/Swiper](https://github.com/nolimits4web/swiper/) & Design material from [Dribbble](https://dribbble.com/) & made with ♥.
