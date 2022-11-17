import React from 'react'
import { useSelector } from 'react-redux'
import { Flex, Row } from 'native-base'
import { Dimensions, StyleSheet } from 'react-native'

import ElevationGraph from 'features/ElevationGraph/ElevationGraph'
import TrailMap from 'features/TrailMap'
import { BackButton, PressableOpacity } from 'components'
import { COLORS, Fonts, Icons } from 'theme'
import { useI18n } from 'hooks/useI18n'

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

        <PressableOpacity
          ml={'auto'}
          mr={'15px'}
          onPress={() => {
            navigate('FollowTrail')
          }}
          hitSlop={50}
        >
          <Row alignItems={'center'}>
            <Fonts.RegularTextLight color={COLORS.white}>{t('START')}</Fonts.RegularTextLight>
            <Icons.Start color={COLORS.white} width={20} style={{ marginLeft: 5 }} />
          </Row>
        </PressableOpacity>
      </Row>

      <Flex h={height}>
        <TrailMap trail={activeTrail} showsUserLocation={true} />
      </Flex>
      <Flex style={(StyleSheet.absoluteFill, { bottom: '28%' })}>
        <ElevationGraph trail={activeTrail} />
      </Flex>
    </Flex>
  )
}

export default TrailMapFull
