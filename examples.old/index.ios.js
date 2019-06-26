'use strict'

var React = require('react-native')
var {
  AppRegistry,
} = React

var swiper = require('./examples/basic')
// var swiper = require('./examples/swiper')
// var swiper = require('./examples/swiper_number')
// var swiper = require('./examples/phone')
// var swiper = require('./examples/dynamic')

AppRegistry.registerComponent('swiper', () => swiper)
