import React from 'react'
import Toast from 'react-native-toast-message'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { TrailMapFull, FollowTrail } from 'features'

import { toastConfig } from 'utils/toast'
import { COLORS } from 'theme'
import Tabs from './tabs'
import Welcome from 'screens/Welcome'
import Trail from 'screens/Trail'

const Routes = () => {
  const Stack = createStackNavigator()
  const MapStack = createStackNavigator()

  // All the routes of the app are defined here
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  })

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: COLORS.brand,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: forFade,
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="HomeTabs" component={Tabs} />

        <Stack.Screen name="Trail" component={Trail} />
        <Stack.Screen name="TrailMapFull" component={TrailMapFull} />
        <Stack.Screen name="FollowTrail" component={FollowTrail} />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  )
}

export default Routes
