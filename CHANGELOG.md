
- [1.5.14]
  + fixes #582 (Android not setting this onLayout first?) #789 (thanks [@fungilation](https://github.com/fungilation))
  + Add onScrollBegin and onTouchEnd for Android #684 (thanks [@kostyaVyrodov](https://github.com/kostyaVyrodov))
- [1.5.13]
  + Workaround for react-native 0.4.8 contentOffset regression #572 (thanks [@nixoz](https://github.com/nixoz))
  + Fix wrong calculation of width and height after device rotation #581 (thanks [@kostyaVyrodov](https://github.com/kostyaVyrodov))
  + Calculated width & height on layout, used later on re-rendering. Possibility to change ScrollView styles #548 (thanks [@germanst](https://github.com/germanst))
- [1.5.12]
  + Update core packages
  + Optionally disable the 'next' control button (thanks [@SSTPIERRE2](https://github.com/SSTPIERRE2))
  + Fix `Uncaught TypeError: _this.refs.scrollView.scrollTo is not a function` (thanks [@flyskywhy](https://github.com/flyskywhy))
  + Allow dotStyle and activeDotStyle PropTypes to accept Stylesheet (thanks [@knopt](https://github.com/knopt))
  + Calculate the offset in the initial state instead of `onLayout` (thanks [@kjkta](https://github.com/kjkta))

- [1.5.11]
  + Typescript Definition

- [1.5.1]
  + Allow scroll without animate, ref: [scrollBy(index, animated)](#scrollbyindex-animated)
  + Remove [#254](https://github.com/leecade/react-native-swiper/pull/254) which break the scroll direction in loop mode

- [1.5.0]
  + Improve develop [workflow](#development) for support watch & use real pkg name in examples
  + Update examples for support `React-native 0.33` + `Xcode8` + `ios10` + `iphone7`
  + Switch to [standard](https://github.com/feross/standard) code style
  + Rewrite source code with ES6 syntex
  + Cancel transform the source code when publish
  + Add a [demo](examples/components/LoadMinimal) for `loadMinimal` + `lazyload`
  + Add a [demo](examples/components/PhotoView) for multi-images viewer
  + [#254](https://github.com/leecade/react-native-swiper/pull/254) Fix jitter when quickly swiping back and forth between pages (iOS) (@thanks [@nemophrost](https://github.com/nemophrost)).

- [1.4.11]
  + Adds loadMinimalSize property

- [1.4.10]
  + Adds loadMinimal to api (lazyloading-esque)

- [1.4.9]
  + Adds extra check for title

- [1.4.8]
  + Fixes loop and autoplay bugs in android

- [1.4.7]
  + Don't attempt to mutate this.props
  + Fixes examples links
  + Adds drag end handling to always reset state.isScrolling
  + Fixes float calculation error

- [1.4.6]
  + refactors examples
  + prevents mutation of `this.props`
  + fixes android index loop issue

- [1.4.5]
  + renames `scrollTo()` to `scrollBy()`
  + image index is now always an integer
  + prevents parent state updates from reseting index counter
  + fixes issue with scrolling not working sometimes

- [1.4.4]
  + Support for React Native latest(`^0.26.0`)
  + Updates examples to work with react-native-swiper 1.4.4
  + Examples now run on Android (some are still buggy, needs more work)
  + Removes old examples folder

- [1.4.3]
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
