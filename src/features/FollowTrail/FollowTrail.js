import React from 'react'
import { Dimensions } from 'react-native'
import { Flex } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { getDistance } from 'geolib'

import { BackButton, HeaderWrapper } from 'components'
import { Icons } from 'theme'
import { openMapLink } from 'utils'
import { trailTypes } from 'config/constants'
import RouteInfoBox from './RouteInfoBox'
import { setRoutePlaying } from 'store/slices/appSlice'
import { useLocation } from 'hooks/useLocation'

import { Compass, AlertModal } from 'features'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const FollowTrail = () => {
  const mapRef = React.useRef()
  const dispatch = useDispatch()
  const { userLocation, getLocation } = useLocation()

  const routePlaying = useSelector((state) => state.app.routePlaying)
  const trail = useSelector((state) => state.trail.activeTrail)

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

  const isHigherThanOneKM = getDistance(origin, userLocation) / 1000 > 1
  const [showAlert, setShowAlert] = React.useState(isHigherThanOneKM)
  const camera = {
    center: origin,
    pitch: 0,
    heading: 0,
    zoom: 13,
  }

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

    if (!userLocation || !origin) return
    setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(['userLocation', 'userLocation'])
    }, 1000)
  }, [routePlaying, currentIndex, userLocation])

  const MapDirections = React.useCallback(() => {
    return (
      <>
        {userLocation && (
          <Marker
            tracksViewChanges={false}
            coordinate={userLocation}
            identifier={'userLocation'}
            title={'Start'}
          >
            {trailTypes[type].userLoc}
          </Marker>
        )}
      </>
    )
  }, [currentIndex, userLocation])

  const isMax = height > 900

  const backTop = isMax ? '60px' : '50px'

  return (
    <HeaderWrapper>
      <AlertModal
        onPress={() => openMapLink(originForMap)}
        isOpen={showAlert}
        onClose={() => setShowAlert(!showAlert)}
      />

      <Flex ml={'auto'} mr={'55px'}>
        <Compass />
      </Flex>

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        camera={camera}
        showsUserLocation={false}
        followsUserLocation
        showsCompass={false}
      >
        <Marker
          tracksViewChanges={false}
          coordinate={origin}
          identifier={'origin'}
          title={'Start'}
        >
          {trailTypes[type].start}
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
          tracksViewChanges={false}
          coordinate={destination}
          identifier={'destination'}
          title={'End'}
        >
          <Icons.Finish />
        </Marker>
      </MapView>

      <Flex
        position={'absolute'}
        top={Platform.OS === 'ios' ? backTop : '0px'}
        left={'10px'}
        backgroundColor={'transparent'}
      >
        <BackButton />
      </Flex>
      <RouteInfoBox currentLocation={userLocation} />
    </HeaderWrapper>
  )
}

export default FollowTrail
