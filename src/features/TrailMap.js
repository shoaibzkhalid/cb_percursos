import React from 'react'
import { Dimensions } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'

import { useSelector } from 'react-redux'
import { trailTypes } from 'config/constants'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const ORIGIN_INDEX = 0
// const DESTINATION_INDEX = geometry.coordinates.length - 1

const TrailMap = (props) => {
  const { trail, onPress } = props
  const mapRef = React.useRef()
  const activeTrailType = useSelector((state) => state.app.activeTrailType)

  const { waypoints, properties } = trail
  const { name, color } = properties
  const origin = waypoints[ORIGIN_INDEX]

  const deltas = {
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }

  const destination = waypoints[trail.waypoints.length - 1]

  React.useEffect(() => {
    if (!origin || !destination) return
    setTimeout(() => {
      // mapRef.current.fitToSuppliedMarkers(['origin', 'destination'])
    }, 1000)
  }, [])

  return (
    <MapView
      {...props}
      ref={mapRef}
      style={{ flex: 1 }}
      initialRegion={{
        ...origin,
        ...deltas,
      }}
      showsUserLocation
      minZoomLevel={3}
    >
      <Marker coordinate={origin} identifier={'origin'} description={name} title={'Start'}>
        {trailTypes[activeTrailType].icon}
      </Marker>

      <Polyline coordinates={waypoints} strokeWidth={5} strokeColor={color} />

      {/* <MapViewDirections
          // waypoints={waypoints.filter((w, index) => index % 4 === 0)}
          waypoints={waypoints}
          // waypoints={waypoints.length > 2 ? waypoints.slice(1, -1) : undefined}
          splitWaypoints={true}
          origin={origin}
          mode={trailTypes[activeTrailType].mapMode}
          // region={waypoints[CENTER_INDEX]}
          // precision={'high'}
          destination={destination}
          apikey={GC_API_KEY}
          strokeWidth={5}
          strokeColor={color}
        /> */}

      <Marker
        coordinate={destination}
        identifier={'destination'}
        description={name}
        title={'End'}
      >
        {trailTypes[activeTrailType].icon}
      </Marker>
    </MapView>
  )
}

export default TrailMap
