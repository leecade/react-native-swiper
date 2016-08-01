import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Swiper from '../swiper.dist'

const styles = StyleSheet.create({
  wrapper: {
  },

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

export default class DynamicSample extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    this.setState({
      items: [
        { title: 'Hello Swiper', css: styles.slide1 },
        { title: 'Beautiful', css: styles.slide2 },
        { title: 'And simple', css: styles.slide3 }
      ]
    })
  }

  render() {
    return (
      <Swiper showsButtons={true}>
        {this.state.items.map((item, key) => {
          return (
            <View key={key} style={item.css}>
              <Text style={styles.text}>{item.title}</Text>
            </View>
          )
        })}
      </Swiper>
    )
  }
}
