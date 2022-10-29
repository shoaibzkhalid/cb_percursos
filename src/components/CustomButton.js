import React from 'react'
import styled from 'styled-components'
import { Button, Row } from 'native-base'

import { COLORS, Fonts, Styles } from 'theme'
import LoadingAnimation from './LoadingAnimation'

const CustomButton = (props) => {
  const { children, onPress, isLoading, style, type = 'primary', title } = props

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'secondary':
        return COLORS.secondaryBtn
      case 'tertiary':
        return COLORS.dark40
      default:
        return COLORS.primaryBtn
    }
  }

  return (
    <StyledBtn
      onPress={onPress}
      style={style}
      color={getBackgroundColor(type)}
      shadow={props.noShadow ? null : Styles.dropShadowLight}
    >
      {isLoading ? (
        <LoadingAnimation color={COLORS.white} size={'small'} />
      ) : (
        <Row alignItems={'center'}>
          {children}
          {title && <StyledBtnText type={type}>{title}</StyledBtnText>}
        </Row>
      )}
    </StyledBtn>
  )
}

const StyledBtn = styled(Button)`
  background-color: ${({ color }) => `${color}`};
  padding: 15px;
  border-radius: 15px;
  margin: 10px 0px;
  height: 55px;
  align-items: center;

  ${({ style }) => `${style}`};
  ${({ shadow }) => `${shadow}`}
`

const StyledBtnText = styled(Fonts.RegularText)`
  color: ${({ type }) =>
    `${type !== 'secondary' ? COLORS.white : COLORS.primary}`};
`

export default CustomButton
