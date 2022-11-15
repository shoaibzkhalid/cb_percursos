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
import { weatherIcons } from 'theme/weatherIcons'

const Trail = ({ navigation: { navigate } }) => {
  const lang = useSelector((state) => state.app.lang)
  const weatherForecast = useSelector((state) => state.app.weatherForecast)

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
          <TrailSpecs item={item} />
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
            {t('WEATHER_FORECAST')}
          </Fonts.RegularTextLight>
        </Flex>

        <FlatList
          data={weatherForecast}
          numColumns={4}
          renderItem={({ item }) => {
            const { weather, main } = item
            const weatherIcon = weather ? weatherIcons[`_${weather[0].icon}`] : null

            return (
              <WeatherRow>
                <Flex alignItems={'center'}>
                  <Fonts.SmallHeadingLight color={COLORS.dark80}>
                    {dayjs(item.dt_txt).format('ddd')}
                  </Fonts.SmallHeadingLight>

                  <Flex py={'10px'}>{weatherIcon(COLORS.dark80)}</Flex>

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
    <Flex
      h={'240px'}
      backgroundColor={COLORS.white}
      mx={'10px'}
      // px={'10px'}
      borderRadius={'15px'}
    >
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
        style={{
          borderRadius: 15,
          flex: 1,
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
`

const WeatherRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
  margin: 0 18px;
`

export default Trail
