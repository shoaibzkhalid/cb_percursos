import { StyleSheet } from 'react-native'
import { Flex, Row } from 'native-base'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components'

import { COLORS } from 'theme'
import { PressableOpacity, ProgressiveImg } from 'components'

const Item = styled(PressableOpacity)`
  border-radius: 15px;
  margin: 10px;
`

const TrailContainer = styled(Flex)`
  border-radius: 15px;
`

const TrailImg = styled(ProgressiveImg)`
  height: 190px;
  border-radius: 15px;
  opacity: 0.8;
`

const LabelsContainer = styled(Flex)`
  position: absolute;
  margin: 10px;
  bottom: 0px;
  height: 40%;
`

const TrailLabel = styled(Flex)`
  background-color: ${({ color }) => `${color}`};
  flex-grow: 0;
  align-self: flex-start;
`
const TrailType = styled(Flex)`
  margin: 10px;
  position: absolute;
  top: 0;
  right: 0;

  padding: 5px 10px;
  background-color: ${({ color }) => `${color}`};
`

const TrailDist = styled(Flex)`
  margin: 10px;
  margin-right: 0;
  position: absolute;
  bottom: 0px;
  /* top: 0; */
  right: 0;

  padding: 5px 10px;
  background-color: ${({ color }) => `${color}`};
`

const LogoImg = styled(FastImage)`
  margin: 10px;
  margin-left: 0;
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

const ElevationTextContainer = styled(Row)`
  position: absolute;
  bottom: 10px;
  right: 15px;
  align-items: center;
`

export default {
  ElevationTextContainer,
  Item,
  TrailContainer,
  TrailImg,
  TrailLabel,
  LabelsContainer,
  LogoImg,
  OptionRow,
  TrailType,
  TrailDist,
}
