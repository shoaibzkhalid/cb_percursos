import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Flex, Menu } from 'native-base'

import { Fonts, Icons, COLORS } from 'theme'
import CustomDivider from './CustomDivider'
import PressableOpacity from './PressableOpacity'

const MenuPopover = ({
  placeholder = 'Sort by',
  options = [
    { id: 0, name: 'Latest' },
    { id: 1, name: 'A to Z' },
    { id: 2, name: 'Oldest' },
  ],
  children,
  keyName = 'name',
  handleOption,
  selected,
  style,
}) => {
  return (
    <Menu
      w="167"
      borderRadius={'20px'}
      trigger={(triggerProps) => (
        <PressableOpacity triggerProps={triggerProps} style={style}>
          {children}
        </PressableOpacity>
      )}
      top={'10px'}
      right={'50px'}
    >
      <Flex p={'20px'}>
        <Fonts.RegularText>{placeholder}</Fonts.RegularText>
      </Flex>

      {options.map((option, index) => {
        const { id } = option

        return (
          <Fragment key={id}>
            <PressableOpacity
              mt={index ? '16px' : 0}
              onPress={() => handleOption(option)}
              flexDirection={'row'}
              noRipple
            >
              <Option alignItems={'center'}>
                <Fonts.RegularText color={COLORS.dark40}>
                  {option[keyName]}
                </Fonts.RegularText>

                <Flex ml={'auto'}>
                  <Icons.ActiveCheck opacity={id === selected ? 1 : 0.3} />
                </Flex>
              </Option>
            </PressableOpacity>
            <CustomDivider width={'94%'} borderWidth={'2px'} mt={'16px'} />
          </Fragment>
        )
      })}
    </Menu>
  )
}

const Option = styled(Flex)`
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`

export default MenuPopover
