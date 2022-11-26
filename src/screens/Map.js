import React from 'react'
import { Fragment } from 'react'
import { Dimensions } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'

import { useTrails } from 'hooks/useTrails'
import { useTrailActions } from 'hooks/useTrailActions'
import { trailImages, trailTypes } from 'config/constants'
import { useSelector } from 'react-redux'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const Map = ({ navigation: { navigate } }) => {
  const { trails } = useTrails()
  const mapRef = React.useRef()
  const userLocation = useSelector((state) => state.app.userLocation)

  const { getTrailSpecs } = useTrailActions()

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
      zoomControlEnabled={true}
      showsUserLocation
    >
      {trails.map((t, index) => {
        const { trailType, waypoints, properties } = t
        const { image } = properties

        const isPoly = trailType === 'MultiPolygon'
        const specs = getTrailSpecs(t)

        const origin = isPoly ? t?.waypoints[0][0] : waypoints[0]

        return (
          <Fragment key={index}>
            {/* <Marker
              coordinate={userLocation}
              identifier={'origin'}
              // title={String(t.properties.name)}
              // image={images[properties.type]}
            >
              {trailTypes[properties.type].locationIcon}
            </Marker> */}

            <Marker
              coordinate={origin}
              identifier={'origin'}
              title={String(t.properties.name)}
              // image={images[properties.type]}
              onCalloutPress={() => {
                navigate('Trail', { item: t, trailImage: trailImages[image] })
              }}
            >
              {trailTypes[properties.type].iconBig}
              {/* <Callout>
                <Flex>
                  <Fonts.SmallText key={index}>{String(t.properties.name)}</Fonts.SmallText>
                </Flex>

                {specs.map((s, index) => (
                  <Row alignItems={'center'} key={index}>
                    <Fonts.SmallText color={COLORS.dark80}>
                      {s.title}: {s.value}
                    </Fonts.SmallText>
                  </Row>
                ))}
              </Callout> */}
            </Marker>
          </Fragment>
        )
      })}
    </MapView>
  )
}

export default Map
