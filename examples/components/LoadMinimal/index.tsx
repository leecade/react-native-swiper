import React, { useState, useCallback } from 'react'
import { Text, View, Image, Dimensions, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { Model } from 'react-model'
const { width } = Dimensions.get('window')
const loading = require('./img/loading.gif')

const styles = StyleSheet.create({
  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width,
    flex: 1,
    backgroundColor: 'transparent'
  },

  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)'
  },

  loadingImage: {
    width: 60,
    height: 60
  }
})

interface SlideState {
  imgList: string[]
  loadQueue: number[]
}

interface SlideActions {
  loaded: number
}

const SlideSchema: ModelType<SlideState, SlideActions> = {
  state: {
    imgList: [
      'https://www.mordeo.org/files/uploads/2016/10/Cute-Angry-Birds-Mobile-Wallpaper.jpg',
      'http://www.glittergraphics.org/img/74/743564/cute-wallpapers-for-mobile.jpg',
      'https://wallpapercave.com/wp/wp2807409.jpg',
      'https://preppywallpapers.com/wp-content/uploads/2018/08/Gorgeous-iPhone-Wallpaper-Collection-11.jpg'
    ],
    loadQueue: [0, 0, 0, 0]
  },
  actions: {
    loaded: index => {
      return state => {
        state.loadQueue[index] = 1
      }
    }
  }
}

const Slide = props => {
  return (
    <View style={styles.slide}>
      <Image
        onLoad={() => {
          props.loadHandle(props.i)
        }}
        style={styles.image}
        source={{ uri: props.uri }}
      />
      {!props.loaded && (
        <View style={styles.loadingView}>
          <Image style={styles.loadingImage} source={loading} />
        </View>
      )}
    </View>
  )
}

const Page = () => {
  const [{ useStore }] = useState(() => Model(SlideSchema))
  const [state, actions] = useStore()
  const loadHandle = useCallback((i: number) => {
    actions.loaded(i)
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Swiper
        loadMinimal
        loadMinimalSize={1}
        // index={0}
        style={styles.wrapper}
        loop={true}
      >
        {state.imgList.map((item, i) => (
          <Slide
            loadHandle={loadHandle}
            uri={item}
            i={i}
            key={i}
            loaded={state.loadQueue[i]}
          />
        ))}
      </Swiper>
      <View>
        <Text>Current Loaded Images: {state.loadQueue}</Text>
      </View>
    </View>
  )
}

export default Page
