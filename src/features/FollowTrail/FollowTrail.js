import React from 'react'
import { Dimensions } from 'react-native'
import { Flex } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import MapView, { Marker, Polyline } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

import { Icons } from 'theme'
import { trailTypes } from 'config/constants'
import { GC_API_KEY } from 'config/keys'
import RouteInfoBox from './RouteInfoBox'
import { BackButton } from 'components'
import { setRoutePlaying } from 'store/slices/appSlice'
import { useLocation } from 'hooks/useLocation'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const FollowTrail = () => {
  const mapRef = React.useRef()
  const dispatch = useDispatch()
  const { userLocation, getLocation } = useLocation()

  const routePlaying = useSelector((state) => state.app.routePlaying)
  const trail = useSelector((state) => state.app.activeTrail)

  const [routeDetails, setRouteDetails] = React.useState({ distance: 0, duration: 0 })

  const { waypoints, properties, trailType } = trail
  const { type } = properties
  const { name, color } = properties
  const isPoly = trailType === 'MultiPolygon'

  const origin = isPoly ? waypoints[0][0] : waypoints[0]

  const deltas = {
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }

  const destination = isPoly
    ? waypoints[0][trail.waypoints[0].length - 1]
    : waypoints[trail.waypoints.length - 1]

  const [currentIndex, setCurrentIndex] = React.useState(0)
  // const currentLocation = waypoints[currentIndex]
  const currentLocation = currentLocation
    ? {
        longitude: userLocation?.longitude,
        latitude: userLocation?.latitude,
      }
    : null

  React.useEffect(() => {
    return () => {
      dispatch(setRoutePlaying(false))
    }
  }, [])

  React.useEffect(() => {
    if (!routePlaying) return
    setTimeout(() => {
      // setCurrentIndex(currentIndex + 1)
      getLocation()
    }, 10000)
  }, [routePlaying, currentIndex, userLocation])

  console.log('currentLocation', currentLocation)

  const MapDirections = React.useCallback(() => {
    return (
      <>
        {currentLocation && (
          <>
            {' '}
            <MapViewDirections
              // mode={trailTypes[].mapMode}
              mode={'BICYCLING'}
              origin={origin}
              destination={currentLocation}
              precision={'high'}
              apikey={GC_API_KEY}
              strokeWidth={5}
              strokeColor={'transparent'}
              resetOnChange={false}
              onReady={(result) => {
                // console.log('result', result)
                setRouteDetails(result)

                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20,
                  },
                })
              }}
              onError={(error) => {
                console.log('error', error)
              }}
            />
            <Marker
              coordinate={currentLocation}
              identifier={'currentLocation'}
              description={name}
              title={'Start'}
            >
              {trailTypes[type].icon}
            </Marker>
          </>
        )}
      </>
    )
  }, [currentIndex, userLocation])

  return (
    <>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          ...origin,
          latitudeDelta: 0.02,
          longitudeDelta: 0.01,
        }}
        // showsUserLocation
        // followsUserLocation
      >
        <Marker coordinate={origin} identifier={'origin'} description={name} title={'Start'}>
          {trailTypes[type].icon}
        </Marker>

        <MapDirections />

        {isPoly ? (
          <>
            {waypoints.map((w, index) => (
              <Polyline key={index} coordinates={w} strokeWidth={5} strokeColor={'red'} />
            ))}
          </>
        ) : (
          <Polyline coordinates={waypoints} strokeWidth={5} strokeColor={color} />
        )}

        <Marker
          coordinate={destination}
          identifier={'destination'}
          description={name}
          title={'End'}
        >
          <Icons.Finish />
        </Marker>
      </MapView>

      <Flex position={'absolute'} left={'20px'} backgroundColor={'transparent'}>
        <BackButton />
      </Flex>
      <RouteInfoBox routeDetails={routeDetails} altitude={userLocation?.altitude || 0} />
    </>
  )
}

export default FollowTrail
