import React from 'react'
import { FlatList, Flex, Row } from 'native-base'
import _, { capitalize } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { COLORS, Fonts, Icons, images } from 'theme'
import { LoadingAnimation, PressableOpacity } from 'components'
import { filters, trailImages, trailTypes } from 'config/constants'
import { setFilter } from 'store/slices/filterSlice'

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
  const filtersApplied = useSelector((state) => state.filter.filtersApplied)
  const [loading, setLoading] = React.useState(true)

  const [page, setPage] = React.useState(0)
  const [data, setData] = React.useState(trails.slice(page, 3))

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

          {/* <Styles.ElevationTextContainer>
            <Flex mx={'10px'}>
              <Icons.Elevation color={COLORS.textAccent} />
            </Flex>
            <Fonts.RegularTextLight color={COLORS.white}>
              {_.max(item.elevations)} m
            </Fonts.RegularTextLight>
          </Styles.ElevationTextContainer> */}

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
    const dispatch = useDispatch()
    const trailFilters = useSelector((state) => state.filter.trailFilters)

    const [modalOpen, setModalOpen] = React.useState(false)
    const filterIconColor = filtersApplied ? COLORS.textAccent : COLORS.white

    return (
      <Flex my={'20px'}>
        <Row alignItems={'center'} mx={'10px'}>
          <Fonts.BigHeading color={COLORS.white}>{t('TRAILS')}</Fonts.BigHeading>

          <PressableOpacity
            onPress={() => {
              setModalOpen(!modalOpen)
            }}
            ml={'auto'}
          >
            <Row alignItems={'center'} mx={'10px'}>
              <Fonts.RegularText color={filterIconColor}>{t('FILTER')}</Fonts.RegularText>
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
        >
          {filters.map((filter) => {
            const { icon, id, name, options, unit, title } = filter

            return (
              <Flex key={id} mb={'20px'}>
                <Row alignItems={'center'}>
                  <Flex mr={'10px'}>{icon}</Flex>
                  <Fonts.RegularText>{capitalize(t(title))}</Fonts.RegularText>
                </Row>

                <Row mt={'10px'} justifyContent={'space-between'} flexWrap={'wrap'}>
                  {options.map((option, index) => {
                    const { value } = option
                    const selected = trailFilters[name].filter(({ id }) => id === option.id)[0]
                    const removedItemList = trailFilters[name].filter(
                      ({ id }) => id !== option.id
                    )

                    const selectedColor = selected ? COLORS.textAccent : COLORS.transparent

                    return (
                      <Styles.OptionRow
                        key={index}
                        color={selectedColor}
                        onPress={() => {
                          if (selected) {
                            return dispatch(
                              setFilter({
                                ...trailFilters,
                                [name]: removedItemList,
                              })
                            )
                          }

                          return dispatch(
                            setFilter({
                              ...trailFilters,
                              [name]: [...new Set([...trailFilters[name], option])],
                            })
                          )
                        }}
                      >
                        <Fonts.RegularText
                          style={{ textAlign: 'center' }}
                          color={selected ? COLORS.white : COLORS.textAccent}
                        >
                          {name === 'difficulty' ? t(value) : value} {unit}
                        </Fonts.RegularText>
                      </Styles.OptionRow>
                    )
                  })}
                </Row>
              </Flex>
            )
          })}
        </FilterModal>
      </Flex>
    )
  }, [])

  const loadMoreData = () => {
    if (data.length >= trails.length) return setLoading(false)

    const start = page + 3
    setPage(page + 3)
    setData([...data, ...trails.slice(start, start + 3)])
  }

  return (
    <>
      <Header />
      <FlatList
        data={filtersApplied ? trails : data}
        onEndReachedThreshold={0.2}
        onEndReached={loadMoreData}
        ListFooterComponent={() => {
          if (!loading) return
          return (
            <Flex p={'50px'}>
              <LoadingAnimation />
            </Flex>
          )
        }}
        getItemLayout={getItemLayout}
        initialNumToRender={3}
        contentContainerStyle={{
          backgroundColor: COLORS.screenBg,
        }}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        bounces={false}
        renderItem={({ item, index }) => <Item item={item} index={index} />}
      />
    </>
  )
}

export default Trails
