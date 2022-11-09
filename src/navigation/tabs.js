import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { COLORS, Fonts, Styles } from 'theme'
import { PressableOpacity } from 'components'
import { bottomTabs } from 'config'
import { Flex } from 'native-base'
import { useI18n } from 'hooks/useI18n'

const Tabs = () => {
  const { t } = useI18n()

  const Tab = createBottomTabNavigator()

  // console.log(bottomTabs[0])

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 0,
          height: 66,
          borderTopColor: 'transparent',
          ...Styles.dropShadow,
        },
      }}
      initialRouteName="Trails"
    >
      {bottomTabs.map(({ name, component, getIcon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ focused }) => (
              <Flex mt={'10px'}>{getIcon(focused ? COLORS.textAccent : COLORS.dark40)}</Flex>
            ),
            tabBarLabel: ({ focused }) => (
              <Flex mb={'10px'}>
                <Fonts.SmallTextLight color={focused ? COLORS.textAccent : COLORS.dark40}>
                  {t(name)}
                </Fonts.SmallTextLight>
              </Flex>
            ),
            tabBarButton: (props) => <PressableOpacity {...props} />,
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default Tabs
