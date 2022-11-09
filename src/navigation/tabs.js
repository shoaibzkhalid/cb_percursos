import React from 'react'
import styled from 'styled-components'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { COLORS, Fonts } from 'theme'
import { PressableOpacity } from 'components'
import { bottomTabs } from 'config'

const Tabs = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Trails">
      {bottomTabs.map(({ name, component, getIcon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                {getIcon(focused ? COLORS.textAccent : COLORS.dark40)}
                {/* {focused && <TinyActiveDot />} */}
              </>
            ),
            tabBarLabel: ({ focused }) => (
              <>
                <Fonts.SmallTextLight color={focused ? COLORS.textAccent : COLORS.dark40}>
                  {name}
                </Fonts.SmallTextLight>
              </>
            ),
            tabBarButton: (props) => <PressableOpacity {...props} />,
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

const TinyActiveDot = styled.View`
  background-color: ${COLORS.primaryBtn};
  width: 6px;
  height: 6px;
  border-radius: 50px;
  position: absolute;

  ${Platform.OS === 'android'
    ? {
        bottom: '15px',
      }
    : { bottom: 0 }}
`

export default Tabs
