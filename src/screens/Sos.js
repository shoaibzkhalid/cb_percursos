import React from 'react'
import { COLORS, Fonts, Icons } from 'theme'
import styled from 'styled-components'
import { Flex, ScrollView } from 'native-base'

const Sos = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      <Flex alignItems={'center'} my={'20px'}>
        {/* <Icons.Sos width={120} height={120} color={COLORS.red} /> */}
        <Flex mt={'20px'}>
          <Fonts.BigHeading>SOS</Fonts.BigHeading>
        </Flex>
      </Flex>

      <CustomCard>
        <Icons.Phone width={120} height={120} color={COLORS.textAccent} />

        <Flex alignItems={'center'} p={'20px'}>
          <Fonts.RegularText color={COLORS.dark40}>Phone</Fonts.RegularText>
          <Fonts.RegularText>123 123 123</Fonts.RegularText>
        </Flex>
      </CustomCard>

      <CustomCard>
        <Icons.Mail width={120} height={120} color={COLORS.textAccent} />

        <Flex alignItems={'center'} p={'20px'}>
          <Fonts.RegularText color={COLORS.dark40}>Mail</Fonts.RegularText>
          <Fonts.RegularText>123 123 123</Fonts.RegularText>
        </Flex>
      </CustomCard>
    </ScrollView>
  )
}

const CustomCard = styled(Flex)`
  background-color: white;
  border-radius: 15px;
  height: 210px;

  margin: 10px;
  padding: 10px;
  align-items: center;
`

export default Sos
