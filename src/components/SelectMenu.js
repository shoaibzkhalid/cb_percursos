import React from 'react'
import _, { capitalize } from 'lodash'
import { Flex, Row, Menu } from 'native-base'
import { Pressable } from 'react-native'

import { Icons, Fonts, COLORS, Styles } from 'theme'

const SelectMenu = (props) => {
  const { options, placeholder, onChange, left, name, label, defaultValue, disabled } = props

  const defaultOption = options.filter((o) => o === defaultValue)[0]
  const [selectedOption, setSelectedOption] = React.useState(defaultOption)
  const [postOpen, setPostOpen] = React.useState(false)

  return (
    <>
      <Pressable onPress={() => setPostOpen(true)}>
        <Styles.InputContainer>
          <Row
            background={COLORS.secondaryBtn}
            borderRadius={'15px'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Row alignItems={'center'}>
              <Flex m={5} mr={3} width={7}>
                {left}
              </Flex>

              <Fonts.RegularText color={COLORS.dark40}>
                {selectedOption ? capitalize(selectedOption) : placeholder}
              </Fonts.RegularText>
            </Row>

            {!disabled && (
              <Flex mr={5}>
                <Icons.Chevron />
              </Flex>
            )}
          </Row>
        </Styles.InputContainer>
      </Pressable>
    </>
  )
}

export default SelectMenu
