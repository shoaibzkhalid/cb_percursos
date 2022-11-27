import React from 'react'
import _ from 'lodash'
import { LineChart } from 'react-native-chart-kit'
import { Animated, Dimensions, Pressable } from 'react-native'
import { Flex, Row } from 'native-base'

import { COLORS, Fonts, Icons } from 'theme'
import { getXLabels } from './utils'

const { height } = Dimensions.get('window')

const ElevationGraph = ({ trail }) => {
  const distance = trail.properties.distance
  const xLabels = getXLabels(Math.floor(distance / 1000))
  const [isOpen, setIsOpen] = React.useState(true)

  const animatedValue = React.useRef(new Animated.Value(0)).current

  const animateView = () => {
    setIsOpen(!isOpen)
    Animated.timing(animatedValue, {
      toValue: isOpen ? 190 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Flex
      style={[
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
      ]}
    >
      <Animated.View
        style={{
          height: height / 2.12,
          transform: [
            {
              translateY: animatedValue,
            },
          ],
        }}
      >
        <Pressable
          style={{
            paddingTop: 10,
            backgroundColor: COLORS.white,
            borderRadius: 25,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
          android_ripple={{
            color: COLORS.secondaryBtn,
            borderless: false,
          }}
          onPress={() => animateView()}
          w={'100%'}
        >
          <Row
            px={'10px'}
            py={'20px'}
            // top={'-10px'}
            background={COLORS.transparent}
            w={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Flex>
              <Row alignItems={'center'}>
                <Flex mr={'10px'}>
                  <Icons.Elevation color={COLORS.textAccent} />
                </Flex>
                <Fonts.RegularTextLightest color={COLORS.dark80}>
                  {_.max(trail.elevations)}m
                </Fonts.RegularTextLightest>

                <Row ml={'10px'}>
                  <Flex mr={'10px'}>
                    <Icons.ElevationDown color={COLORS.textAccent} />
                  </Flex>
                  <Fonts.RegularTextLightest color={COLORS.dark80}>
                    {/* {t('MIN')} {t('ELEVATION')}: */}
                    {_.min(trail.elevations)}m
                  </Fonts.RegularTextLightest>
                </Row>
              </Row>

              <Row alignItems={'center'}></Row>
            </Flex>

            <Animated.View
              style={{
                transform: [{ rotate: !isOpen ? '180deg' : '0deg' }],
                marginRight: 20,
              }}
            >
              <Icons.Chevron width={20} height={20} />
            </Animated.View>
          </Row>
        </Pressable>
        {/* END OF TOP ROW */}
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
          height={165}
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
          style={{
            paddingBottom: 15,
            backgroundColor: COLORS.white,
          }}
        />
      </Animated.View>
    </Flex>
  )
}

export default ElevationGraph
