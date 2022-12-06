import React from 'react'
import styled from 'styled-components'
import { Flex, Modal, Row } from 'native-base'

import { COLORS, Fonts, Icons } from 'theme'
import { PressableOpacity } from 'components'
import { openMapLink } from 'utils'
import { useI18n } from 'hooks'

const DirectionModal = ({ isOpen, onClose, origin, destination }) => {
  const { t } = useI18n()

  const items = [
    {
      id: 0,
      icon: <Icons.Pin color={COLORS.textAccent} width={50} height={50} />,
      title: t('START'),
      onPress: () => openMapLink(origin),
    },
    {
      id: 1,
      icon: <Icons.Finish color={COLORS.textAccent} width={50} height={50} />,
      title: t('END'),
      onPress: () => openMapLink(destination),
    },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
      <StyledModal showsVerticalScrollIndicator={false}>
        <Flex mb={'20px'} alignSelf={'center'}>
          <Fonts.RegularText color={COLORS.dark80}>{t('DIR_MSG')}</Fonts.RegularText>
        </Flex>

        <Row alignItems={'center'} justifyContent={'space-around'}>
          {items.map(({ type, id, icon, title, onPress }) => (
            <Flex alignItems={'center'} key={id}>
              <IconContainer key={id} onPress={onPress}>
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
  border-color: 1px;
`

export default DirectionModal
