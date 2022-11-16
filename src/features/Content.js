import React from 'react'
import styled from 'styled-components'
import { Flex, Row } from 'native-base'
import { COLORS, Fonts } from 'theme'

const Content = ({ content, children }) => {
  const { icon, title } = content
  return (
    <>
      <Row w={'100%'} alignItems={'center'} m={'20px'} mb={'30px'}>
        {icon}
        <Fonts.BigHeading color={COLORS.white}>{title}</Fonts.BigHeading>
      </Row>

      <CustomCard>{children}</CustomCard>
    </>
  )
}

const CustomCard = styled(Flex)`
  background-color: ${COLORS.white};
  border-radius: 20px;
  min-width: 200px;
  min-height: 800px;
  margin: 10px 0px;
  margin-bottom: 0;
  padding: 10px 20px;
  top: -30px;
`

export default Content
