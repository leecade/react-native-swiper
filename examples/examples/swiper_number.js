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
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
  }
})

var renderPagination = function (index, total, context) {
  return (
    <View style={{
      position: 'absolute',
      bottom: -25,
      right: 10,
    }}>
      <Text><Text style={{
        color: '#007aff',
        fontSize: 20,
      }}>{index + 1}</Text>/{total}</Text>
    </View>
  )
}

var swiper = React.createClass({
  render: function() {
    return (
      <View>
        <Swiper style={styles.wrapper} height={240}
          renderPagination={renderPagination}
          paginationStyle={{
            bottom: -23, left: null, right: 10,
          }} loop={false}>
          <View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
            <Image style={styles.image} source={{uri: 'http://c.hiphotos.baidu.com/image/w%3D310/sign=0dff10a81c30e924cfa49a307c096e66/7acb0a46f21fbe096194ceb468600c338644ad43.jpg'}} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
            <Image style={styles.image} source={{uri: 'http://a.hiphotos.baidu.com/image/w%3D310/sign=4459912736a85edffa8cf822795509d8/bba1cd11728b4710417a05bbc1cec3fdfc032374.jpg'}} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
            <Image style={styles.image} source={{uri: 'http://e.hiphotos.baidu.com/image/w%3D310/sign=9a8b4d497ed98d1076d40a30113eb807/0823dd54564e9258655f5d5b9e82d158ccbf4e18.jpg'}} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
            <Image style={styles.image} source={{uri: 'http://e.hiphotos.baidu.com/image/w%3D310/sign=2da0245f79ec54e741ec1c1f89399bfd/9d82d158ccbf6c818c958589be3eb13533fa4034.jpg'}} />
          </View>
        </Swiper>
      </View>
    )
  }
})

module.exports = swiper

