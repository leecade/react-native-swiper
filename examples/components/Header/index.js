import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import Header from './header';

const { width } = Dimensions.get('window')

const styles = {
  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
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
    backgroundColor: 'transparent'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    width,
    flex: 1
  }
}

const bgImage = require('./images/1.jpg');

export default class extends Component {

  renderHeader() {
    return(
      <Header />
    );
  }

  render () {
    return (
      <Swiper 
        style={styles.wrapper} 
        horizontal={true} 
        renderHeader={this.renderHeader}
        showsBackgroundImage={true}
        backgroundImage={bgImage}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
          <Text style={styles.text}>I have a Header & Background Image</Text>
          
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
