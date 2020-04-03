import React, { useRef, useState } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'

var styles = StyleSheet.create({
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

export default () => {
  const swiper = useRef(null)
  const [enable, setEnable] = useState(true)
  return (
    <Swiper
      ref={swiper}
      containerStyle={styles.wrapper}
      scrollEnabled={enable}
      index={0}
      showsButtons
    >
      <View style={{ flex: 1, height: Dimensions.get('window').height }}>
        <View style={{ height: 300 }}>
          <Swiper
            index={1}
            onTouchStart={e => {
              setEnable(false)
            }}
            onTouchEnd={e => {
              setEnable(true)
            }}
            onMomentumScrollEnd={e => {
              setEnable(true)
            }}
          >
            <View style={styles.slide1}>
              <Text style={styles.text}>Nested: Hello Swiper</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text}>Nested: Beautiful</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>Nested: And simple</Text>
            </View>
          </Swiper>
        </View>
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
