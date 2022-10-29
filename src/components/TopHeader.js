import React from 'react'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { Flex, Row } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { COLORS, Fonts, Icons, Styles } from 'theme'
import { BackButton, PressableOpacity } from 'components'

// Higher Order Component which adds an extra container
// based on screen orientation

const TopHeader = ({ children, title, showBackBtn = false }) => {
  const dispatch = useDispatch()

  const { navigate } = useNavigation()

  return (
    <Flex flex={1} mt={'10px'}>
      {/* Home Top Row */}
      <HomeRow>
        <Row alignItems={'center'}>
          {showBackBtn && <BackButton style={{ height: 0, width: 30 }} />}
          <Fonts.MediumHeading>{title}</Fonts.MediumHeading>
        </Row>

        <Row alignItems={'center'}>
          <SmallRoundContainer onPress={() => navigate('Notifications')} hitSlop={10}>
            <Icons.Bell />
            {count && count.length ? (
              <Styles.Badge absolute>
                <Fonts.TinyText color={COLORS.white}>{count.length}</Fonts.TinyText>
              </Styles.Badge>
            ) : null}
          </SmallRoundContainer>
        </Row>
      </HomeRow>
      {children}
    </Flex>
  )
}

const HomeRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
  margin: 0 30px 15px;
`

const smallCircleStyles = css`
  width: 45px;
  height: 45px;
  border-radius: 50px;
`

const SmallRoundContainer = styled(PressableOpacity)`
  ${smallCircleStyles}
  background-color: ${COLORS.white};
  margin-right: 10px;
  align-items: center;
  justify-content: center;
`

export default TopHeader
