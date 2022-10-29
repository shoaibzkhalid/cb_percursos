import styled from 'styled-components'
import COLORS from './COLORS'

const dropShadow = {
  shadowColor: 'black',
  shadowOpacity: 0.16,
  shadowRadius: 10,
  elevation: 3,
  backgroundColor: 'white',
}

const dropShadowLight = {
  shadowColor: COLORS.black,
  shadowOpacity: 0.16,
  shadowRadius: 10,
  elevation: 1,
}

const InputContainer = styled.View`
  background-color: ${COLORS.secondaryBtn};
  border-radius: 15px;
  margin: 5px 0px;

  ${dropShadowLight}
`

const Badge = styled.View`
  background-color: ${COLORS.textAccent};
  width: 13px;
  height: 13px;
  border-radius: 50px;
  align-items: center;

  ${({ absolute }) =>
    `${
      absolute &&
      ` position: absolute;
        left: 10px;
        top: -5px;`
    }`}
`

export default { dropShadow, InputContainer, dropShadowLight, Badge }
