import React from 'react'
import styled from 'styled-components'
import { Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { COLORS, Styles, Icons } from 'theme'
import PressableOpacity from './PressableOpacity'

const BackButton = ({ style, onPress }) => {
  const { goBack } = useNavigation()

  return (
    <PressableOpacity hitSlop={10} onPress={() => (onPress ? onPress() : goBack())}>
      <Container style={style} needsOffscreenAlphaCompositing={true}>
        <Icons.Back />
      </Container>
    </PressableOpacity>
  )
}

const Container = styled(Animated.View)`
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
  margin: 10px;
  margin-left: 0px;
  background-color: ${COLORS.secondaryBtn};
  border-radius: 10px;

  opacity: 0.9;
  ${Styles.dropShadowLight}
`

export default BackButton
