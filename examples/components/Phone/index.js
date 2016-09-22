import React, { Component } from 'react'
import {
  View,
  Image,
  StatusBar,
  Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
const { width, height } = Dimensions.get('window')

const styles = {
  wrapper: {
    // backgroundColor: '#f00'
  },

  slide: {
    flex: 1,
    backgroundColor: 'transparent'
  },

  image: {
    width,
    height,
    flex: 1
  }
}

export default class extends Component {
  render () {
    return (
      <View>
        <StatusBar barStyle='light-content' />
        <Image source={require('./img/bg.jpg')}>
          <Swiper style={styles.wrapper}
            dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
            activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
            paginationStyle={{
              bottom: 70
            }}
            loop={false}>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('./img/1.jpg')} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('./img/2.jpg')} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('./img/3.jpg')} />
            </View>
          </Swiper>
        </Image>
      </View>
    )
  }
}
