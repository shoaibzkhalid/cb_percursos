import React from 'react'
import styled from 'styled-components'
import { Flex, Image, Row } from 'native-base'
import { ImageBackground } from 'react-native'
import { capitalize } from 'lodash'

import { COLORS, Fonts, images } from 'theme'
import PressableOpacity from 'components/PressableOpacity'

const Welcome = ({ navigation: { navigate } }) => {
  const languages = ['english', 'espanol', 'portuguese']

  return (
    <ImageBackground opacity={0.8} source={images.bgImg} style={{ height: '100%' }}>
      <LangSelector>
        {/* <Flex mb={'10px'}>
            <Fonts.RegularText color={COLORS.white}>
              Choose your language
            </Fonts.RegularText>
          </Flex> */}

        <Row justifyContent={'space-between'}>
          {languages.map((l) => (
            <Language p={'20px'} key={l} onPress={() => navigate('HomeTabs')}>
              <Flex alignSelf={'center'}>
                <Flag source={images[l]} alt={'flag'} />
              </Flex>
              <Flex mt={'20px'}>
                <Fonts.SmallText style={{ textAlign: 'center' }} color={COLORS.white}>
                  {capitalize(l)}
                </Fonts.SmallText>
              </Flex>
            </Language>
          ))}
        </Row>
      </LangSelector>
    </ImageBackground>
  )
}

const Flag = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`

const Language = styled(PressableOpacity)`
  margin: 10px 5px;

  align-items: center;
  justify-content: center;
  width: 35%;
`

const LangSelector = styled(Flex)`
  margin: 20px;
  align-items: center;
  margin-top: auto;
`

export default Welcome
