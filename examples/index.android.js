'use strict'

var ReactNative = require('react-native')
var {
  AppRegistry,
} = ReactNative

var swiper = require('./examples/basic')
// var swiper = require('./examples/swiper')
// var swiper = require('./examples/swiper_number')
// var swiper = require('./examples/phone')
// var swiper = require('./examples/dynamic')

AppRegistry.registerComponent('swiper', () => swiper)
