import React from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import MapView, { Marker } from 'react-native-maps'

import { Compass } from 'features'
import { trailImages, trailTypes } from 'config/constants'

const Map = ({ navigation: { navigate } }) => {
  const trails = useSelector((state) => state.trail.filteredTrails)

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
