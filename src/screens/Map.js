import { Dimensions } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { getDistance } from 'geolib'

import { Flex, Icon, Image } from 'native-base'
import { PressableOpacity } from 'components'
import { COLORS, Icons, images } from 'theme'

import { GC_API_KEY } from 'config/keys'
import { deltaCoordinates, trailTypes } from 'config/constants'
import { useTrails } from 'hooks/useTrails'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const ORIGIN_INDEX = 0
const DESTINATION_INDEX = 333
// const DESTINATION_INDEX = geometry.coordinates.length - 1

const Map = () => {
  const mapRef = React.useRef()
  const activeTrailType = useSelector((state) => state.app.activeTrailType)
  const { trails } = useTrails()

  const { waypoints, properties } = trails[0]
  const origin = waypoints[ORIGIN_INDEX]

  const destination = waypoints[DESTINATION_INDEX]

  // React.useEffect(() => {
  //   if (!origin || !destination) return
  //   setTimeout(() => {
  //     mapRef.current.fitToSuppliedMarkers(['origin', 'destination'])
  //   }, 1000)
  // }, [])

  return (
    <Flex height={'730px'}>
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
        showsUserLocation
      >
        {trails.map((t, index) => {
          const DEST_INDEX = parseInt((50 * t.waypoints.length - 1) / 100)

          const origin = t.waypoints[ORIGIN_INDEX]
          const destination = t.waypoints[DEST_INDEX]

          if (index === 5) {
            // console.log(test)
            // console.log('test', t.waypoints[ORIGIN_INDEX], t.waypoints[DEST_INDEX])
          }

          if (index !== 5) {
            // console.log('test', t.waypoints[ORIGIN_INDEX], t.waypoints[DEST_INDEX])
            // return
          }

          return (
            <Fragment key={index}>
              <Marker
                coordinate={origin}
                identifier={'origin'}
                // description={name}
                title={String(t.properties.trail)}
              >
                {/* {trailTypes[activeTrailType].icon} */}
                <Icons.BikePin color={COLORS.black} width={25} height={25} />
              </Marker>

              {/* <MapViewDirections
                key={index}
                // waypoints={t.waypoints.slice(0, 20)}
                // splitWaypoints={true}
                mode={'BICYCLING'}
                // precision={'high'}
                origin={origin}
                destination={destination}
                apikey={GC_API_KEY}
                strokeWidth={5}
                strokeColor={t.properties.color}
              /> */}

              {/* <Marker
                coordinate={destination}
                identifier={'origin'}
                // description={name}
                title={String(t.properties.trail)}
              >
                <Image alt={'end'} source={images.end} style={{ height: 35, width: 35 }} />
              </Marker> */}
            </Fragment>
          )
        })}
      </MapView>
    </Flex>
  )
}

export default Map
