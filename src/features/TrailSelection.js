import React from 'react'
import styled from 'styled-components'
import { Flex, Modal, Row } from 'native-base'

import { COLORS, Fonts, Icons } from 'theme'
import { PressableOpacity } from 'components'
import { useDispatch } from 'react-redux'
import { setApplied, setFilterLoading, setType } from 'store/slices/filterSlice'
import { filters } from 'config/constants'
import { useI18n } from 'hooks/useI18n'

const TrailSelection = ({ isOpen, onClose }) => {
  const { t } = useI18n()

  const dispatch = useDispatch()
  const items = [
    {
      id: 0,
      icon: <Icons.Bike color={COLORS.textAccent} width={50} height={50} />,
      type: filters[0].options[0], // bike
      title: t('BIKE'),
    },
    {
      id: 1,
      icon: <Icons.Walk color={COLORS.textAccent} width={50} height={50} />,
      type: filters[0].options[1], // walk
      title: t('WALK'),
    },
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        dispatch(setFilterLoading(false))
        onClose()
      }}
      size={'full'}
    >
      <StyledModal showsVerticalScrollIndicator={false}>
        <Flex mb={'20px'} alignSelf={'center'}>
          <Fonts.RegularText color={COLORS.dark80}>{t('SELECT_TYPE')}</Fonts.RegularText>
        </Flex>

        <Row alignItems={'center'} justifyContent={'space-around'}>
          {items.map(({ type, id, icon, title }) => (
            <Flex alignItems={'center'} key={id}>
              <IconContainer
                key={id}
                onPress={async () => {
                  dispatch(setApplied(true))
                  onClose()
                  dispatch(setType([type.id]))

                  setTimeout(() => {
                    dispatch(setFilterLoading(false))
                  }, 1)
                }}
              >
                {icon}
              </IconContainer>
              <Flex mt={'10px'}>
                <Fonts.RegularText color={COLORS.dark80}>{title}</Fonts.RegularText>
              </Flex>
            </Flex>
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
