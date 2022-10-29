import React from 'react'
import { Flex, Row } from 'native-base'

import CustomButton from './CustomButton'
import { Fonts } from 'theme'

const ButtonIcon = (props) => {
  const { icon, children, textColor } = props

  return (
    <CustomButton {...props}>
      <Row alignItems={'center'}>
        {icon}
        <Flex ml={'10px'}>
          <Fonts.RegularText color={textColor}>{children}</Fonts.RegularText>
        </Flex>
      </Row>
    </CustomButton>
  )
}

export default ButtonIcon
