import {useState} from 'react'
import {Text, View} from 'react-native'
import NestedSwiper from 'react-native-swiper/nested'

/** Mount inside GestureHandlerRootView; requires the optional nested peers. */
export default function CoordinatedNested({
  horizontal = true,
  autoplay = false,
}: {
  horizontal?: boolean
  autoplay?: boolean
}) {
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(5)
  const width = 300
  const height = 240
  return (
    <View style={{alignItems: 'center', paddingTop: 60}}>
      <Text accessibilityRole="header">
        Nested Swiper · {horizontal ? 'horizontal' : 'vertical'}
      </Text>
      <Text testID="nested-visible-page">
        Visible page {page + 1} / {total}
      </Text>
      <NestedSwiper
        width={width}
        height={height}
        horizontal={horizontal}
        spaceBetween={10}
        bounces
        autoplay={autoplay}
        autoplayTimeout={2.5}
        onNestedIndexChanged={(index, count) => {
          setPage(index)
          setTotal(count)
        }}
      >
        {[
          {name: 'A', colors: ['#245fa4', '#197578']},
          {name: 'B', colors: ['#8153a0', '#a14b50', '#956b1f']},
        ].map((group) => (
          <NestedSwiper key={group.name} width={width} height={height}>
            {group.colors.map((color, index) => (
              <View
                key={color}
                style={{
                  flex: 1,
                  backgroundColor: color,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{fontSize: 54, color: '#fff'}}>
                  {group.name}
                  {index + 1}
                </Text>
                <Text style={{color: '#fff'}}>Drag to the next card</Text>
              </View>
            ))}
          </NestedSwiper>
        ))}
      </NestedSwiper>
    </View>
  )
}
