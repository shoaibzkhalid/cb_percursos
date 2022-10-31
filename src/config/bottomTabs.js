import React from 'react'

import { Icons } from 'theme'

import { Dashboard, Map } from 'screens'

export const bottomTabs = [
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
