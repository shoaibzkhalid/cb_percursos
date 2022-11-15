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

const TrailMap = (props) => {
  const { trail } = props
  const mapRef = React.useRef()
  const activeTrailType = useSelector((state) => state.app.activeTrailType)

  const { waypoints, properties } = trail
  const { name, color } = properties
  const origin = waypoints[ORIGIN_INDEX]

  const deltas = {
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }

  return (
    <MapView
      ref={mapRef}
      initialRegion={{
        ...origin,
        ...deltas,
      }}
      minZoomLevel={3}
      showsUserLocation
      followsUserLocation
      style={{
        flex: 1,
      }}
      {...props}
      customMapStyle={{ padding: 40, borderRadius: 40 }}
    >
      <Marker coordinate={origin} identifier={'origin'} description={name} title={'Start'}>
        {trailTypes[activeTrailType].icon}
      </Marker>

      <Polyline coordinates={waypoints} strokeWidth={5} strokeColor={color} />

      {/* <Marker
        coordinate={destination}
        identifier={'destination'}
        description={name}
        title={'End'}
      >
        {trailTypes[activeTrailType].icon}
      </Marker> */}
    </MapView>
  )
}

export default TrailMap
