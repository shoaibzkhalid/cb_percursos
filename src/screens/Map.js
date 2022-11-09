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

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const ORIGIN_INDEX = 0
const DESTINATION_INDEX = 333
// const DESTINATION_INDEX = geometry.coordinates.length - 1

const Map = () => {
  const mapRef = React.useRef()
  const userLocation = useSelector((state) => state.app.userLocation)

  const { trails } = useTrails()

  const { waypoints, properties } = trails[0]
  const origin = waypoints[ORIGIN_INDEX]

  const [region, setRegion] = React.useState(origin)
  const destination = waypoints[DESTINATION_INDEX]

  // React.useEffect(() => {
  //   if (!origin || !destination) return
  //   setTimeout(() => {
  //     mapRef.current.fitToSuppliedMarkers(['origin', 'destination'])
  //   }, 1000)
  // }, [])

  // console.log('test', trails[0].properties.color)

  return (
    <Flex height={'730px'}>
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
        {trails.map((t, index) => {
          const DEST_INDEX = t.waypoints.length - 1
          console.log('TEST', t.properties)

          return (
            <MapViewDirections
              key={index}
              // waypoints={t.waypoints}
              // splitWaypoints={true}
              mode={'WALKING'}
              precision={'high'}
              origin={t.waypoints[ORIGIN_INDEX]}
              destination={t.waypoints[333]}
              apikey={GC_API_KEY}
              strokeWidth={5}
              strokeColor={t.properties.color}
            />
          )
        })}
      </MapView>
    </Flex>
  )
}

export default Map
