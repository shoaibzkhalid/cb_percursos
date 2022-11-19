import React from 'react'
import { Dimensions } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'

import { trailTypes } from 'config/constants'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const TrailMap = (props) => {
  const { trail } = props
  const mapRef = React.useRef()

  const { waypoints, properties, trailType } = trail
  const { name, color } = properties
  const isPoly = trailType === 'MultiPolygon'

  const origin = isPoly ? waypoints[0][0] : waypoints[0]

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
      zoomControlEnabled
      customMapStyle={{ padding: 40, borderRadius: 40 }}
      {...props}
    >
      <Marker coordinate={origin} identifier={'origin'} description={name} title={'Start'}>
        {trailTypes[trail.properties.type].icon}
      </Marker>

      {isPoly ? (
        <>
          {waypoints.map((w, index) => (
            <Polyline key={index} coordinates={w} strokeWidth={5} strokeColor={'red'} />
          ))}
        </>
      ) : (
        <Polyline coordinates={waypoints} strokeWidth={5} strokeColor={color} />
      )}
    </MapView>
  )
}

export default TrailMap
