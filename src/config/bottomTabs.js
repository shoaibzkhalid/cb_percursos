import React from 'react'

import { Icons } from 'theme'
import { Map, Trails } from 'screens'
import Sos from 'screens/Sos'
import Safety from 'screens/Safety'

export const bottomTabs = [
  {
    name: 'TRAILS',
    component: Trails,
    getIcon: (color) => <Icons.Trail color={color} width={22} />,
  },

  {
    name: 'MAP',
    component: Map,
    getIcon: (color) => <Icons.Map color={color} />,
  },

  {
    name: 'SOS',
    component: Sos,
    getIcon: (color) => <Icons.Sos color={color} width={32} />,
  },

  {
    name: 'SAFETY',
    component: Safety,
    getIcon: (color) => <Icons.Safety color={color} width={32} />,
  },
]
