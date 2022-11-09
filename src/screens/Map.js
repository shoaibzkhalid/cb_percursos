import React from 'react'
import { Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

import { Flex, Row } from 'native-base'
import { BackButton, PressableOpacity } from 'components'
import { COLORS, Fonts, Icons } from 'theme'

import { GC_API_KEY } from 'config/keys'
import { capitalize } from 'lodash'
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
  const { trails, trailImages } = useTrails()

  const { waypoints, properties } = trails[0]
  const { name, stroke } = properties
  const origin = waypoints[ORIGIN_INDEX]

  const [region, setRegion] = React.useState(origin)
  const destination = waypoints[DESTINATION_INDEX]

  React.useEffect(() => {
    // if (!origin || !destination) return
    // setTimeout(() => {
    //   mapRef.current.fitToSuppliedMarkers(['origin', 'destination'])
    // }, 1000)
  }, [])

  return (
    <Flex height={'700px'}>
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
        {trails.map(({ properties, waypoints }, index) => {
          // console.log(properties.name, index, waypoints[0])
          return (
            <Marker
              key={index}
              coordinate={waypoints[0]}
              identifier={'origin'}
              description={properties.name}
              title={`Trail ${index + 1}`}
            />
          )
        })}
      </MapView>
    </Flex>
  )
}

export default Map
