<p align="center">
  <img alt="react-native-swiper" src="http://i.imgur.com/P4cRUgD.png" width="208">
</p>

<p align="center">
  The best Swiper component for React Native.
</p>

<p align="center">
  <a href="http://standardjs.com/"><img alt="JavaScript Style Guide" src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/react-native-swiper"><img alt="npm version" src="http://img.shields.io/npm/v/react-native-swiper.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/react-native-swiper"><img alt="npm version" src="http://img.shields.io/npm/dm/react-native-swiper.svg?style=flat-square"></a>
  <a href="https://github.com/leecade/react-native-swiper/pulls?q=is%3Apr+is%3Aclosed"><img alt="PR Stats" src="https://img.shields.io/issuestats/i/github/leecade/react-native-swiper.svg?style=flat-square"></a>
  <a href="https://github.com/leecade/react-native-swiper/issues?q=is%3Aissue+is%3Aclosed"><img alt="Issue Stats" src="https://img.shields.io/issuestats/p/github/leecade/react-native-swiper.svg?style=flat-square"></a>
  <a href="https://gitter.im/leecade/react-native-swiper?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img alt="Join the chat" src="https://badges.gitter.im/leecade/react-native-swiper.svg"></a>
</p>

# react-native-swiper

## Roadmap

> see: [ROADMAP.md](ROADMAP.md)

## Changelogs

- **[1.6.0-rc]**
  - Dependency
    - Remove ViewPagerAndroid, use ScrollView #1009
  - Test Integration
    - Setup e2e test
  - TypeScript
    - correct the wrong types #1000
    - Add missing scrollBy TypeScript definition #931
  - New Feature
    - add scrollTo #831
    - Added prop to disable the PrevButton #749
    - Optionally render page #1004
  - Bug Fix
    - ES6 and CommonJS compatibility #717
    - Solves the issue of state messing up when parent component calls setState #939
    - replay when autoplay is setted to true #1002
    - fix broken examples and migrate to react-native 0.60.x
    - fix bad jumping on ios when loadMinimal set true
    - fix fliker when loop and loadMinimal are enabled #1062

