import React from 'react'
import _ from 'lodash'
import { FlatList, Flex, Row } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'

import { COLORS, Fonts, Icons, images } from 'theme'
import { LoadingAnimation, PressableOpacity } from 'components'
import { trailImages, trailTypes } from 'config/constants'

import { setActiveTrail } from 'store/slices/appSlice'
import { useI18n } from 'hooks/useI18n'
import FilterModal from 'features/FilterModal'
import TrailSpecs from 'features/TrailSpecs'

import Styles from './Trails.styles'
import { Places } from 'enums/places'
import { getDistance } from 'geolib'
import TrailSelection from 'features/TrailSelection'

const ITEM_HEIGHT = 232

const Trails = ({ navigation: { navigate } }) => {
  const { t } = useI18n()
  const dispatch = useDispatch()
  const [modelOpen, setModelOpen] = React.useState(true)

  const trails = useSelector((state) => state.app.trails)
  const trailFilters = useSelector((state) => state.filter.trailFilters)
  const filterLoading = useSelector((state) => state.filter.filterLoading)
  const userLocation = useSelector((state) => state.app.userLocation)

  const places = [
    {
      id: 0,
      place: Places.Gardunha,
      data: trails.filter((t) => t.properties.place == Places.Gardunha),
    },
    {
      id: 1,
      place: Places.Sarzedas,
      data: trails.filter((t) => t.properties.place == Places.Sarzedas),
    },
  ]

  const Item = React.useCallback(({ item, index }) => {
    const { properties } = item
    const origin = item.waypoints[0]
    const { name, color, type, image } = properties

    const distance = Math.abs(getDistance(origin, userLocation) / 1000).toFixed(1)
    const localeDistance = parseFloat(distance).toLocaleString('pt-PT')

    return (
      <Styles.Item
        onPress={() => {
          navigate('Trail', { item, trailImage: trailImages[image] })
          dispatch(setActiveTrail(item))
        }}
      >
        <Styles.TrailContainer>
          <Styles.TrailImg source={trailImages[image]} alt={`image ${name}`} />
          <Styles.TrailLabel color={color}>
            <Flex p={'5px'}>
              <Fonts.RegularText color={COLORS.white}>{name}</Fonts.RegularText>
            </Flex>
          </Styles.TrailLabel>

          <Styles.TrailType color={COLORS.textAccent}>
            {trailTypes[type].typeIcon}
          </Styles.TrailType>

          {isNaN(distance) ? null : (
            <Styles.TrailDist
            // color={COLORS.textAccent}
            >
              <Fonts.SmallText color={COLORS.white}>{localeDistance} km</Fonts.SmallText>
            </Styles.TrailDist>
          )}
        </Styles.TrailContainer>

        <TrailSpecs ml={'10px'} item={item} />

        <Styles.LogoImg alt={'logo'} source={images.logo} />
      </Styles.Item>
    )
  }, [])

  // we set the height of item is fixed
  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })

  const Header = React.useCallback(() => {
    const [modalOpen, setModalOpen] = React.useState(false)
    // const filterActive = Boolean(Object.values(trailFilters).flat().length)

    // const filterIconColor = filterActive ? COLORS.textAccent : COLORS.white

    return (
      <Flex my={'20px'}>
        <Row alignItems={'center'} mx={'10px'}>
          <Fonts.Heading size={32} color={COLORS.white}>
            {t('TRAILS')}
          </Fonts.Heading>

          <PressableOpacity
            onPress={() => {
              setModalOpen(!modalOpen)
            }}
            ml={'auto'}
          >
            <Row alignItems={'center'} mx={'10px'}>
              <Fonts.Heading color={COLORS.white}>{t('FILTER')}</Fonts.Heading>
              <Flex px={'10px'}>
                <Icons.Filter width={15} color={COLORS.white} />
              </Flex>
            </Row>
          </PressableOpacity>
        </Row>

        <FilterModal
          isOpen={modalOpen}
          title={t('FILTER')}
          onClose={() => setModalOpen(!modalOpen)}
        />
      </Flex>
    )
  }, [])

  console.log(filterLoading, places[0].data)

  return (
    <>
      <TrailSelection isOpen={modelOpen} onClose={() => setModelOpen(!modelOpen)} />
      <Header />

      {filterLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <FlatList
            data={places}
            renderItem={({ item }) => (
              <FlatList
                data={item.data}
                getItemLayout={getItemLayout}
                initialNumToRender={8}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                bounces={false}
                renderItem={({ item, index }) => <Item item={item} index={index} />}
                ListHeaderComponent={() => (
                  <>
                    {item.data.length ? (
                      <Flex m={'10px'} mt={'20px'} mb={0}>
                        <Fonts.Heading>{item.place}</Fonts.Heading>
                      </Flex>
                    ) : null}
                  </>
                )}
              />
            )}
            ListEmptyComponent={() => (
              <Flex alignSelf={'center'}>
                <Fonts.RegularText color={COLORS.white}>{t('NO_DATA')}</Fonts.RegularText>
              </Flex>
            )}
            contentContainerStyle={{
              backgroundColor: trails.length ? COLORS.white : COLORS.transparent,
              borderRadius: 20,
            }}
          />
        </>
      )}
    </>
  )
}

export default Trails
