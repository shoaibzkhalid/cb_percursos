import React from 'react'
import { Flex } from 'native-base'
import { ActivityIndicator, StyleSheet } from 'react-native'

import { COLORS } from 'theme'

const LoadingAnimation = ({ style, color, size }) => {
  return (
    <Flex style={StyleSheet.absoluteFillObject} justifyContent={'center'}>
      <ActivityIndicator
        size={size ? size : 'large'}
        color={color ? color : COLORS.primaryBtn}
      />
    </Flex>
  )
}

export default LoadingAnimation
