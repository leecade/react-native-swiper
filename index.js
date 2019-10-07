import Swiper from './src/'
/**
 * Resolve ES6 and CommonJS compatibility issues
 * 1. CommonJS code
 *    const Swiper = require('react-native-swiper');
 * 2. ES6 code
 *    import Swiper from 'react-native-swiper';
 */
module.exports = Swiper;
module.exports.default = Swiper;
