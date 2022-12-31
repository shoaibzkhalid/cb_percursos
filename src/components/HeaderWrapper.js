import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components'

const HeaderWrapper = ({ children }) => {
  return <StyledSafeAreaView edges={['top']}>{children}</StyledSafeAreaView>
}

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`

export default HeaderWrapper
