import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

import { Flex, Row } from 'native-base'
import { BackButton, PressableOpacity } from 'components'
import { COLORS, Fonts, Icons } from 'theme'
import { useLocation } from 'hooks/useLocation'

import { getTrails } from 'store/trails'
import { GC_API_KEY } from 'config/keys'
import { capitalize } from 'lodash'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

// const kml = require('../assets/kml/21.kml')
const ORIGIN_INDEX = 0
const DESTINATION_INDEX = 333
// const DESTINATION_INDEX = geometry.coordinates.length - 1

const Dashboard = () => {
  const mapRef = React.useRef()

  const { userLocation, deltaCoordinates } = useLocation()
  const trails = getTrails()

  const { waypoints, properties } = trails[0]
  const { name, stroke } = properties

  const origin = waypoints[ORIGIN_INDEX]

  const [region, setRegion] = React.useState(origin)
  const destination = waypoints[DESTINATION_INDEX]
  // console.log('destination')

  React.useEffect(() => {
    if (!origin || !destination) return
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'])
    return () => {}
  }, [])

  return (
    <View>
      <Row alignItems={'center'} m={'10px'}>
        <BackButton />
        <Fonts.RegularText>Maps</Fonts.RegularText>
      </Row>

      <Flex background={'red.100'} height={'700px'}>
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
      </Flex>
    </View>
  )
}

export default Dashboard
