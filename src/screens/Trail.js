import React from 'react'
import dayjs from 'dayjs'
import _ from 'lodash'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { FlatList, Flex, Image, Row } from 'native-base'
import { useRoute } from '@react-navigation/native'

import { BackButton } from 'components'
import { COLORS, Fonts, Icons } from 'theme'
import { weatherIcons } from 'theme/weatherIcons'

import { useI18n } from 'hooks/useI18n'
import TrailSpecs from 'features/TrailSpecs'
import TrailMap from 'features/TrailMap'
import { trailTypes } from 'config/constants'

const Trail = ({ navigation: { navigate } }) => {
  const lang = useSelector((state) => state.app.lang)
  const weatherForecast = useSelector((state) => state.app.weatherForecast)

  const { t } = useI18n()
  const route = useRoute()
  const item = route.params.item

  const { properties } = item
  const { type } = properties

  const maxEle = `${_.max(item.elevations)}m`

  const trailImage = route.params.trailImage
  const desc = item.description[lang]

  const Header = () => (
    <>
      <Row alignItems={'center'} p={'10px'} background={COLORS.brand}>
        <BackButton />
        <Fonts.RegularText color={COLORS.white}>{t('TRAIL')}</Fonts.RegularText>
        <Flex ml={'auto'} mr={'10px'}>
          {trailTypes[type].typeIcon}
        </Flex>
      </Row>
    </>
  )

  const TrailImg = () => (
    <>
      <Image source={trailImage} h={'250px'} alt={'trail'} />
      <ElevationTextContainer>
        <Flex mx={'10px'}>
          <Icons.Elevation color={COLORS.textAccent} />
        </Flex>
        <Fonts.RegularTextLight color={COLORS.white}>{maxEle}</Fonts.RegularTextLight>
      </ElevationTextContainer>
    </>
  )

  const Content = () => (
    <CustomCard>
      <Flex mb={'20px'}>
        <TrailSpecs item={item} />
      </Flex>
      <Fonts.RegularTextLight color={COLORS.dark80}>{desc}</Fonts.RegularTextLight>
      <Map />

      <FlatList
        data={weatherForecast}
        ListHeaderComponent={() => (
          <Flex my={'10px'}>
            <Fonts.RegularTextLight color={COLORS.dark80}>
              {t('WEATHER_FORECAST')}
            </Fonts.RegularTextLight>
          </Flex>
        )}
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
        columnWrapperStyle={{ justifyContent: 'space-around' }}
      />
    </CustomCard>
  )

  const Map = () => (
    <Flex
      h={'240px'}
      overflow={'hidden'}
      backgroundColor={COLORS.white}
      my={'20px'}
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
      />
    </Flex>
  )

  return (
    <FlatList
      // keyExtractor={(item) => item.properties.trail}
      initialNumToRender={3}
      showsVerticalScrollIndicator={false}
      data={[
        { id: 0, comp: <Header /> },
        {
          id: 1,
          comp: <TrailImg />,
        },
        {
          id: 2,
          comp: <Content />,
        },
      ]}
      renderItem={({ item }) => item.comp}
    />
  )
}

const CustomCard = styled(Flex)`
  background-color: ${COLORS.white};
  border-radius: 20px;
  min-width: 200px;
  margin: 10px 0px;
  margin-bottom: 0;
  padding: 10px 20px;
  top: -30px;
`

const WeatherRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
`

const ElevationTextContainer = styled(Row)`
  position: absolute;
  top: 10px;
  right: 15px;
  align-items: center;
`

export default Trail
