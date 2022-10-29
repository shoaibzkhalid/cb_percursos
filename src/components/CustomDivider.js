import React from 'react'
import { Divider } from 'native-base'

import { COLORS } from 'theme'

const CustomDivider = (props) => (
  <Divider
    borderWidth={'1px'}
    alignSelf={'center'}
    borderColor={COLORS.screenBg}
    {...props}
  />
)

export default CustomDivider
