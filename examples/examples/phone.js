var React = require('react')
var ReactNative = require('react-native')
var Swiper = require('./')
var {
  StyleSheet,
  Text,
  View,
  Image,
} = ReactNative

var styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: '#f00',
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
  }
})

var swiper = React.createClass({
  render: function() {
    return (
      <View>
        <Image source={{uri: 'http://i.imgur.com/rVekwfn.jpg'}}>
          <Swiper style={styles.wrapper}
            dot={<View style={{backgroundColor:'rgba(255,255,255,.3)', width: 13, height: 13,borderRadius: 7, marginLeft: 7, marginRight: 7,}} />}
            activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
            paginationStyle={{
              bottom: 70,
            }}
            loop={false}>
            <View style={styles.slide}>
              <Image style={styles.image} source={{uri: 'http://i.imgur.com/u3kXqo7.png'}} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.image} source={{uri: 'http://i.imgur.com/3Z4nQyb.png'}} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.image} source={{uri: 'http://i.imgur.com/5Wa3Iyb.png'}} />
            </View>
          </Swiper>
        </Image>
      </View>
    )
  }
})

module.exports = swiper
