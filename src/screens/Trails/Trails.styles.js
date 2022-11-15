import { StyleSheet } from 'react-native'
import { Flex, Image, Pressable } from 'native-base'
import styled from 'styled-components'
import { COLORS } from 'theme'
import { PressableOpacity } from 'components'

const Item = styled(Pressable)`
  border-radius: 15px;
  margin: 10px;
`

const TrailContainer = styled(Flex)`
  border-radius: 15px;
`

const TrailImg = styled(Image)`
  height: 190px;
  border-radius: 15px;
  opacity: 0.8;
`

const TrailLabel = styled(Flex)`
  margin: 10px;
  position: absolute;
  bottom: 0px;
  background-color: ${({ color }) => `${color}`};
`
const TrailType = styled(Flex)`
  margin: 10px;
  position: absolute;
  /* bottom: 0px; */
  top: 0;
  right: 0;

  padding: 5px 10px;
  background-color: ${({ color }) => `${color}`};
`

const LogoImg = styled(Image)`
  margin: 10px;
  width: 110px;
  height: 50px;

  ${StyleSheet.absoluteFill}
`

const OptionRow = styled(PressableOpacity)`
  margin-right: 10px;
  margin-bottom: 10px;

  border-radius: 15px;
  padding: 10px;
  background-color: ${({ color }) => `${color}`};

  border-width: 1px;
  border-color: ${COLORS.textAccent};
`

export default {
  Item,
  TrailContainer,
  TrailImg,
  TrailLabel,
  LogoImg,
  OptionRow,
  TrailType,
}
