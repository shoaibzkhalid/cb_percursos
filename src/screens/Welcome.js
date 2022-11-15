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
import { weatherIcons } from 'theme/weatherIcons'

const Welcome = ({ navigation: { navigate } }) => {
  useWeather()
  const dispatch = useDispatch()
  const { t } = useI18n()
  const { weather, main } = useSelector((state) => state.app.weather)
  const weatherIcon = weather ? weatherIcons[`_${weather[0].icon}`] : null

  const Weather = React.useCallback(() => {
    return (
      <>
        {weather && (
          <WeatherRow>
            {weatherIcon ? weatherIcon(COLORS.white) : weatherIcons._03n(COLORS.white)}

            <Flex mb={'6px'}>
              <Fonts.MediumHeading color={COLORS.white}>
                {Math.floor(main?.temp)}°C
              </Fonts.MediumHeading>
            </Flex>
          </WeatherRow>
        )}
      </>
    )
  }, [weather])

  return (
    <ImageBackground opacity={0.9} source={images.splash} style={{ height: '100%' }}>
      <Flex alignItems={'center'} mt={'20px'}>
        <Flex mr={'auto'} ml={'10px'} mb={'20px'}>
          <Image alt={'logo'} style={{ width: 130, height: 60 }} source={images.logo} />
        </Flex>

        <Image
          source={images.logo1}
          resizeMode={'contain'}
          style={{ width: 140, height: 180 }}
          alt={'title'}
        />
      </Flex>

      <Weather />

      <LangSelector>
        <Flex mb={'0px'}>
          <Fonts.RegularText color={COLORS.white}>{t('CHOOSE_LANG')}</Fonts.RegularText>
        </Flex>

        <Row justifyContent={'space-between'}>
          {languages.map(({ title, code }) => (
            <Language
              p={'10px'}
              key={title}
              onPress={() => {
                dispatch(setLang(code))
                navigate('HomeTabs')
                dispatch(setLang(code))
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
    </ImageBackground>
  )
}

const Flag = styled(Image)`
  width: 35px;
  height: 35px;
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
  top: 10px;
`

const WeatherRow = styled(Row)`
  align-items: center;
  margin: 0 20px;
  justify-content: space-between;
  width: 33.3%;
  margin-top: auto;
  top: 30%;
`

export default Welcome
