import { Animated } from 'react-native'
import React from 'react'
import styled from 'styled-components'

import { Icons } from 'theme'
import { useCompass } from 'hooks'

const Compass = () => {
  const { heading } = useCompass()

  return (
    <Container
      style={{
        transform: [
          {
            rotate: `${360 - heading}deg`,
          },
        ],
      }}
    >
      <Icons.CompassLight />
    </Container>
  )
}

const Container = styled(Animated.View)`
  position: absolute;
  top: 10px;

  z-index: 100000;
`

export default Compass
