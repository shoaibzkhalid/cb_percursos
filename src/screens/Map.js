import React from 'react'
import { Fragment } from 'react'
import { Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { useTrails } from 'hooks/useTrails'
import { trailImages, trailTypes } from 'config/constants'
import Compass from 'features/Compass'

const Map = ({ navigation: { navigate } }) => {
  const { trails } = useTrails()
  const mapRef = React.useRef()

  const { waypoints } = trails[0]
  const origin = waypoints[0]

  return (
    <>
      <Compass />
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
        showsCompass={false}
        zoomControlEnabled={true}
        showsUserLocation
      >
        {trails.map((t) => {
          const { trailType, waypoints, properties } = t
          const { image, type, name } = properties

          const isPoly = trailType === 'MultiPolygon'
          const origin = isPoly ? t?.waypoints[0][0] : waypoints[0]

          return (
            <Fragment key={name}>
              <Marker
                tracksViewChanges={false}
                coordinate={origin}
                identifier={'origin'}
                title={String(name)}
                onCalloutPress={() => {
                  navigate('Trail', { item: t, trailImage: trailImages[image] })
                }}
              >
                {trailTypes[type].iconBig}
              </Marker>
            </Fragment>
          )
        })}
      </MapView>
    </>
  )
}

export default Map
