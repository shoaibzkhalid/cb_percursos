import React from 'react'
import styled from 'styled-components'
import { Menu } from 'native-base'
import PressableOpacity from './PressableOpacity'

const HoverMenu = ({ children, trigger, style }) => {
  return (
    <Container
      style={style}
      trigger={(triggerProps) => (
        <PressableOpacity triggerProps={triggerProps} hitSlop={15}>
          {trigger()}
        </PressableOpacity>
      )}
    >
      {children}
    </Container>
  )
}

const Container = styled(Menu)`
  background-color: white;
  border-radius: 10px;
  align-items: center;
  padding: 20px 0px;
  width: 260px;

  top: 8px;
  right: 35px;

  ${({ style }) => `${style}`}
`

export default HoverMenu
