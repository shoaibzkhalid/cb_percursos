import React from 'react'
import styled from 'styled-components'
import { Flex, Modal, Row } from 'native-base'

import { COLORS, Icons } from 'theme'
import { PressableOpacity } from 'components'
import { useDispatch } from 'react-redux'
import { setFilter } from 'store/slices/filterSlice'
import { filters, FILTER_INITIAL_STATE } from 'config/constants'

const TrailSelection = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const items = [
    {
      id: 0,
      icon: <Icons.Bike color={COLORS.textAccent} width={50} height={50} />,
      type: filters[3].options[0], // bike
    },
    {
      id: 1,
      icon: <Icons.Walk color={COLORS.textAccent} width={50} height={50} />,
      type: filters[3].options[1], // walk
    },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
      <StyledModal showsVerticalScrollIndicator={false}>
        <Row alignItems={'center'} justifyContent={'space-around'}>
          {items.map(({ type, id, icon }) => (
            <IconContainer
              key={id}
              onPress={() => {
                dispatch(
                  setFilter({
                    ...FILTER_INITIAL_STATE,
                    type: [type],
                  })
                )
                onClose()
              }}
            >
              {icon}
            </IconContainer>
          ))}
        </Row>
      </StyledModal>
    </Modal>
  )
}

const IconContainer = styled(PressableOpacity)`
  background-color: white;
  padding: 20px;
  min-width: 70px;
  border-radius: 15px;
  align-items: center;
`

const StyledModal = styled(Flex)`
  background-color: ${COLORS.screenBg};
  padding: 0 10px;
  width: 80%;
  border-radius: 15px;

  padding: 50px 20px;
  /* height: 80%; */

  border-color: 1px;
`

export default TrailSelection
