import React from 'react'
import { FlatList, Flex, Row } from 'native-base'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { COLORS, Fonts, Icons, images } from 'theme'
import { LoadingAnimation, PressableOpacity } from 'components'
import { trailImages, trailTypes } from 'config/constants'

import { setActiveTrail } from 'store/slices/appSlice'
import { useI18n } from 'hooks/useI18n'
import FilterModal from 'features/FilterModal'
import TrailSpecs from 'features/TrailSpecs'

import Styles from './Trails.styles'
const ITEM_HEIGHT = 232

const Trails = ({ navigation: { navigate } }) => {
  const { t } = useI18n()
  const dispatch = useDispatch()
  const trails = useSelector((state) => state.app.trails)
  const trailFilters = useSelector((state) => state.filter.trailFilters)

  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 100)
  }, [])

  const Item = React.useCallback(({ item, index }) => {
    const { properties } = item
    const { trail, color, type } = properties

    return (
      <Styles.Item
        onPress={() => {
          navigate('Trail', { item, trailImage: trailImages[index] })
          dispatch(setActiveTrail(item))
        }}
      >
        <Styles.TrailContainer>
          <Styles.TrailImg source={trailImages[index]} alt={`image ${trail}`} />

          <Styles.TrailLabel color={color}>
            <Flex p={'5px'}>
              <Fonts.RegularText color={COLORS.white}>{trail}</Fonts.RegularText>
            </Flex>
          </Styles.TrailLabel>

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
    const filterActive = Boolean(Object.values(trailFilters).flat().length)

    const filterIconColor = filterActive ? COLORS.textAccent : COLORS.white

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
              <Fonts.Heading color={filterIconColor}>{t('FILTER')}</Fonts.Heading>
              <Flex px={'10px'}>
                <Icons.Filter width={15} color={filterIconColor} />
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
      <Header />
      {loading ? (
        <LoadingAnimation />
      ) : (
        <FlatList
          refreshing={loading}
          data={trails}
          getItemLayout={getItemLayout}
          ListEmptyComponent={() => (
            <Flex alignSelf={'center'}>
              <Fonts.RegularText color={COLORS.white}>{t('NO_DATA')}</Fonts.RegularText>
            </Flex>
          )}
          initialNumToRender={3}
          contentContainerStyle={{
            backgroundColor: trails.length ? COLORS.white : COLORS.transparent,
            borderRadius: 20,
          }}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={({ item, index }) => <Item item={item} index={index} />}
        />
      )}
    </>
  )
}

export default Trails
