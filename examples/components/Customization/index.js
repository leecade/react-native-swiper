import React from 'react'
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Swiper from 'react-native-swiper'

const Dimensions = require('Dimensions')
const window = Dimensions.get('window')

const justification = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}
const justification2 = {
  flex: 1,
  alignItems: 'center'
}
const styles = {
  wrapper: {
    backgroundColor: 'transparent'
  },
  innerSwiper: {
    width: window.width,
    height: window.height / 3,
    marginTop: 60,
    backgroundColor: '#92BBD9'
  },
  slide1: {
    ...justification,
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    ...justification,
    backgroundColor: '#97CAE5'
  },
  slide3: {
    ...justification,
    backgroundColor: '#92BBD9'
  },
  slide4: {
    ...justification2,
    backgroundColor: '#D6EB9D'
  },
  slide5: {
    ...justification,
    backgroundColor: '#CAE597'
  },
  slide6: {
    ...justification,
    backgroundColor: '#BBD992'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  pagination_x: {
    position: 'absolute',
    top: 45, // changed from the default.
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },

  pagination_y: {
    position: 'absolute',
    left: 15, // changed from default.
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },

  buttonWrapper_x: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  buttonWrapper_y: {
    backgroundColor: 'transparent',
    flexDirection: 'column-reverse',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  horizontalButtonText: {
    fontSize: 50,
    color: '#007aff'
  },
  verticalButtonText: {
    fontSize: 50,
    color: '#007aff'
    // transform: [ {rotate: '90deg'} ]
  }
}
const renderNextButton = (index, total, context) => {
  let button = null

  if (context.props.loop ||
    index !== total - 1) {
    if (context.props.horizontal) {
      button = context.props.nextButton || <Text style={styles.horizontalButtonText}>right</Text>
    } else {
      button = context.props.nextButton || <Text style={styles.verticalButtonText}>bottom</Text>
    }
  }

  return (
    <TouchableOpacity
      onPress={() => button !== null && context.scrollBy(1)}
      disabled={context.props.disableNextButton}
    >
      <View>
        {button}
      </View>
    </TouchableOpacity>
  )
}

const renderPrevButton = (index, total, context) => {
  let button = null

  if (context.props.loop || this.state.index !== 0) {
    if (context.props.horizontal) {
      button = context.props.prevButton || <Text style={styles.horizontalButtonText}>left</Text>
    } else {
      button = context.props.prevButton || <Text style={styles.verticalButtonText}>top</Text>
    }
  }

  return (
    <TouchableOpacity onPress={() => button !== null && context.scrollBy(-1)}>
      <View>
        {button}
      </View>
    </TouchableOpacity>
  )
}
const renderButtons2 = (index, total, context) => {
  if (context.props.horizontal) {
    return (
      <View pointerEvents='box-none' style={[styles.buttonWrapper_x, {
        width: context.state.width,
        height: context.state.height
      }, context.props.buttonWrapperStyle]}>
        {renderPrevButton(index, total, context)}
        {renderNextButton(index, total, context)}
      </View>
    )
  } else {
    return (
      <View pointerEvents='box-none' style={[styles.buttonWrapper_y, {
        width: context.state.width,
        height: context.state.height
      }, context.props.buttonWrapperStyle]}>
        {renderNextButton(index, total, context)}
        {renderPrevButton(index, total, context)}
      </View>
    )
  }
}
const renderPagination2 = (index, total, context) => {
  // By default, dots only show when `total` >= 2
  if (context.state.total <= 1) return null

  let dots = []
  const ActiveDot = context.props.activeDot || <View style={[{
    backgroundColor: context.props.activeDotColor || '#007aff',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  }, context.props.activeDotStyle]} />
  const Dot = context.props.dot || <View style={[{
    backgroundColor: context.props.dotColor || 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  }, context.props.dotStyle]} />
  for (let i = 0; i < context.state.total; i++) {
    dots.push(i === context.state.index
      ? React.cloneElement(ActiveDot, {key: i})
      : React.cloneElement(Dot, {key: i})
    )
  }

  return (
    <View pointerEvents='none' style={[styles['pagination_' + context.state.dir], context.props.paginationStyle]}>
      {dots}
    </View>
  )
}
export default () =>
  <Swiper style={styles.wrapper} showsButtons horizontal={false} showsPagination renderPagination={renderPagination2}
    renderButtons={renderButtons2}>

    <View style={styles.slide4}>
      <View style={styles.innerSwiper}>
        <Swiper style={styles.wrapper} showsButtons showsPagination renderPagination={renderPagination2}
          renderButtons={renderButtons2}>

          <View style={styles.slide1}>
            <Text style={styles.text}>Horiz Panel 1</Text>
          </View>

          <View style={styles.slide2}>
            <Text style={styles.text}>Horiz Panel 2</Text>
          </View>

          <View style={styles.slide3}>
            <Text style={styles.text}>Horiz Panel 3</Text>
          </View>

        </Swiper>
      </View>
      <Text style={styles.text}>Vertical Panel 1</Text>
    </View>
    <View style={styles.slide5}>
      <Text style={styles.text}>Vertical Panel 2</Text>
    </View>
    <View style={styles.slide6}>
      <Text style={styles.text}>Vertical Panel 3</Text>
    </View>
  </Swiper>
