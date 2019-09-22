/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import Basic from './components/Basic'; // Only update index when scrollEnd
import Dynamic from './components/Dynamic/';
import LoadMinimal from './components/LoadMinimal/'; // not working
import Phone from './components/Phone/'; // not working
// import PhotoView from './components/PhotoView/'; // not working
import Swiper from './components/Swiper/'; // working but no title displayed, direction not work well
import SwiperNumber from './components/SwiperNumber/'; // working but no title displayed
AppRegistry.registerComponent(appName, () => LoadMinimal);