* [1.5.6]

  - Fix [#16](https://github.com/leecade/react-native-swiper/issues/16), [#36](https://github.com/leecade/react-native-swiper/issues/36), [#371](https://github.com/leecade/react-native-swiper/issues/371), [#410](https://github.com/leecade/react-native-swiper/issues/410), [#411](https://github.com/leecade/react-native-swiper/issues/411), [#422](https://github.com/leecade/react-native-swiper/issues/422), [#468](https://github.com/leecade/react-native-swiper/issues/468) Fix landscape orientation auto resize! (thanks [@ahmed3mar](https://github.com/ahmed3mar), [@timmywil](https://github.com/timmywil))
  - Add containerStyle prop to customize the view container.

* [1.5.5]
  - Update: using PropTypes from prop-types and Change View.propTypes to ViewPropTypes

- [1.5.4]

  - Added easily accessible pagination point manipulation: use `dotColor` / `activeDotColor` and `dotStyle` / `activeDotStyle` (thanks [@denizs](https://github.com/denizs))
  - Added scrollEnabled prop to documentation (thanks [@ibandominguez](https://github.com/ibandominguez))

- [1.5.3]

  - Add loadMinimalLoader prop to customize `<ActivityIndicator />` (thanks [@Exilz](https://github.com/Exilz))
  - Disable autoplay timer when prop changes to false (thanks [@dizlexik](https://github.com/dizlexik))
  - Special thanks to [@hypatiah](https://github.com/dizlexik) for fixed some grammatical errors in README

- [1.5.2]
  - Add yarn lock
  - Fix jitter when quickly swiping back and forth between pages (iOS) (thanks [@nemophrost](https://github.com/nemophrost))
  - The first webview always reloaded when injecting the rest of the children (thanks [@eosterberg](https://github.com/eosterberg))

> see more: [CHANGELOG.md](CHANGELOG.md)

## Show Cases

> Try these cases by yourself very easy, Just open `examples/ios/swiper.xcodeproj` in Xcode, then press `Cmd + R`; you may edit `examples/index.ios.js` for switch cases.

### [examples/components/Basic](https://github.com/leecade/react-native-swiper/blob/master/examples/components/Basic)

![](http://i.imgur.com/zrsazAG.gif=300x)

### [examples/components/Swiper](https://github.com/leecade/react-native-swiper/blob/master/examples/components/Swiper)

![](http://i.imgur.com/hP3f3oO.gif=300x)

### [examples/components/SwiperNumber](https://github.com/leecade/react-native-swiper/blob/master/examples/components/SwiperNumber)

![](http://i.imgur.com/0rqESVb.gif=300x)

### [examples/components/Phone](https://github.com/leecade/react-native-swiper/blob/master/examples/components/Phone)

![](http://i.imgur.com/c1BhjZm.gif=300x)

### [examples/components/LoadMinimal](https://github.com/leecade/react-native-swiper/blob/master/examples/components/LoadMinimal)

![](http://i.imgur.com/LAOHbJA.gif=300x)

## Getting Started

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Properties](#properties)
  - [Basic](#basic)
  - [Custom basic style & content](#custom-basic-style--content)
  - [Pagination](#pagination)
  - [Autoplay](#autoplay)
  - [Control buttons](#control-buttons)
  - [Props of Children](#props-of-children)
  - [Basic props of `<ScrollView />`](#basic-props-of-scrollview-)
  - [Supported ScrollResponder](#supported-scrollresponder)
- [Examples](#examples)
- [Development](#development)

### Installation

> v1.5.14

```bash
$ npm i react-native-swiper --save
```

> v1.6.0-rc

```
npm i --save react-native-swiper@next
```

### Basic Usage

- Install `react-native` first

```bash
$ npm i react-native-cli -g
```

- Initialization of a react-native project

```bash
$ react-native init myproject
```

- Then, edit `myproject/index.ios.js`, like this:

```jsx
import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'

import Swiper from 'react-native-swiper'

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default class SwiperComponent extends Component {
  render() {
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
}

AppRegistry.registerComponent('myproject', () => SwiperComponent)
```

### Properties

#### Basic

| Prop           |     Default     |   Type   | Description                                                                                                 |
| :------------- | :-------------: | :------: | :---------------------------------------------------------------------------------------------------------- |
| horizontal     |      true       |  `bool`  | If `true`, the scroll view's children are arranged horizontally in a row instead of vertically in a column. |
| loop           |      true       |  `bool`  | Set to `false` to disable continuous loop mode.                                                             |
| index          |        0        | `number` | Index number of initial slide.                                                                              |
| showsButtons   |      false      |  `bool`  | Set to `true` make control buttons visible.                                                                 |
| autoplay       |      false      |  `bool`  | Set to `true` enable auto play mode.                                                                        |
| onIndexChanged | (index) => null |  `func`  | Called with the new index when the user swiped                                                              |

#### Custom basic style & content

| Prop              |         Default         |   Type    | Description                                                                |
| :---------------- | :---------------------: | :-------: | :------------------------------------------------------------------------- |
| width             |            -            | `number`  | If no specify default enable fullscreen mode by `flex: 1`.                 |
| height            |            -            | `number`  | If no specify default fullscreen mode by `flex: 1`.                        |
| style             |          {...}          |  `style`  | See default style in source.                                               |
| containerStyle    |          {...}          |  `style`  | See default container style in source.                                     |
| loadMinimal       |          false          |  `bool`   | Only load current index slide , `loadMinimalSize` slides before and after. |
| loadMinimalSize   |            1            | `number`  | see `loadMinimal`                                                          |
| loadMinimalLoader | `<ActivityIndicator />` | `element` | Custom loader to display when slides aren't loaded                         |

#### Pagination

| Prop             |                                                                          Default                                                                          |    Type    | Description                                                                                                                                                                                   |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| showsPagination  |                                                                           true                                                                            |   `bool`   | Set to `true` make pagination visible.                                                                                                                                                        |
| paginationStyle  |                                                                           {...}                                                                           |  `style`   | Custom styles will merge with the default styles.                                                                                                                                             |
| renderPagination |                                                                             -                                                                             | `function` | Complete control how to render pagination with three params (`index`, `total`, `context`) ref to `this.state.index` / `this.state.total` / `this`, For example: show numbers instead of dots. |
| dot              | `<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />` | `element`  | Allow custom the dot element.                                                                                                                                                                 |
| activeDot        |   `<View style={{backgroundColor: '#007aff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />`    | `element`  | Allow custom the active-dot element.                                                                                                                                                          |
| dotStyle         |                                                                             -                                                                             |  `object`  | Allow custom the dot element.                                                                                                                                                          |
| dotColor         |                                                                             -                                                                             |  `string`  | Allow custom the dot element.                                                                                                                                                          |
| activeDotColor   |                                                                             -                                                                             |  `string`  | Allow custom the active-dot element.                                                                                                                                                          |
| activeDotStyle   |                                                                             -                                                                             |  `object`  | Allow custom the active-dot element.                                                                                                                                                          |

#### Autoplay

| Prop              | Default |   Type   | Description                                      |
| :---------------- | :-----: | :------: | :----------------------------------------------- |
| autoplay          |  true   |  `bool`  | Set to `true` enable auto play mode.             |
| autoplayTimeout   |   2.5   | `number` | Delay between auto play transitions (in second). |
| autoplayDirection |  true   |  `bool`  | Cycle direction control.                         |

#### Control buttons

| Prop               |                                                                                                   Default                                                                                                   |   Type    | Description                                 |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------: | :------------------------------------------ |
| showsButtons       |                                                                                                    true                                                                                                     |  `bool`   | Set to `true` make control buttons visible. |
| buttonWrapperStyle | `{backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center'}` |  `style`  | Custom styles.                              |
| nextButton         |                                                                                 `<Text style={styles.buttonText}>›</Text>`                                                                                  | `element` | Allow custom the next button.               |
| prevButton         |                                                                                 `<Text style={styles.buttonText}>‹</Text>`                                                                                  | `element` | Allow custom the prev button.               |

#### Props of Children

| Prop  |               Default                |   Type    | Description                                                    |
| :---- | :----------------------------------: | :-------: | :------------------------------------------------------------- |
| style |                {...}                 |  `style`  | Custom styles will merge with the default styles.              |
| title | {<Text numberOfLines={1}>...</Text>} | `element` | If this parameter is not specified, will not render the title. |

#### Basic props of `<ScrollView />`

| Prop                             | Default |  Type  | Description                                                                                                                                                                                                                                     |
| :------------------------------- | :-----: | :----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| horizontal                       |  true   | `bool` | If `true`, the scroll view's children are arranged horizontally in a row instead of vertically in a column.                                                                                                                                     |
| pagingEnabled                    |  true   | `bool` | If true, the scroll view stops on multiples of the scroll view's size when scrolling. This can be used for horizontal pagination.                                                                                                               |
| showsHorizontalScrollIndicator   |  false  | `bool` | Set to `true` if you want to show horizontal scroll bar.                                                                                                                                                                                        |
| showsVerticalScrollIndicator     |  false  | `bool` | Set to `true` if you want to show vertical scroll bar.                                                                                                                                                                                          |
| bounces                          |  false  | `bool` | If `true`, the scroll view bounces when it reaches the end of the content if the content is larger then the scroll view along the axis of the scroll direction. If `false`, it disables all bouncing even if the alwaysBounce\* props are true. |
| scrollsToTop                     |  false  | `bool` | If true, the scroll view scrolls to top when the status bar is tapped.                                                                                                                                                                          |
| removeClippedSubviews            |  true   | `bool` | If true, offscreen child views (whose overflow value is hidden) are removed from their native backing superview when offscreen. This canimprove scrolling performance on long lists.                                                            |
| automaticallyAdjustContentInsets |  false  | `bool` | Set to `true` if you need adjust content insets automation.                                                                                                                                                                                     |
| scrollEnabled                    |  true   | `bool` | Enables/Disables swiping                                                                                                                                                                                                                        |

> @see: http://facebook.github.io/react-native/docs/scrollview.html

#### Supported ScrollResponder

| Prop                |          Params           |    Type    | Description                                                 |
| :------------------ | :-----------------------: | :--------: | :---------------------------------------------------------- |
| onScrollBeginDrag   | `e` / `state` / `context` | `function` | When animation begins after letting up                      |
| onMomentumScrollEnd | `e` / `state` / `context` | `function` | Makes no sense why this occurs first during bounce          |
| onTouchStartCapture | `e` / `state` / `context` | `function` | Immediately after `onMomentumScrollEnd`                     |
| onTouchStart        | `e` / `state` / `context` | `function` | Same, but bubble phase                                      |
| onTouchEnd          | `e` / `state` / `context` | `function` | You could hold the touch start for a long time              |
| onResponderRelease  | `e` / `state` / `context` | `function` | When lifting up - you could pause forever before \* lifting |

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

### Methods

#### scrollBy(index, animated)

Scroll by relative index.

Parameters:

| Name     |   Type   |   default   | Description  |
| :------- | :------: | :---------: | :----------- |
| index    | `number` | `undefined` | offset index |
| animated |  `bool`  |   `true`    | offset index |

### Examples

```bash
$ cd examples
$ npm i
$ react-native run-ios
```

> Quick start with [examples](https://github.com/leecade/react-native-swiper/tree/master/examples/).

### Development

```bash
$ cd examples
$ yarn
$ yarn start
$ react-native run-ios
```

Then launch simulator to preview. Note that you just need to edit the source file `src/index.js`, the change will auto sync to examples.

After development, you should add test for your modification and make all tests passed to prevent other contributors break the feature in the future accidentally. We use detox + jest for e2e test now, you can read [Detox](https://github.com/wix/Detox) for more detail.

## Contribution

- [@leecade](mailto:leecade@163.com) The main author.
- [@rajkissu](mailto:rajkissu@gmail.com) The secondary contributor.

## Questions

Feel free to [contact me](mailto:leecade@163.com) or [create an issue](https://github.com/leecade/react-native-swiper/issues/new)

> Inspired by [nolimits4web/Swiper](https://github.com/nolimits4web/swiper/) & Design material from [Dribbble](https://dribbble.com/) & made with ♥.

---

## 💖 Sponsors

- [ZMTO](https://www.zmto.com) - Cloud Infrastructure & Hosting


## 🌐 Web Resources & Interactive Index
- [UPHILL RUSH 13](https://quizverses.pages.dev/uphill-rush-13.html)
- [IDLE MERGE CAR AND RACE](https://themindzone.pages.dev/idle-merge-car-and-race.html)
- [LAZY WORKERS](https://thelearnquesters.pages.dev/lazy-workers.html)
- [PESKY MOLES](https://thequizzone.pages.dev/pesky-moles.html)
- [CATEGORY RAGDOLL57](https://thelearnquester.web.app/category-ragdoll57.html)
- [CRAZY PLANE LANDING](https://learnquester.github.io/crazy-plane-landing.html)
- [BACKYARD DIG HOLE 3D SIMULATOR](https://theskillquest.pages.dev/backyard-dig-hole-3d-simulator.html)
- [INDEX5](https://thelearnquesters.pages.dev/index5.html)
- [THE SPECIMEN ZERO](https://iskillplay.web.app/the-specimen-zero.html)
- [STOP THE BULLET](https://studyplayings.pages.dev/stop-the-bullet.html)
- [FORCE MASTER 3D](https://themindskillplayplay.pages.dev/force-master-3d.html)
- [SQUID GAME MEMORY CARD MATCH](https://theskillquest.pages.dev/squid-game-memory-card-match.html)
- [CATEGORY CASUAL 3](https://themindskillplayplay.pages.dev/category-casual-3.html)
- [CATEGORY BOXING](https://themindzone.pages.dev/category-boxing.html)
- [TARCAT](https://themindplaying.web.app/tarcat.html)
- [MERGEDUELIO](https://studyquests.github.io/mergeduelio.html)
- [3D CHESS MASTER](https://themindplaying.web.app/3d-chess-master.html)
- [CATEGORY SPACE57](https://thequizzone.pages.dev/category-space57.html)
- [HALLOWEEN FRUIT SLICE](https://studyplaying.github.io/halloween-fruit-slice.html)
- [CATEGORY ROGUELIKE38](https://iskillquest.pages.dev/category-roguelike38.html)
- [CATEGORY IDLE445](https://studyplaying.github.io/category-idle445.html)
- [FALLING PARTY](https://iskillquest.pages.dev/falling-party.html)
- [BRAINROT BRIDGE RACE 3D](https://studyplaying.github.io/brainrot-bridge-race-3d.html)
- [CATEGORY OBBY](https://thelearnquesters.pages.dev/category-obby.html)
- [ICE CUBE](https://thequizzone.pages.dev/ice-cube.html)
- [CATEGORY MOBILE2 112 2](https://studyplaying.github.io/category-mobile2-112-2.html)
- [CATEGORY STRATEGY 2](https://themindplay.pages.dev/category-strategy-2.html)
- [CATEGORY IDLE GAMES](https://themindskillplayplay.pages.dev/category-idle-games.html)
- [MAJESTIC DRAGONS MERGE](https://thequizzone.pages.dev/majestic-dragons-merge.html)
- [CATEGORY INTERSTELLAR](https://studyquests.github.io/category-interstellar.html)
- [CATEGORY LOVE12](https://themindplay.github.io/category-love12.html)
- [SOLITAIRE LAMOUR](https://themindplaying.web.app/solitaire-lamour.html)
- [CATEGORY FOOD95](https://learnquester.github.io/category-food95.html)
- [MERGE MASTER](https://studyquesthub.web.app/merge-master.html)
- [SNIPER ELITE 3D](https://themindplay.pages.dev/sniper-elite-3d.html)
- [CATEGORY CASUAL 15](https://thequizzone.pages.dev/category-casual-15.html)
- [CATEGORY SANDBOX](https://themindskillplayplay.pages.dev/category-sandbox.html)
- [TOBININ](https://studyplayings.pages.dev/tobinin.html)
- [TWILIGHT SOLITAIRE TRIPEAKS](https://quizverses-9d2f2.web.app/twilight-solitaire-tripeaks.html)
- [OMG WORD SUSHI](https://theskillquest.pages.dev/omg-word-sushi.html)
- [AVATAR LIFE MY TOWN](https://studyplaying.github.io/avatar-life-my-town.html)
- [GRAND THEFT NY](https://themindskillplayplay.pages.dev/grand-theft-ny.html)
- [SURVIVE LAVA FOR BRAINROTS](https://quizverses-9d2f2.web.app/survive-lava-for-brainrots.html)
- [CATEGORY PUZZLE](https://iskillquest.pages.dev/category-puzzle.html)
- [ROCKET FEST](https://iskillquest.pages.dev/rocket-fest.html)
- [SLIDE RABBIT](https://studyplayings.pages.dev/slide-rabbit.html)
- [SQUARE PUNKI LONG HAND](https://learnquester.pages.dev/square-punki-long-hand.html)
- [INDEX28](https://themindzone.pages.dev/index28.html)
- [1945 AIR FORCE SPACE SHOOTER](https://theskillquest.pages.dev/1945-air-force-space-shooter.html)
- [CARDS 2048](https://learnquester.pages.dev/cards-2048.html)
- [SUPERMARKET SHOPPING FOR KIDS](https://theskillquest.pages.dev/supermarket-shopping-for-kids.html)
- [AHA WORLD DREAM TOWN](https://themindplay.pages.dev/aha-world-dream-town.html)
- [FORMULA RACERS](https://themindskillplayplay.pages.dev/formula-racers.html)
- [NOOB SHOOTER GUN BATTLE 3D](https://studyplayings.pages.dev/noob-shooter-gun-battle-3d.html)
- [CATEGORY MINECRAFT 2](https://themindzone.pages.dev/category-minecraft-2.html)
- [ENERGY CLICKER](https://theskillquest.pages.dev/energy-clicker.html)
- [SPRUNKI LAVA ESCAPE 2PLAYER](https://themindplaying.web.app/sprunki-lava-escape-2player.html)
- [OMEGA LAYERS](https://studyquests.github.io/omega-layers.html)
- [DIY MAKEUP SALON SPA MAKEOVER STUDIO](https://themindplays.pages.dev/diy-makeup-salon-spa-makeover-studio.html)
- [BLACKRIVER MYSTERY HIDDEN OBJECTS](https://themindzone.pages.dev/blackriver-mystery-hidden-objects.html)
- [NITRO SPEED CAR RACING](https://learnquesters.pages.dev/nitro-speed-car-racing.html)
- [WAR STATE IO CONQUER BATTLES](https://themindplay.github.io/war-state-io-conquer-battles.html)
- [BACKWOODS](https://quizverses-9d2f2.web.app/backwoods.html)
- [HIDDEN OBJECT EMILYS CASE](https://studyquests.github.io/hidden-object-emilys-case.html)
- [CATEGORY MAHJONG 3](https://themindplay.pages.dev/category-mahjong-3.html)
- [INDEX15](https://themindzone.pages.dev/index15.html)
- [BELL MADNESS](https://themindskillplayplay.pages.dev/bell-madness.html)
- [DART HERO](https://studyquesthub.web.app/dart-hero.html)
- [TILE MATCH CAFE](https://theskillquest.pages.dev/tile-match-cafe.html)
- [IDLE FACTORY EMPIRE](https://quizverses-9d2f2.web.app/idle-factory-empire.html)
- [PET SALON SIMULATOR](https://studyplaying.github.io/pet-salon-simulator.html)
- [SOLITAIRE FARM SEASONS 3](https://quizverses-9d2f2.web.app/solitaire-farm-seasons-3.html)
- [SNIPER VS SNIPER](https://theskillquest.pages.dev/sniper-vs-sniper.html)
- [ANIME DRESS UP DOLL DRESS UP](https://quizverses-9d2f2.web.app/anime-dress-up-doll-dress-up.html)
- [GLAMOUR BEACHLIFE](https://studyquests.github.io/glamour-beachlife.html)
- [BULLET SUPERHERO](https://studyplayings.pages.dev/bullet-superhero.html)
- [HYPERSPACE   QUANTUM FRACTURE FEZ](https://learnquesters.pages.dev/hyperspace---quantum-fracture-fez.html)
- [BRAIN FIND CAN YOU FIND IT](https://quizverses.pages.dev/brain-find-can-you-find-it.html)
- [COLOR 3D BUMP IT UP](https://quizverses-9d2f2.web.app/color-3d-bump-it-up.html)
- [MATH QUEST](https://studyplaying.github.io/math-quest.html)
- [HEROES OF MATCH 3](https://themindplay.github.io/heroes-of-match-3.html)
- [SUPERPIXELINT](https://studyplaying.github.io/superpixelint.html)
- [CAR PARKING STUNT GAMES 2024](https://iskillquest.pages.dev/car-parking-stunt-games-2024.html)
- [MAKEUP TRENDS THEN AND NOW](https://studyplaying.github.io/makeup-trends-then-and-now.html)
- [AIRWAYS MAZE](https://studyplayings.pages.dev/airways-maze.html)
- [CATEGORY MAHJONG 2](https://studyplaying.github.io/category-mahjong-2.html)
- [CATEGORY STICKMAN](https://studyquesthub.web.app/category-stickman.html)
- [GOKARTS IO](https://themindplays.pages.dev/gokarts-io.html)
- [MATH RUNNER](https://thelearnquesters.pages.dev/math-runner.html)
- [CHICKZ STACK](https://studyplayings.pages.dev/chickz-stack.html)
- [FIND HIDDEN SECRETS](https://studyplayings.pages.dev/find-hidden-secrets.html)
- [PEOPLE PLAYGROUND RAGDOLL ARENA](https://themindzone.pages.dev/people-playground-ragdoll-arena.html)
- [RAGDOLL JUMP](https://themindskillplayplay.pages.dev/ragdoll-jump.html)
- [ATHENA MATCH](https://iskillquest.pages.dev/athena-match.html)
- [CATEGORY PUZZLE 8](https://themindskillplayplay.pages.dev/category-puzzle-8.html)
- [GRANNY RETURNS 3D EVIL DESTINY](https://learnquester.pages.dev/granny-returns-3d-evil-destiny.html)
- [RESTAURANT VIP MASTERCHEF](https://studyquests.github.io/restaurant-vip-masterchef.html)
- [GUMMY MERGE](https://themindplaying.web.app/gummy-merge.html)
- [CATEGORY ESCAPE](https://learnquester.pages.dev/category-escape.html)
- [THATS MY SEAT LOGIC PUZZLE](https://themindplays.pages.dev/thats-my-seat-logic-puzzle.html)
- [TANK BATTLE WAR COMMANDER](https://themindplaying.web.app/tank-battle-war-commander.html)
- [KITTY SQUAD WINTER DRESS UP](https://thelearnquesters.pages.dev/kitty-squad-winter-dress-up.html)
- [CATEGORY RUNNING107](https://studyquests.github.io/category-running107.html)
- [INK SHOP DRESS TATTOO](https://thelearnquesters.pages.dev/ink-shop-dress-tattoo.html)
- [SQUID GAME HUNTER](https://quizverses.pages.dev/squid-game-hunter.html)
- [CATEGORY NETSUPPORT](https://themindplay.pages.dev/category-netsupport.html)
- [HEXA SORT 3D](https://themindzone.pages.dev/hexa-sort-3d.html)
- [THE TRENDY MERMAID](https://iskillquest.pages.dev/the-trendy-mermaid.html)
- [CATEGORY GROW99](https://themindzone.pages.dev/category-grow99.html)
- [AIR BLOCK](https://learnquester.pages.dev/air-block.html)
- [CATEGORY ADVENTURE 3](https://thequizzone.pages.dev/category-adventure-3.html)
- [CATEGORY DRESS UP 3](https://studyquests.github.io/category-dress-up-3.html)
- [GUN CRAFT RUN WEAPON FIRE](https://learnquesters.pages.dev/gun-craft-run-weapon-fire.html)
- [COLOR JAM 3D](https://themindplays.pages.dev/color-jam-3d.html)
- [FORTUNES DECK SOLITAIRE](https://studyplayings.pages.dev/fortunes-deck-solitaire.html)
- [MAGIC AND WIZARDS MATCH](https://studyplaying.github.io/magic-and-wizards-match.html)
- [PORTAL TD TOWER DEFENSE](https://learnquester.pages.dev/portal-td-tower-defense.html)
- [BOUNCING CHICK](https://themindplay.pages.dev/bouncing-chick.html)
- [BRAINROT A DIFFERENCE CHALLENGE](https://learnquester.pages.dev/brainrot-a-difference-challenge.html)
- [TRAIN DRIFT](https://themindskillplayplay.pages.dev/train-drift.html)
- [HUGGY MIX SPRUNKI MUSIC BOX](https://themindskillplayplay.pages.dev/huggy-mix-sprunki-music-box.html)
- [CATEGORY WAR](https://studyquesthub.web.app/category-war.html)
- [CATEGORY UNBLOCKED WEBSITES](https://themindplays.pages.dev/category-unblocked-websites.html)
- [RAGDOLL BOB PUZZLE](https://studyplayings.pages.dev/ragdoll-bob-puzzle.html)
- [CATEGORY MATCH 3117](https://skillplay.github.io/category-match-3117.html)
- [ECO BLOCK PUZZLE](https://themindplaying.web.app/eco-block-puzzle.html)
- [FROM NERD TO SCHOOL POPULAR](https://thelearnquester.web.app/from-nerd-to-school-popular.html)
- [NUMBER BUBBLE SHOOTER WILD WEST](https://quizverses-9d2f2.web.app/number-bubble-shooter-wild-west.html)
- [HOT COLD WINTER STYLE](https://studyplaying.github.io/hot-cold-winter-style.html)
- [SOKOBAN PR](https://studyplaying.github.io/sokoban-pr.html)
