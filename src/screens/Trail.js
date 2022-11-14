import React from 'react'

import { FlatList, Flex, Image, Row, ScrollView } from 'native-base'
import { BackButton } from 'components'
import { COLORS, Fonts } from 'theme'

import { useI18n } from 'hooks/useI18n'
import { useRoute } from '@react-navigation/native'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import TrailSpecs from 'features/TrailSpecs'
import TrailMap from 'features/TrailMap'
import dayjs from 'dayjs'

const Trail = ({ navigation: { navigate } }) => {
  const lang = useSelector((state) => state.app.lang)
  const weatherForecast = useSelector((state) => state.app.weatherForecast)
  // console.log('weatherForecast', weatherForecast)

  const { t } = useI18n()
  const route = useRoute()
  const item = route.params.item

  const { properties } = item

  const trailImage = route.params.trailImage
  const desc = item.description[lang]

  const Header = () => (
    <Row alignItems={'center'} m={'10px'}>
      <BackButton />
      <Fonts.RegularText color={COLORS.white}>{t('TRAIL')}</Fonts.RegularText>
    </Row>
  )

  const Content = () => (
    <>
      <Image source={trailImage} h={'250px'} alt={'trail'} />
      <CustomCard style={{ padding: 20 }}>
        <Flex mb={'20px'}>
          <TrailSpecs properties={properties} />
        </Flex>
        <Fonts.RegularTextLight color={COLORS.dark80}>{desc}</Fonts.RegularTextLight>
      </CustomCard>
    </>
  )

  const Forecast = () => (
    <CustomCard style={{ marginBottom: '20%' }}>
      <Flex>
        <Flex m={'10px'}>
          <Fonts.RegularTextLight color={COLORS.dark80}>
            Todays Forecast
          </Fonts.RegularTextLight>
        </Flex>

        <FlatList
          data={weatherForecast.slice(0, 4)}
          numColumns={4}
          renderItem={({ item }) => {
            const { weather, main } = item
            // console.log('f', item.dt_txt)

            return (
              <WeatherRow>
                <Flex alignItems={'center'}>
                  <Fonts.SmallHeadingLight color={COLORS.dark80}>
                    {dayjs(item.dt_txt).format('hh:mm')}
                  </Fonts.SmallHeadingLight>

                  <Image
                    alt={'temp'}
                    style={{ width: 40, height: 40 }}
                    source={{
                      uri: `https://openweathermap.org/img/w/${weather[0].icon}.png`,
                    }}
                  />

                  <Flex>
                    <Fonts.SmallHeadingLight color={COLORS.dark80}>
                      {Math.floor(main?.temp)}°C
                    </Fonts.SmallHeadingLight>
                  </Flex>
                </Flex>
              </WeatherRow>
            )
          }}
        />
      </Flex>
    </CustomCard>
  )

  const Map = () => (
    <Flex h={'240px'}>
      <TrailMap
        trail={item}
        zoomTapEnabled={false}
        zoomControlEnabled={false}
        zoomEnabled={false}
        moveOnMarkerPress={false}
        rotateEnabled={false}
        scrollEnabled={false}
        showsUserLocation={false}
        onPress={() => {
          navigate('TrailMapFull')
        }}
      />
    </Flex>
  )

  return (
    <FlatList
      // keyExtractor={(item) => item.properties.trail}

      initialNumToRender={2}
      showsVerticalScrollIndicator={false}
      data={[
        { id: 0, comp: <Header /> },
        { id: 1, comp: <Content /> },
        { id: 2, comp: <Map /> },
        { id: 3, comp: <Forecast /> },
      ]}
      renderItem={({ item }) => item.comp}
    />
  )
}

const CustomCard = styled(Flex)`
  background-color: ${COLORS.white};
  border-radius: 20px;
  min-width: 200px;

  margin: 10px 10px;
  /* padding: 20px; */
`

const WeatherRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
  margin: 0 18px;
`

export default Trail
