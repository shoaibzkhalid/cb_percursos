import React from 'react'
import { useSelector } from 'react-redux'
import { Flex, Pressable, Row } from 'native-base'
import { Dimensions } from 'react-native'

import ElevationGraph from 'features/ElevationGraph/ElevationGraph'
import TrailMap from 'features/TrailMap'
import { StyleSheet } from 'react-native'
import { BackButton } from 'components'
import { useI18n } from 'hooks/useI18n'
import { COLORS, Fonts } from 'theme'

const height = Dimensions.get('window').height

const TrailMapFull = ({ navigation: { navigate } }) => {
  const { t } = useI18n()
  const activeTrail = useSelector((state) => state.app.activeTrail)

  return (
    <Flex>
      <Row alignItems={'center'} m={'10px'}>
        <BackButton />
        <Fonts.RegularText color={COLORS.white}>
          {activeTrail.properties.trail}
        </Fonts.RegularText>

        <Pressable
          ml={'auto'}
          mr={'15px'}
          onPress={() => {
            navigate('FollowTrail')
          }}
        >
          <Fonts.RegularText color={COLORS.white}>Follow</Fonts.RegularText>
        </Pressable>
      </Row>

      <Flex h={height}>
        <TrailMap trail={activeTrail} showsUserLocation={true} />
      </Flex>
      <Flex style={(StyleSheet.absoluteFill, { bottom: '27%' })}>
        <ElevationGraph trail={activeTrail} />
      </Flex>
    </Flex>
  )
}

export default TrailMapFull
