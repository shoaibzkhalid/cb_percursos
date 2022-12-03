import React from 'react'
import styled from 'styled-components'
import { Flex, Modal, Row, Pressable } from 'native-base'

import { COLORS, Fonts, Icons } from 'theme'

const ImageModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
      <StyledModal showsVerticalScrollIndicator={false}>
        <Row mt={'50px'} w={'100%'}>
          <Flex m={'auto'} mr={'-10px'}>
            <Fonts.RegularTextLight color={COLORS.white}>1/1</Fonts.RegularTextLight>
          </Flex>

          <Pressable ml={'auto'} onPress={onClose}>
            <Icons.Close color={COLORS.textAccent} />
          </Pressable>
        </Row>
        <Flex m={'auto'} bottom={'40px'}>
          {children}
        </Flex>
      </StyledModal>
    </Modal>
  )
}

const StyledModal = styled(Flex)`
  background-color: black;
  height: 100%;
  justify-content: space-between;
`

export default ImageModal
