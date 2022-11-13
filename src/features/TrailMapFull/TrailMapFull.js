import React from 'react'
import { useSelector } from 'react-redux'
import { Flex, Row } from 'native-base'
import { Dimensions } from 'react-native'

import ElevationGraph from 'features/ElevationGraph/ElevationGraph'
import TrailMap from 'features/TrailMap'
import { StyleSheet } from 'react-native'
import { BackButton } from 'components'
import { useI18n } from 'hooks/useI18n'
import { COLORS, Fonts } from 'theme'

const height = Dimensions.get('window').height

const TrailMapFull = () => {
  const { t } = useI18n()

  const activeTrail = useSelector((state) => state.app.activeTrail)

  return (
    <Flex>
      <Row alignItems={'center'} m={'10px'}>
        <BackButton />
        <Fonts.RegularText color={COLORS.white}>
          {activeTrail.properties.trail}
        </Fonts.RegularText>
      </Row>

      <Flex h={height}>
        <TrailMap trail={activeTrail} />
      </Flex>
      <Flex style={(StyleSheet.absoluteFill, { bottom: '27%' })}>
        <ElevationGraph trail={activeTrail} />
      </Flex>
    </Flex>
  )
}

export default TrailMapFull
