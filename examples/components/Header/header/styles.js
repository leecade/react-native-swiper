/*
* styles: Header
* author: Charleston Malkemus
* notes:
*   Styles for both the Header and Icons
* 
*/
import { Dimensions, StyleSheet } from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  header: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: height * 0.04,
    zIndex: 90,
  },
  action: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const icons = {
  default: {
    width: 35,
    height: 35,
    overflow: 'visible',
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  logo: {
    width: 60,
    height: 60,
    overflow: 'visible',
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
}