import React from 'react'
import styled from 'styled-components'
// import Toast from 'react-native-toast-message'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'

// import { toastConfig } from 'utils/toast'

import { COLORS } from 'theme'
import Tabs from './tabs'
import Welcome from 'screens/Welcome'

const Routes = () => {
  const Stack = createStackNavigator()

  // All the routes of the app are defined here
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  })

  return (
    <StyledSafeAreaView edges={['top']}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: forFade,
          }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="HomeTabs" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </StyledSafeAreaView>
  )
}

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ accessToken }) => `${accessToken ? COLORS.screenBg : COLORS.white}`};
`

export default Routes
