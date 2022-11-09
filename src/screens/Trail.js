import { Dimensions, Platform, StyleSheet, View } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

import { Flex, Row } from 'native-base'
import { BackButton, PressableOpacity } from 'components'
import { COLORS, Fonts, Icons } from 'theme'

import { GC_API_KEY } from 'config/keys'
import { useSelector } from 'react-redux'
import { deltaCoordinates } from 'config/constants'
import { useTrails } from 'hooks/useTrails'
import { useI18n } from 'hooks/useI18n'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const ORIGIN_INDEX = 0
const DESTINATION_INDEX = 333
// const DESTINATION_INDEX = geometry.coordinates.length - 1

const Trail = () => {
  const { t } = useI18n()

  const mapRef = React.useRef()
  const userLocation = useSelector((state) => state.app.userLocation)

  const { trails } = useTrails()

  const { waypoints, properties } = trails[0]
  const { name, stroke } = properties
  const origin = waypoints[ORIGIN_INDEX]

  const [region, setRegion] = React.useState(origin)
  const destination = waypoints[DESTINATION_INDEX]

  React.useEffect(() => {
    if (!origin || !destination) return
    setTimeout(() => {
      // mapRef.current.fitToSuppliedMarkers(['origin', 'destination'])
    }, 1000)
  }, [])

  return (
    <View>
      <Row alignItems={'center'} m={'10px'}>
        <BackButton />
        <Fonts.RegularText>{t('TRAILS')}</Fonts.RegularText>
      </Row>
      {/* <Row alignItems={'center'} m={'10px'}>
        <BackButton />
        <Fonts.RegularText>{t}</Fonts.RegularText>
      </Row>

      <Flex height={'700px'}>
        {Platform.OS !== 'android' && (
          <PressableOpacity
            style={[
              StyleSheet.absoluteFill,
              {
                zIndex: 100000000,
                left: width - 40,
                top: 10,
              },
            ]}
            onPress={() => setRegion(userLocation)}
          >
            <Icons.Location color={COLORS.primaryBtn} />
          </PressableOpacity>
        )}

        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            ...region,
            ...deltaCoordinates,
          }}
          region={{
            ...region,
            ...deltaCoordinates,
          }}
          showsUserLocation
        >
          <Marker
            coordinate={origin}
            identifier={'origin'}
            description={name}
            title={'Start'}
          />

          <Marker
            coordinate={waypoints[3]}
            identifier={'origin'}
            description={name}
            title={'Start'}
          />
          <MapViewDirections
            waypoints={waypoints.slice(0, 3)}
            splitWaypoints={true}
            origin={origin}
            mode={'BICYCLING'}
            precision={'high'}
            destination={destination}
            apikey={GC_API_KEY}
            strokeWidth={5}
            strokeColor={stroke}
          />

          <Marker
            coordinate={destination}
            identifier={'destination'}
            description={name}
            title={'End'}
          />
        </MapView>
      </Flex> */}
    </View>
  )
}

export default Trail
