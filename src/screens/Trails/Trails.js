import React from 'react'
import { FlatList, Flex, Row } from 'native-base'
import { capitalize } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { COLORS, Fonts, Icons, images } from 'theme'
import { getDifficulty } from 'utils'
import { PressableOpacity } from 'components'
import FilterModal from 'features/FilterModal'
import { filters } from 'config/constants'
import { useTrails } from 'hooks/useTrails'
import { setFilter } from 'store/slices/filterSlice'

import Styles from './Trails.styles'
import { useI18n } from 'hooks/useI18n'

const Trails = ({ navigation: { navigate } }) => {
  const { t } = useI18n()
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

    const { distance, trail, duration, color } = properties
    const hours = Math.abs((duration / 60).toFixed(1))

    const specs = [
      {
        id: 0,
        icon: <Icons.Compass color={COLORS.textAccent} />,
        value: `${(distance / 1000).toLocaleString('pt-PT')} km`,
      },
      {
        id: 1,
        icon: <Icons.Hourglass color={COLORS.textAccent} />,
        value: `${hours.toLocaleString('pt-PT')} hr`,
      },
      {
        id: 2,
        icon: <Icons.Balance color={COLORS.textAccent} />,
        value: `${t(getDifficulty(distance))}`,
      },
    ]

    return (
      <Styles.Item onPress={() => navigate('Trail')}>
        <Styles.TrailContainer>
          <Styles.TrailImg source={trailImages[index]} alt={`image ${trail}`} />

          <Styles.TrailLabel color={color}>
            <Flex p={'5px'}>
              <Fonts.RegularText color={COLORS.white}>{trail}</Fonts.RegularText>
            </Flex>
          </Styles.TrailLabel>
        </Styles.TrailContainer>

        <Row mt={'10px'}>
          {specs.map(({ icon, value, id }) => (
            <Row key={id} alignItems={'center'} mx={'10px'}>
              <Flex mx={'5px'}>
                <Fonts.RegularText>{value}</Fonts.RegularText>
              </Flex>
              {icon}
            </Row>
          ))}
        </Row>

        <Styles.LogoImg alt={'logo'} source={images.logo} />
      </Styles.Item>
    )
  }, [])

  return (
    <>
      <FlatList
        keyExtractor={(item) => item.properties.trail}
        initialNumToRender={3}
        ListHeaderComponent={() => {
          const filterIconColor = filtersApplied ? COLORS.textAccent : COLORS.black
          return (
            <Flex m={'10px'}>
              <Row alignItems={'center'}>
                <Fonts.BigHeading color={COLORS.textAccent}>{t('TRAILS')}</Fonts.BigHeading>

                <PressableOpacity
                  onPress={() => {
                    setModalOpen(!modalOpen)
                  }}
                  ml={'auto'}
                >
                  <Row alignItems={'center'} mx={'10px'}>
                    <Fonts.RegularText color={filterIconColor}>
                      {t('FILTER')}
                    </Fonts.RegularText>
                    <Flex px={'10px'}>
                      <Icons.Filter width={15} color={filterIconColor} />
                    </Flex>
                  </Row>
                </PressableOpacity>
              </Row>
            </Flex>
          )
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={trails}
        renderItem={({ item, index }) => <Item item={item} index={index} />}
        // renderItem={({ item, index }) => <></>}
      />
      <Filter />
    </>
  )
}

export default Trails
