import React from 'react'
import styled from 'styled-components'
import { Flex, Image, Row } from 'native-base'
import { ImageBackground } from 'react-native'
import { capitalize } from 'lodash'

import { COLORS, Fonts, images } from 'theme'
import PressableOpacity from 'components/PressableOpacity'
import { useDispatch, useSelector } from 'react-redux'
import { setLang } from 'store/slices/appSlice'
import { useI18n } from 'hooks/useI18n'
import { languages } from 'config/constants'
import { useWeather } from 'hooks/useWeather'

const Welcome = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch()
  const { t } = useI18n()
  const { getIconUrl } = useWeather()
  const { weather, main } = useSelector((state) => state.app.weather)
  const { temp } = main

  return (
    <ImageBackground opacity={0.6} source={images.bgImg} style={{ height: '100%' }}>
      <Flex alignItems={'center'} mt={'20px'}>
        <Image source={images.title} style={{ width: 300, height: 30 }} alt={'title'} />

        <Flex mt={'10px'}>
          <Image source={images.top} style={{ width: 50, height: 50 }} alt={'title'} />
        </Flex>
      </Flex>
      {weather && (
        <Row alignItems={'center'} w={'33.5%'} justifyContent={'space-between'} mx={'20px'}>
          <Image
            alt={'temp'}
            style={{ width: 70, height: 70 }}
            source={{
              uri: getIconUrl(weather[0].icon),
            }}
          />

          <Flex mb={'6px'}>
            <Fonts.MediumHeading color={COLORS.black}>
              {Math.floor(temp)}°C
            </Fonts.MediumHeading>
          </Flex>
        </Row>
      )}
      <LangSelector>
        <Flex mb={'0px'}>
          <Fonts.RegularText color={COLORS.white}>{t('CHOOSE_LANG')}</Fonts.RegularText>
        </Flex>

        <Row justifyContent={'space-between'}>
          {languages.map(({ title, code }) => (
            <Language
              p={'20px'}
              key={title}
              onPress={() => {
                dispatch(setLang(code))
                navigate('HomeTabs')
              }}
            >
              <Flex alignSelf={'center'}>
                <Flag source={images[title]} alt={'flag'} />
              </Flex>
              <Flex mt={'20px'}>
                <Fonts.SmallText style={{ textAlign: 'center' }} color={COLORS.white}>
                  {capitalize(title)}
                </Fonts.SmallText>
              </Flex>
            </Language>
          ))}
        </Row>
      </LangSelector>

      <Flex mr={'auto'} ml={'10px'} mb={'20px'}>
        <Image alt={'logo'} style={{ width: 170, height: 90 }} source={images.logo} />
      </Flex>
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
