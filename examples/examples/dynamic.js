var React = require('react')
var ReactNative = require('react-native')
var Swiper = require('./')
var {
  StyleSheet,
  Text,
  View,
} = ReactNative

var styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

var swiper = React.createClass({
  getInitialState: function() {
    return {
      items: []
    };
  },
  componentDidMount: function() {
    this.setState({
      items: [ { title: 'Hello Swiper', css: styles.slide1 }, { title: 'Beautiful', css: styles.slide2 },
        { title: 'And simple', css: styles.slide3 } ]
    });
  },
  render: function() {
    return(
      <Swiper showsButtons={true}>
        {this.state.items.map((item, key) => {
          return (
            <View key={key} style={item.css}>
              <Text style={styles.text}>{item.title}</Text>
            </View>
          );
        })}
      </Swiper>
    );
  }
})

module.exports = swiper

