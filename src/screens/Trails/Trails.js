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
import TrailSelection from 'features/TrailSelection'
import { RefreshControl } from 'react-native'
import { useLocation } from 'hooks/useLocation'

const ITEM_HEIGHT = 232

const Trails = ({ navigation: { navigate } }) => {
  const { t } = useI18n()
  const dispatch = useDispatch()
  const [modelOpen, setModelOpen] = React.useState(true)
  const { getLocation } = useLocation()

  const trails = useSelector((state) => state.app.trails)
  const filterLoading = useSelector((state) => state.filter.filterLoading)

  const Item = React.useCallback(({ item }) => {
    const { properties, distFromUser } = item
    const { name, color, type, image, place } = properties

    const localeDistance = parseFloat(distFromUser).toLocaleString('pt-PT')

    return (
      <Styles.Item
        onPress={() => {
          navigate('Trail', { item })
          dispatch(setActiveTrail(item))
        }}
      >
        <Styles.TrailContainer>
          <Styles.TrailImg source={trailImages[image]} alt={`image ${name}`} />

          <Styles.LabelsContainer>
            {place && (
              <Styles.TrailLabel mt={'auto'} maxW={'100%'} color={COLORS.white} mb={'10px'}>
                <Flex p={'5px'}>
                  <Fonts.MediumPlus color={COLORS.black}>{place}</Fonts.MediumPlus>
                </Flex>
              </Styles.TrailLabel>
            )}
            <Styles.BottomLabels>
              <Styles.TrailLabel mt={`${place ? '5px' : 'auto'}`} color={color}>
                <Flex p={'5px'}>
                  <Fonts.MediumPlus
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    color={COLORS.white}
                  >
                    {name}
                  </Fonts.MediumPlus>
                </Flex>
              </Styles.TrailLabel>

              {isNaN(distFromUser) ? null : (
                <Styles.TrailDist>
                  <Row alignItems={'center'}>
                    <Icons.Gps
                      color={COLORS.primaryBtnLight}
                      width={20}
                      height={20}
                      style={{
                        marginRight: 4,
                      }}
                    />
                    <Fonts.SmallText color={COLORS.white}>{localeDistance} km</Fonts.SmallText>
                  </Row>
                </Styles.TrailDist>
              )}
            </Styles.BottomLabels>
          </Styles.LabelsContainer>

          <Styles.TrailType color={COLORS.textAccent}>
            {trailTypes[type].typeIcon}
          </Styles.TrailType>
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

  return (
    <>
      <TrailSelection isOpen={modelOpen} onClose={() => setModelOpen(!modelOpen)} />
      <Header />

      {filterLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <FlatList
            data={trails}
            getItemLayout={getItemLayout}
            initialNumToRender={8}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            refreshing={filterLoading}
            refreshControl={
              <RefreshControl
                colors={[COLORS.white]}
                refreshing={filterLoading}
                onRefresh={() => {
                  getLocation()
                }}
              />
            }
            renderItem={({ item, index }) => <Item item={item} index={index} />}
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
