import { Text } from 'native-base'
import styled, { css } from 'styled-components'
import { COLORS } from './COLORS'

// Fonts Types

const type = {
  regular: 'Nunito-Regular',
  bold: 'Nunito-Bold',
  italic: 'Nunito-Italic',
}

// Fonts Sizes
const size = {
  h1: 38,
  h2: 32,
  h3: 30,
  h4: 24, // being used for the title of the screen
  h5: 20,
  h6: 19, // being used for the institution name

  input: 18,

  tiny: 9,
  small: 13, // subtext
  regular: 17, // most used - regular
  medium: 14,
  mediumPlus: 15,
}

// -------------Common Text Styles-------------

const commonTextStyles = css`
  color: ${({ color = '#000' }) => (color ? color : COLORS.primary)};
  /* font-family: ${type.regular}; */
`
const fontWeight800 = css`
  ${commonTextStyles}
  font-weight: 800;
`

export const fontWeight700 = css`
  ${commonTextStyles}
  font-weight: 700;
`

export const fontWeight600 = css`
  ${commonTextStyles}
  font-weight: 600;
`

export const fontWeight500 = css`
  ${commonTextStyles}
  font-weight: 500;
`

// Styled Font React Elements

// -------------Body Headings-------------

const BiggerHeading = styled.Text`
  ${fontWeight800}
  font-size: ${size.h1}px;
`

const BigHeading = styled.Text`
  ${fontWeight800}
  font-size: ${size.h2}px;
`

const MediumHeading = styled.Text`
  ${fontWeight800}
  font-size: ${size.h4}px;
`

const SmallHeading = styled.Text`
  ${fontWeight800}
  font-size: ${size.h6}px;
`

const SmallHeadingLight = styled(Text)`
  ${fontWeight700}
  font-size: ${size.h6}px;
`

// -------------Body Texts-------------

const RegularTextBold = styled.Text`
  ${fontWeight800}
  font-size: ${size.regular}px;
`

const RegularText = styled.Text`
  ${fontWeight700}
  font-size: ${size.regular}px;
`

const RegularTextLight = styled(Text)`
  ${fontWeight600};
  font-size: ${size.regular}px;
`

const RegularTextLightest = styled(Text)`
  ${fontWeight500};
  font-size: ${size.regular}px;
`

const Medium = styled.Text`
  ${fontWeight700};
  font-size: ${size.medium}px;
`

const MediumPlus = styled.Text`
  ${fontWeight700};
  font-size: ${size.mediumPlus}px;
`

const MediumPlusLight = styled.Text`
  ${fontWeight600};
  font-size: ${size.mediumPlus}px;
`

const SmallTextBold = styled.Text`
  ${fontWeight800}
  font-size: ${size.small}px;
`

const SmallText = styled.Text`
  ${fontWeight700}
  font-size: ${size.small}px;
`

const TinyText = styled.Text`
  ${fontWeight700}
  font-size: ${size.tiny}px;
`

const SmallTextLight = styled.Text`
  ${fontWeight600}
  font-size: ${size.small}px;
`

export default {
  SmallTextLight,
  RegularText,
  RegularTextLight,
  RegularTextLightest,
  SmallText,
  SmallTextBold,
  RegularTextBold,
  //
  SmallHeading,
  SmallHeadingLight,
  MediumHeading,
  BigHeading,
  BiggerHeading,
  //
  MediumPlus,
  MediumPlusLight,
  Medium,

  TinyText,
}
