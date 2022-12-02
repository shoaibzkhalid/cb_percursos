import React from 'react'
import { useSelector } from 'react-redux'
import MapView, { Marker, Polyline } from 'react-native-maps'

import { trailTypes } from 'config/constants'
import { COLORS, Icons } from 'theme'
import { PressableOpacity } from 'components'

const TrailMap = (props) => {
  const { trail } = props
  const mapRef = React.useRef()
  const userLocation = useSelector((state) => state.app.userLocation)
  const [isReady, setIsReady] = React.useState(false)

  const { waypoints, properties, trailType } = trail
  const { name, color } = properties
  const isPoly = trailType === 'MultiPolygon'
  const origin = isPoly ? trail?.waypoints[0][0] : waypoints[0]
  const [region, setRegion] = React.useState(origin)

  return (
    <>
      <PressableOpacity
        onPress={() => setRegion(userLocation)}
        style={{
          position: 'absolute',
          top: 20,
          right: 15,
          zIndex: 100000,
        }}
      >
        <Icons.Gps color={COLORS.dark80} />
      </PressableOpacity>
      <MapView
        ref={mapRef}
        initialCamera={{
          center: region,
          pitch: 0,
          heading: 0,
          zoom: 14,
        }}
        camera={{
          center: region,
          pitch: 0,
          heading: 0,
          zoom: 14,
        }}
        minZoomLevel={3}
        showsMyLocationButton={false}
        showsUserLocation={false}
        followsUserLocation
        zoomControlEnabled
        showsCompass={false}
        onMapReady={() => setIsReady(true)}
        customMapStyle={{ padding: 40, borderRadius: 40 }}
        {...props}
      >
        {isReady && (
          <>
            {userLocation && (
              <Marker
                tracksViewChanges={false}
                coordinate={userLocation}
                identifier={'userLocation'}
                // description={String(name)}
                // title={'Start'}
              >
                {trailTypes[trail.properties.type].icon}
              </Marker>
            )}

            <Marker
              coordinate={origin}
              identifier={'origin'}
              description={String(name)}
              title={'Start'}
            >
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
          </>
        )}
      </MapView>
    </>
  )
}

export default TrailMap
