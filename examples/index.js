/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import Basic from './components/Basic'; // Only update index when scrollEnd
import DisableButton from './components/DisableButton';
import Loop from './components/Loop';
import Dynamic from './components/Dynamic/';
import LoadMinimal from './components/LoadMinimal/';
import Phone from './components/Phone/';
// import PhotoView from './components/PhotoView/'; // not working
import Swiper from './components/Swiper/'; // working but no title displayed, direction vertical not work well on android
import SwiperNumber from './components/SwiperNumber/'; // working but no title displayed
AppRegistry.registerComponent(appName, () => LoadMinimal);
