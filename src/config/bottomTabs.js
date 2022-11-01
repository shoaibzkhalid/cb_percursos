import React from 'react'

import { Icons } from 'theme'

import { Dashboard, Map, Trails } from 'screens'

export const bottomTabs = [
  {
    name: 'Trails',
    component: Trails,
    getIcon: (color) => <Icons.Map color={color} />,
  },
  {
    name: 'Dashboard',
    component: Dashboard,
    getIcon: (color) => <Icons.Trail color={color} width={22} />,
  },

  {
    name: 'Map',
    component: Map,
    getIcon: (color) => <Icons.Map color={color} />,
  },
]
