import {useState} from 'react'
import {Text, View} from 'react-native'
import Swiper from 'react-native-swiper'

export default function SpaceBetween({
  horizontal = true,
  loop = false,
}: {
  horizontal?: boolean
  loop?: boolean
}) {
  const [index, setIndex] = useState(0)
  return (
    <View style={{alignItems: 'center', paddingTop: 60}}>
      <Text>
        Ordinary Swiper · {horizontal ? 'horizontal' : 'vertical'} · loop{' '}
        {String(loop)}
      </Text>
      <Text>Visible page {index + 1} / 3</Text>
      <Swiper
        width={300}
        height={240}
        containerStyle={{flex: 0}}
        horizontal={horizontal}
        loop={loop}
        spaceBetween={10}
        onIndexChanged={setIndex}
      >
        {['#245fa4', '#197578', '#8153a0'].map((color, page) => (
          <View
            key={color}
            style={{
              flex: 1,
              backgroundColor: color,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{color: '#fff', fontSize: 54}}>Page {page + 1}</Text>
          </View>
        ))}
      </Swiper>
    </View>
  )
}
