import React from 'react'
import styled from 'styled-components'
import { Flex, Modal, ScrollView } from 'native-base'

import { COLORS, Icons } from 'theme'
import { Pressable } from 'react-native'

const DescModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
      <StyledModal background={'red.100'} showsVerticalScrollIndicator={false}>
        <Pressable
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            padding: 10,
            zIndex: 1,
          }}
          onPress={onClose}
        >
          <Icons.Close color={COLORS.textAccent} />
        </Pressable>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 30 }}
        >
          {children}
        </ScrollView>
      </StyledModal>
    </Modal>
  )
}

const StyledModal = styled(Flex)`
  background-color: white;
  padding: 0 10px;
  width: 90%;
  border-radius: 15px;

  padding: 20px;
  height: 80%;

  border-color: 1px;
`

export default DescModal
