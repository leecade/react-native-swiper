/*
* component: Header for Swiper
* author: Charleston Malkemus
* notes:
*   This is the main heder for 
*   for a swiper
* 
*/


import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
} from 'react-native';

import styles, {icons} from './styles';

const Header = () => {

  return (
    <View 
      // APPLICATION HEADER
      style={styles.header}>

      <View style={styles.action}>
        <TouchableOpacity 
          // Back Button
          >
         <Image 
            source={require('../images/back.png')} 
            style={icons.default} />
        </TouchableOpacity>
      </View>

      <View style={[styles.action, {flex:5}]}>
        <TouchableOpacity 
          // Logo or Home Button
         >
         <Image 
            // source={} 
            style={icons.logo} />
        </TouchableOpacity>
      </View>

      <View style={styles.action}>
        <TouchableOpacity 
          // Next Button
          >
         <Image 
            source={require('../images/next.png')} 
            style={icons.default} />
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Header;

