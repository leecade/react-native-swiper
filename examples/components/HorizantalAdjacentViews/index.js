import React, { useRef } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Swiper from 'react-native-swiper'

const data = []
for (let i = 1; i <= 10; i++) {
  data.push(i)
}
export default function App() {
  const ref = useRef()
  return (
    <View style={styles.container}>
      <Swiper
        ref={ref}
        showsButtons={true}
        horizontal={true}
        loop={true}
        onIndexChanged={i => {
          console.log('painted ', i)
        }}
        loadMinimal={true}
        loadMinimalSize={3}
        loadMinimalLoader={<Loading />}
        showAdjacentViews={true}
        adjacentViewsWidth={40}
        adjacentViewsPadding={2}
        decelerationRate={0.7}
      >
        {data.map((item, index) => {
          return (
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              key={index}
            >
              <Text style={{ color: 'white', fontSize: 30 }}>{item}</Text>
            </View>
          )
        })}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const Loading = () => (
  <View
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4
    }}
  >
    <ActivityIndicator size="large" color="orange" />
  </View>
)
