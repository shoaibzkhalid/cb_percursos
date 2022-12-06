import React from 'react'
import { useSelector } from 'react-redux'
import { Flex, Row } from 'native-base'
import { Dimensions } from 'react-native'

import { TrailMap, ElevationGraph } from 'features'
import { BackButton, PressableOpacity } from 'components'
import { useLocation, useI18n } from 'hooks'
import { COLORS, Fonts, Icons } from 'theme'
import { showErrorToast } from 'utils/toast'

const height = Dimensions.get('window').height

const TrailMapFull = ({ navigation: { navigate } }) => {
  const { t } = useI18n()
  const { getLocation } = useLocation()

  const userLocation = useSelector((state) => state.app.userLocation)
  const activeTrail = useSelector((state) => state.trail.activeTrail)

  const { trailType } = activeTrail
  const isPoly = trailType === 'MultiPolygon'

  return (
    <Flex>
      <Row alignItems={'center'} m={'10px'}>
        <BackButton />

        <Flex w={'50%'}>
          <Fonts.Heading color={COLORS.white}>{activeTrail.properties.name}</Fonts.Heading>
        </Flex>

        <PressableOpacity
          ml={'auto'}
          mr={'15px'}
          onPress={() => {
            if (!userLocation) return showErrorToast(t('LOC_FEATURE_MSG'))
            getLocation()
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
        <TrailMap
          trail={activeTrail}
          showsUserLocation={true}
          style={{
            height: isPoly ? height - 100 : height - 140,
          }}
        />
      </Flex>

      {!isPoly && <ElevationGraph trail={activeTrail} />}
    </Flex>
  )
}

export default TrailMapFull
