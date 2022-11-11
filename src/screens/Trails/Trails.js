import React from 'react'
import PagerView from 'react-native-pager-view'
import { FlatList, Flex, Row } from 'native-base'
import { capitalize } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { COLORS, Fonts, Icons, images } from 'theme'
import { PressableOpacity } from 'components'
import FilterModal from 'features/FilterModal'
import { filters, trailTypes } from 'config/constants'
import { useTrails } from 'hooks/useTrails'
import { setFilter } from 'store/slices/filterSlice'

import Styles from './Trails.styles'
import { useI18n } from 'hooks/useI18n'
import TrailSpecs from 'features/TrailSpecs'
import { setActiveTrailType } from 'store/slices/appSlice'

const Trails = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch()
  const pagerView = React.useRef()
  const { t } = useI18n()
  const [activeTab, setActiveTab] = React.useState(0)
  const trailTypesKeys = Object.keys(trailTypes)

  const { trails, trailImages } = useTrails()
  const [modalOpen, setModalOpen] = React.useState(false)
  const filtersApplied = useSelector((state) => state.filter.filtersApplied)

  const Filter = React.useCallback(() => {
    const dispatch = useDispatch()
    const trailFilters = useSelector((state) => state.filter.trailFilters)

    return (
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
    )
  }, [modalOpen])

  const Item = React.useCallback(({ item, index }) => {
    const { properties } = item

    const { trail, color } = properties

    return (
      <Styles.Item onPress={() => navigate('Trail', { item, trailImage: trailImages[index] })}>
        <Styles.TrailContainer>
          <Styles.TrailImg source={trailImages[index]} alt={`image ${trail}`} />

          <Styles.TrailLabel color={color}>
            <Flex p={'5px'}>
              <Fonts.RegularText color={COLORS.white}>{trail}</Fonts.RegularText>
            </Flex>
          </Styles.TrailLabel>
        </Styles.TrailContainer>

        <TrailSpecs properties={properties} />

        <Styles.LogoImg alt={'logo'} source={images.logo} />
      </Styles.Item>
    )
  }, [])

  const Header = React.useCallback(() => {
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

        <Row alignItems={'center'} justifyContent={'space-around'} mt={'10px'}>
          {trailTypesArr.map(({ iconLight }, index) => {
            const isActive = activeTab === index

            return (
              <PressableOpacity
                key={index}
                onPress={() => {
                  dispatch(setActiveTrailType(trailTypesKeys[index]))
                  pagerView.current.setPage(index)
                }}
                style={{
                  borderBottomWidth: isActive ? 3 : 0,
                  borderColor: COLORS.white,
                  height: 50,
                }}
              >
                <Flex p={'12px'}>{iconLight}</Flex>
              </PressableOpacity>
            )
          })}
        </Row>
      </Flex>
    )
  }, [activeTab])

  const trailTypesArr = [trailTypes['bike'], trailTypes['walk']]

  return (
    <>
      <Header />

      <PagerView
        ref={pagerView}
        initialPage={0}
        onPageSelected={({ nativeEvent: { position } }) => {
          setActiveTab(position)

          console.log('trailTypesKeys[position]', trailTypesKeys[position])
          dispatch(setActiveTrailType(trailTypesKeys[position]))
        }}
        style={{ flex: 1 }}
      >
        {trailTypesArr.map((trail, index) => (
          <FlatList
            key={index}
            contentContainerStyle={{
              backgroundColor: COLORS.screenBg,
            }}
            keyExtractor={(item) => item.properties.trail}
            initialNumToRender={3}
            showsVerticalScrollIndicator={false}
            bounces={false}
            data={trails}
            renderItem={({ item, index }) => <Item item={item} index={index} />}
          />
        ))}
      </PagerView>

      <Filter />
    </>
  )
}

export default Trails
