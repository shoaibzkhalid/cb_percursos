import { Dimensions } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'

import { deltaCoordinates, trailTypes } from 'config/constants'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const Map = () => {
  const mapRef = React.useRef()
  const trails = useSelector((state) => state.app.trails)

  const { waypoints } = trails[0]
  const origin = waypoints[0]

  return (
    <MapView
      cam
      ref={mapRef}
      style={{ flex: 1 }}
      initialCamera={{
        center: origin,
        pitch: 0,
        heading: 0.5,
        zoom: 9,
      }}
      camera={{
        center: origin,
        pitch: 0,
        heading: 0.5,
        zoom: 10,
      }}
      showsCompass={true}
      showsUserLocation
      followsUserLocation
      userLocationUpdateInterval={1000}
    >
      {trails.map((t, index) => {
        const { trailType, waypoints, properties } = t
        const isPoly = trailType === 'MultiPolygon'

        const origin = isPoly ? waypoints[0][0] : waypoints[0]

        return (
          <Fragment key={index}>
            <Marker
              coordinate={origin}
              identifier={'origin'}
              title={String(t.properties.trail)}
            >
              {trailTypes[properties.type].icon}
            </Marker>
          </Fragment>
        )
      })}
    </MapView>
  )
}

export default Map
