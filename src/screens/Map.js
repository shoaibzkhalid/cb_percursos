import { Dimensions } from 'react-native'
import React from 'react'
import MapView, { Callout, Marker } from 'react-native-maps'

import { deltaCoordinates, trailTypes } from 'config/constants'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { COLORS, Fonts, images } from 'theme'
import { useTrailActions } from 'hooks/useTrailActions'
import { Flex, Image, Row } from 'native-base'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const Map = () => {
  const mapRef = React.useRef()
  const { getTrailSpecs } = useTrailActions()

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
      zoomControlEnabled={true}
      showsUserLocation
      // followsUserLocation
    >
      {trails.map((t, index) => {
        const { trailType, waypoints, properties } = t
        const isPoly = trailType === 'MultiPolygon'
        const specs = getTrailSpecs(t)
        const origin = isPoly ? waypoints[0][0] : waypoints[0]

        console.log('TEST', properties.type)

        return (
          <Fragment key={index}>
            <Marker
              coordinate={origin}
              identifier={'origin'}
              title={String(t.properties.name)}
              image={images[properties.type]}
            >
              <Callout>
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
              </Callout>
            </Marker>
          </Fragment>
        )
      })}
    </MapView>
  )
}

export default Map
