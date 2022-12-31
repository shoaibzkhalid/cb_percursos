import React from 'react'
import { Flex } from 'native-base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { COLORS, Fonts, Styles } from 'theme'
import { PressableOpacity } from 'components'
import { bottomTabs } from 'config'
import { useI18n } from 'hooks'
import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components'

const Tabs = () => {
  const { t } = useI18n()
  const Tab = createBottomTabNavigator()
  const isIOS = Platform.OS === 'ios'

  return (
    <StyledSafeAreaView edges={['top']}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            paddingBottom: 0,
            height: isIOS ? 80 : 66,
            borderTopColor: 'transparent',
            ...Styles.dropShadow,
          },
        }}
        initialRouteName={'Map'}
      >
        {bottomTabs.map(({ name, component, getIcon }) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Flex mt={'10px'}>
                    {getIcon(focused ? COLORS.textAccent : COLORS.dark40)}
                  </Flex>
                ),
                tabBarLabel: ({ focused }) => (
                  <Flex mb={isIOS ? '20px' : '10px'}>
                    <Fonts.SmallTextLight color={focused ? COLORS.textAccent : COLORS.dark40}>
                      {t(name)}
                    </Fonts.SmallTextLight>
                  </Flex>
                ),
                tabBarButton: (props) => <PressableOpacity {...props} />,
              }}
            />
          )
        })}
      </Tab.Navigator>
    </StyledSafeAreaView>
  )
}

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`

export default Tabs
