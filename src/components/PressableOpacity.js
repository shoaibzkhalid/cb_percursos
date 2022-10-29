import React from 'react'
import { Pressable } from 'native-base'
import { Animated } from 'react-native'

const PressableOpacity = (props) => {
  const animated = new Animated.Value(1)
  const { children, noRipple = false } = props

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.1,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Pressable
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      android_ripple={{
        ...(!noRipple && {
          color: 'white',
          borderless: true,
        }),
      }}
      {...props}
      {...props?.triggerProps}
      // style={({ pressed }) => [
      //   {
      //     backgroundColor: pressed ? COLORS.tapColor : 'transparent',
      //     borderRadius: 20,
      //   },
      // ]}
    >
      <Animated.View
        style={{
          opacity: animated,
        }}
      >
        {children}
      </Animated.View>
    </Pressable>
  )
}

export default PressableOpacity
