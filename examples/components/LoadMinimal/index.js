import React, {Component} from 'react';
import {Text, View, Image, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
const {width} = Dimensions.get('window');
const loading = require('./img/loading.gif');

const styles = {
  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width,
    flex: 1,
    backgroundColor: 'transparent',
  },

  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
  },

  loadingImage: {
    width: 60,
    height: 60,
  },
};

const Slide = props => {
  return (
    <View style={styles.slide}>
      <Image
        onLoad={props.loadHandle.bind(null, props.i)}
        style={styles.image}
        source={{uri: props.uri}}
      />
      {!props.loaded && (
        <View style={styles.loadingView}>
          <Image style={styles.loadingImage} source={loading} />
        </View>
      )}
    </View>
  );
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [
        'https://www.mordeo.org/files/uploads/2016/10/Cute-Angry-Birds-Mobile-Wallpaper.jpg',
        'http://www.glittergraphics.org/img/74/743564/cute-wallpapers-for-mobile.jpg',
        'https://wallpapercave.com/wp/wp2807409.jpg',
        'https://preppywallpapers.com/wp-content/uploads/2018/08/Gorgeous-iPhone-Wallpaper-Collection-11.jpg',
      ],
      loadQueue: [0, 0, 0, 0],
    };
    this.loadHandle = this.loadHandle.bind(this);
  }
  loadHandle(i) {
    let loadQueue = this.state.loadQueue;
    loadQueue[i] = 1;
    this.setState({
      loadQueue,
    });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Swiper
          loadMinimal
          loadMinimalSize={1}
          style={styles.wrapper}
          loop={false}>
          {this.state.imgList.map((item, i) => (
            <Slide
              loadHandle={this.loadHandle}
              loaded={!!this.state.loadQueue[i]}
              uri={item}
              i={i}
              key={i}
            />
          ))}
        </Swiper>
        <View>
          <Text>Current Loaded Images: {this.state.loadQueue}</Text>
        </View>
      </View>
    );
  }
}
