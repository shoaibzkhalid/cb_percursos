import React from 'react'
import dayjs from 'dayjs'
import _ from 'lodash'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { FlatList, Flex, Image, Row } from 'native-base'
import { useRoute } from '@react-navigation/native'

import { BackButton, CustomButton, PressableOpacity } from 'components'
import { COLORS, Fonts, Icons } from 'theme'
import { weatherIcons } from 'theme/weatherIcons'

import { useI18n } from 'hooks/useI18n'
import TrailSpecs from 'features/TrailSpecs'
import TrailMap from 'features/TrailMap'
import { trailTypes } from 'config/constants'
import DescModal from 'features/DescModal'
import { openMapLink } from 'utils'

const Trail = ({ navigation: { navigate } }) => {
  const route = useRoute()
  const { t } = useI18n()
  const lang = useSelector((state) => state.app.lang)
  const weatherForecast = useSelector((state) => state.app.weatherForecast)
  const [modelOpen, setModelOpen] = React.useState(false)

  const item = route.params.item
  const { properties, trailType, waypoints } = item
  const { type } = properties
  const isPoly = trailType === 'MultiPolygon'
  const maxEle = `${_.max(item.elevations)}m`
  const trailImage = route.params.trailImage
  const desc = item.description[lang]
  const showExpandIcon = desc.length > 1000
  const { longitude, latitude } = isPoly ? item?.waypoints[0][0] : waypoints[0]
  const origin = `${latitude},${longitude}%2C`

  const Header = () => (
    <>
      <Row alignItems={'center'} p={'10px'} background={COLORS.brand}>
        <BackButton />

        <Flex w={'70%'}>
          <Fonts.Heading color={COLORS.white}>{properties.name}</Fonts.Heading>
        </Flex>
        {/* <Fonts.Heading color={COLORS.white}>{t('TRAIL')}</Fonts.Heading> */}
        <Flex ml={'auto'} mr={'10px'}>
          {trailTypes[type].typeIcon}
        </Flex>
      </Row>
    </>
  )

  const TrailImg = () => (
    <>
      <Image source={trailImage} h={'250px'} alt={'trail'} />
      {/* {item.elevations[0] && (
        <ElevationTextContainer>
          <Flex mx={'10px'}>
            <Icons.Elevation color={COLORS.textAccent} />
          </Flex>
          <Fonts.RegularTextLight color={COLORS.white}>{maxEle}</Fonts.RegularTextLight>
        </ElevationTextContainer>
      )} */}
    </>
  )

  const Content = () => (
    <CustomCard>
      <Flex mb={'20px'}>
        <TrailSpecs item={item} mx={'10px'} />
      </Flex>

      <DescModal isOpen={modelOpen} onClose={() => setModelOpen(!modelOpen)}>
        <Fonts.RegularTextLight color={COLORS.dark80}>{desc}</Fonts.RegularTextLight>
      </DescModal>
      <Row>
        <Flex w={showExpandIcon ? '90%' : '100%'}>
          <Fonts.RegularTextLight color={COLORS.dark80} numberOfLines={10}>
            {desc}
          </Fonts.RegularTextLight>
        </Flex>

        {showExpandIcon && (
          <PressableOpacity onPress={() => setModelOpen(true)} style={{ top: 0 }}>
            <Icons.Expand color={COLORS.textAccent} />
          </PressableOpacity>
        )}
      </Row>
      <Map />
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
        columnWrapperStyle={{ justifyContent: 'space-around' }}
      />
    </CustomCard>
  )

  const Map = () => (
    <Flex my={'20px'}>
      <Flex h={'240px'} overflow={'hidden'} my={'20px'} borderRadius={'15px'}>
        <TrailMap
          trail={item}
          zoomTapEnabled={false}
          zoomControlEnabled={false}
          zoomEnabled={false}
          moveOnMarkerPress={false}
          rotateEnabled={false}
          scrollEnabled={false}
          showsUserLocation={false}
          style={{
            flex: 1,
          }}
          onPress={() => navigate('TrailMapFull')}
        />
      </Flex>

      <CustomButton onPress={() => openMapLink(origin)}>
        <Flex mr={'10px'}>
          <Icons.Directions color={'white'} />
        </Flex>
        <Fonts.RegularText color={'white'}>{t('DIRECTIONS')}</Fonts.RegularText>
      </CustomButton>

      <Row alignItems={'center'} justifyContent={'center'}>
        <Icons.Pin style={{ marginRight: 5 }} color={COLORS.textAccent} />
        <Fonts.SmallText color={COLORS.dark40}>
          {parseFloat(longitude).toFixed(6)}, {parseFloat(latitude).toFixed(6)}
        </Fonts.SmallText>
      </Row>
    </Flex>
  )

  return (
    <FlatList
      // keyExtractor={(item) => item.properties.name}
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

export default Trail
