import React from 'react'
import styled from 'styled-components'
import { Flex, Modal, Row } from 'native-base'

import { CustomButton, PressableOpacity } from 'components'
import { COLORS, Fonts, Icons } from 'theme'
import { useDispatch } from 'react-redux'
import { setFilter, setFiltersApplied } from 'store/slices/filterSlice'

const FilterModal = ({ title, isOpen, onClose, headingW, children }) => {
  const dispatch = useDispatch()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
      <StyledModal>
        <Row alignItems={'center'} justifyContent={'space-between'} m={'20px'}>
          <Flex w={headingW}>
            <Fonts.BigHeading>{title}</Fonts.BigHeading>
          </Flex>

          <PressableOpacity onPress={onClose}>
            <Icons.Close color={COLORS.textAccent} />
          </PressableOpacity>
        </Row>
        {children}
        <Row alignItems={'center'} justifyContent={'space-around'}>
          <CustomButton
            title={'Filter'}
            onPress={() => {
              dispatch(setFiltersApplied(true))
              onClose()
            }}
          />
          <CustomButton
            title={'Clear'}
            type={'secondary'}
            onPress={() => {
              dispatch(setFiltersApplied(false))
              dispatch(
                setFilter({
                  duration: [],
                  distance: [],
                  difficulty: [],
                })
              )
            }}
          />
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

export default FilterModal
