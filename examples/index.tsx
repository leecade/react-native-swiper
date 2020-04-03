/**
 * @format
 */
import React from 'react'
import {
  AppRegistry,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { name as appName } from './app.json'

import AutoPlay from './components/AutoPlay'
import Basic from './components/Basic' // Only update index when scrollEnd
import DisableButton from './components/DisableButton'
import Loop from './components/Loop'
import Dynamic from './components/Dynamic'
import LoadMinimal from './components/LoadMinimal' // flicker existing when shift from last to first on Android (or last to first)
import NestSwiper from './components/NestSwiper'
import Phone from './components/Phone'
// import PhotoView from './components/PhotoView/'; // not working
import Swiper from './components/Swiper' // working but no title displayed, direction vertical not work well on android
import SwiperNumber from './components/SwiperNumber' // working but no title displayed
import { createAppContainer } from 'react-navigation'

const DATA = [
  {
    name: 'AutoPlay'
  },
  {
    name: 'Basic'
  },
  {
    name: 'DisableButton'
  },
  {
    name: 'Dynamic'
  },
  {
    name: 'Loop'
  },
  {
    name: 'LoadMinimal'
  },
  {
    name: 'NestSwiper'
  },
  {
    name: 'Phone'
  },
  {
    name: 'Swiper'
  },
  {
    name: 'SwiperNumber'
  }
]

function Item({ title, navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(title)}>
      <View testID={title} style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item navigation={navigation} title={item.name}></Item>
        )}
        keyExtractor={item => item.name}
      />
    </SafeAreaView>
  )
}

const AppNavigator = createStackNavigator(
  {
    Home,
    AutoPlay,
    Basic,
    DisableButton,
    Loop,
    Dynamic,
    LoadMinimal,
    NestSwiper,
    Phone,
    Swiper,
    SwiperNumber
  },
  {
    initialRouteName: 'Home'
  }
)

const App = createAppContainer(AppNavigator)

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ede',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 24
  }
})

AppRegistry.registerComponent(appName, () => App)
