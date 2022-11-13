import React from 'react'
import _ from 'lodash'
import { LineChart } from 'react-native-chart-kit'
import { Animated, Dimensions, Pressable } from 'react-native'
import { Flex, Row } from 'native-base'

import { COLORS, Fonts, Icons } from 'theme'
import { getXLabels } from './utils'

const ElevationGraph = ({ trail }) => {
  const distance = trail.properties.distance
  const xLabels = getXLabels(Math.floor(distance / 1000))
  const [isOpen, setIsOpen] = React.useState(false)

  const animatedValue = React.useRef(new Animated.Value(115)).current

  const animateView = () => {
    setIsOpen(!isOpen)
    Animated.timing(animatedValue, {
      toValue: isOpen ? 115 : -110,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Flex>
      <Animated.View
        style={{
          transform: [
            {
              translateY: animatedValue,
            },
          ],
        }}
      >
        <Pressable
          onPress={() => {
            animateView()
          }}
          w={'100%'}
        >
          <Row
            px={'10px'}
            py={'20px'}
            background={COLORS.white}
            w={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Flex>
              <Fonts.RegularTextLightest color={COLORS.brand}>
                Min Elevation: {_.min(trail.elevations)}m
              </Fonts.RegularTextLightest>
              <Fonts.RegularTextLightest color={COLORS.brand}>
                Max Elevation: {_.max(trail.elevations)}m
              </Fonts.RegularTextLightest>
            </Flex>

            <Animated.View
              style={{
                transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
                marginRight: 20,
              }}
            >
              <Icons.Chevron width={20} height={20} />
            </Animated.View>
          </Row>
        </Pressable>
        <LineChart
          data={{
            labels: xLabels,
            datasets: [
              {
                data: trail.elevations,
              },
            ],
          }}
          withVerticalLines={false}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisSuffix="m"
          xAxisLabel=" km"
          withDots={false}
          yAxisInterval={1000}
          // fromZero
          // yAxisInterval={null} // optional, defaults to 1
          chartConfig={{
            // backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: COLORS.white,
            fillShadowGradientOpacity: 0.4,
            backgroundGradientToOpacity: 0.3,

            fillShadowGradientFromOpacity: 0.5,
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => COLORS.textAccent,
            labelColor: (opacity = 1) => `${COLORS.brand}`,
          }}
          bezier
        />
      </Animated.View>
    </Flex>
  )
}

export default ElevationGraph
