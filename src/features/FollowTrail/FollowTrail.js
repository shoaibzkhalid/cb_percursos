import React from 'react'
import { Dimensions } from 'react-native'
import { Flex } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { getDistance } from 'geolib'
import MapViewDirections from 'react-native-maps-directions'

import { Icons } from 'theme'
import { trailTypes } from 'config/constants'
import { GC_API_KEY } from 'config/keys'
import RouteInfoBox from './RouteInfoBox'
import { BackButton } from 'components'
import { setRoutePlaying } from 'store/slices/appSlice'
import { useLocation } from 'hooks/useLocation'
import AlertModal from 'features/AlertModal'
import { openMapLink } from 'utils'

const { width, height } = Dimensions.get('window')

const FollowTrail = () => {
  const mapRef = React.useRef()
  const dispatch = useDispatch()
  const userLocation = useSelector((state) => state.app.userLocation)

  const { getLocation } = useLocation()

  const routePlaying = useSelector((state) => state.app.routePlaying)
  const trail = useSelector((state) => state.app.activeTrail)

  const { waypoints, properties, trailType } = trail
  const { type } = properties
  const { color } = properties
  const isPoly = trailType === 'MultiPolygon'

  const origin = isPoly ? trail?.waypoints[0][0] : waypoints[0]
  const originForMap = `${origin.latitude},${origin.longitude}%2C`

  const destination = isPoly
    ? waypoints[0][trail.waypoints[0].length - 1]
    : waypoints[trail.waypoints.length - 1]

  const [currentIndex, setCurrentIndex] = React.useState(0)

  // const userLocation = waypoints.flat()[0]

  const isHigherThanOneKM = getDistance(origin, userLocation) / 1000 > 1
  const [showAlert, setShowAlert] = React.useState(isHigherThanOneKM)

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

  const MapDirections = React.useCallback(() => {
    return (
      <>
        {userLocation && (
          <Marker coordinate={userLocation} identifier={'userLocation'} title={'Start'}>
            {trailTypes[type].icon}
          </Marker>
        )}
      </>
    )
  }, [currentIndex, userLocation])

  return (
    <>
      <AlertModal
        onPress={() => openMapLink(originForMap)}
        isOpen={showAlert}
        onClose={() => setShowAlert(!showAlert)}
      />
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        camera={{
          center: origin,
          pitch: 0,
          heading: 0.5,
          zoom: 14,
        }}
        showsUserLocation={true}
      >
        <Marker coordinate={origin} identifier={'origin'} title={'Start'}>
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

        <Marker coordinate={destination} identifier={'destination'} title={'End'}>
          <Icons.Finish />
        </Marker>
      </MapView>

      <Flex position={'absolute'} top={'50px'} left={'10px'} backgroundColor={'transparent'}>
        <BackButton />
      </Flex>
      <RouteInfoBox currentLocation={userLocation} />
    </>
  )
}

export default FollowTrail
