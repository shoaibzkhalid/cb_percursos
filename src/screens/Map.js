import { Dimensions } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'

import { COLORS, Icons } from 'theme'

import { deltaCoordinates } from 'config/constants'
import { useTrails } from 'hooks/useTrails'
import { Fragment } from 'react'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const Map = () => {
  const mapRef = React.useRef()
  const { trails } = useTrails()
  const { waypoints } = trails[0]
  const origin = waypoints[0]

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      initialRegion={{
        ...origin,
        ...deltaCoordinates,
      }}
      region={{
        ...origin,
        ...deltaCoordinates,
      }}
      showsCompass={true}
      showsUserLocation
      followsUserLocation
      userLocationUpdateInterval={1000}
    >
      {trails.map((t, index) => {
        const origin = t.waypoints[0]

        return (
          <Fragment key={index}>
            <Marker
              coordinate={origin}
              identifier={'origin'}
              title={String(t.properties.trail)}
            >
              {/* {trailTypes[activeTrailType].icon} */}
              <Icons.BikePin color={COLORS.black} width={25} height={25} />
            </Marker>
          </Fragment>
        )
      })}
    </MapView>
  )
}

export default Map
