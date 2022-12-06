import React from 'react'
import styled from 'styled-components'
import _, { capitalize } from 'lodash'
import { useDispatch } from 'react-redux'
import { Flex, Modal, Pressable, Row } from 'native-base'

import { COLORS, Fonts, Icons } from 'theme'
import { useI18n } from 'hooks/useI18n'
import { CustomButton, PressableOpacity } from 'components'
import { setApplied } from 'store/slices/filterSlice'

import { filters } from 'config/constants'
import { useFilter } from 'hooks/useFilter'
import { useFilteredTrails } from 'hooks/useTrails'

const FilterModal = ({ title, isOpen, onClose, headingW }) => {
  const dispatch = useDispatch()
  const { t } = useI18n()
  const { lFilters, setFilter, clearFilters } = useFilter()
  useFilteredTrails()

  const FilterOption = React.useCallback(
    ({ filter, option }) => {
      const { name, unit } = filter
      const { value } = option
      let [selectedOption, setSelectedOption] = React.useState(null)

      const selected = lFilters[name].filter((id) => id === option.id)[0]
      const filtered = lFilters[name].filter((id) => id !== option.id)

      if (selected && selectedOption === null) {
        selectedOption = selected
      }

      if (name === 'distance' && option.id == 0) {
        console.log('option', selectedOption)
      }

      const selectedColor = selectedOption ? COLORS.textAccent : COLORS.transparent
      const selectedTextColor = selectedOption ? COLORS.white : COLORS.textAccent

      return (
        <OptionRow
          color={selectedColor}
          onPress={async () => {
            setSelectedOption(!selectedOption)

            if (selectedOption) {
              return setFilter(filter, filtered)
            }

            return setFilter(filter, [...lFilters[name], option.id])
          }}
        >
          <Fonts.RegularText style={{ textAlign: 'center' }} color={selectedTextColor}>
            {name === 'difficulty' || name === 'type' ? t(value) : value} {unit}
          </Fonts.RegularText>
        </OptionRow>
      )
    },
    [isOpen, lFilters]
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
      <StyledModal>
        <Row alignItems={'center'} justifyContent={'space-between'} m={'20px'}>
          <Flex w={headingW}>
            <Fonts.Heading size={32}>{title}</Fonts.Heading>
          </Flex>

          <PressableOpacity onPress={onClose}>
            <Icons.Close color={COLORS.textAccent} />
          </PressableOpacity>
        </Row>
        {filters.map((filter) => {
          const { icon, id, options, title } = filter

          return (
            <Flex key={id} mb={'20px'}>
              <Row alignItems={'center'}>
                <Flex mr={'10px'}>{icon}</Flex>
                <Fonts.RegularText>{capitalize(t(title))}</Fonts.RegularText>
              </Row>

              <Row mt={'10px'} flexWrap={'wrap'}>
                {options.map((option, index) => (
                  <FilterOption filter={filter} option={option} key={index} />
                ))}
              </Row>
            </Flex>
          )
        })}
        <Row alignItems={'center'} justifyContent={'space-around'}>
          <CustomButton
            title={t('APPLY')}
            onPress={() => {
              onClose()
              dispatch(setApplied(true))
            }}
          />
          <CustomButton title={t('CLEAR')} type={'secondary'} onPress={() => clearFilters()} />
        </Row>
      </StyledModal>
    </Modal>
  )
}

const StyledModal = styled(Flex)`
  background-color: white;
  padding: 0 10px;
  width: 90%;
  border-radius: 15px;

  border-color: 1px;
`

const OptionRow = styled(Pressable)`
  margin-right: 10px;
  margin-bottom: 10px;

  border-radius: 15px;
  padding: 10px;
  background-color: ${({ color }) => `${color}`};

  border-width: 1px;
  border-color: ${COLORS.textAccent};
`

export default FilterModal
