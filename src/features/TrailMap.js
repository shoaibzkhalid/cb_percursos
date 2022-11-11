import React from 'react'
import { Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { Flex } from 'native-base'

import { GC_API_KEY } from 'config/keys'
import { COLORS, Icons } from 'theme'
import { useSelector } from 'react-redux'
import { trailTypes } from 'config/constants'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const ORIGIN_INDEX = 0
// const DESTINATION_INDEX = geometry.coordinates.length - 1

const TrailMap = ({ trail }) => {
  const mapRef = React.useRef()
  const activeTrailType = useSelector((state) => state.app.activeTrailType)

  const { waypoints, properties } = trail
  const { name, color } = properties
  const origin = waypoints[ORIGIN_INDEX]

  const deltas = {
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }

  const DEST_INDEX = parseInt((50 * trail.waypoints.length - 1) / 100)

  const destination = waypoints[DEST_INDEX]

  React.useEffect(() => {
    if (!origin || !destination) return
    setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(['origin', 'destination'])
    }, 1000)
  }, [])

  return (
    <Flex height={'300px'} mb={'110px'}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        // zoomControlEnabled={false}
        // zoomEnabled={false}
        // moveOnMarkerPress={false}
        initialRegion={{
          ...origin,
          ...deltas,
        }}
        showsUserLocation
      >
        <Marker coordinate={origin} identifier={'origin'} description={name} title={'Start'}>
          {trailTypes[activeTrailType].icon}
        </Marker>

        <MapViewDirections
          waypoints={waypoints.slice(0, 3)}
          splitWaypoints={true}
          origin={origin}
          mode={trailTypes[activeTrailType].mapMode}
          precision={'high'}
          destination={destination}
          apikey={GC_API_KEY}
          strokeWidth={5}
          strokeColor={color}
        />

        <Marker
          coordinate={destination}
          identifier={'destination'}
          description={name}
          title={'End'}
        >
          {trailTypes[activeTrailType].icon}
        </Marker>
      </MapView>
    </Flex>
  )
}

export default TrailMap
