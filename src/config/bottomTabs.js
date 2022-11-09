import React from 'react'

import { Icons } from 'theme'

import { Map, Trails } from 'screens'

export const bottomTabs = [
  {
    name: 'TRAILS',
    component: Trails,
    getIcon: (color) => <Icons.Trail color={color} width={22} />,
  },
  // {
  //   name: 'Dashboard',
  //   component: Dashboard,
  //   getIcon: (color) => <Icons.Trail color={color} width={22} />,
  // },

  {
    name: 'MAP',
    component: Map,
    getIcon: (color) => <Icons.Map color={color} />,
  },
]
