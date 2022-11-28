import React from 'react'
import styled from 'styled-components'
import { Flex, Image, Row } from 'native-base'
import { ImageBackground } from 'react-native'
import { capitalize } from 'lodash'

import { COLORS, Fonts, images } from 'theme'
import PressableOpacity from 'components/PressableOpacity'
import { useDispatch, useSelector } from 'react-redux'
import { setLang } from 'store/slices/appSlice'
import { languages } from 'config/constants'
import { useWeather } from 'hooks/useWeather'
import { weatherIcons } from 'theme/weatherIcons'
import { useTrails } from 'hooks/useTrails'
import { useLocation } from 'hooks/useLocation'
import { setFilterLoading } from 'store/slices/filterSlice'

const Welcome = ({ navigation: { navigate } }) => {
  useWeather()
  useLocation()
  useTrails()

  const dispatch = useDispatch()
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
        <Flex mr={'auto'} mb={'20px'}>
          <Image alt={'logo'} style={{ width: 130, height: 60 }} source={images.logoLight} />
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
        {languages.map(({ title, code, image }) => (
          <Language
            key={title}
            onPress={() => {
              dispatch(setFilterLoading(true))
              dispatch(setLang(code))
              navigate('HomeTabs')
              dispatch(setLang(code))
            }}
          >
            <Flex alignSelf={'center'}>
              <Flag source={images[image]} alt={'flag'} />
            </Flex>
            <Flex mt={'20px'}>
              <Fonts.SmallText style={{ textAlign: 'center' }} color={COLORS.white}>
                {capitalize(title)}
              </Fonts.SmallText>
            </Flex>
          </Language>
        ))}
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
`

const LangSelector = styled(Flex)`
  margin: 20px;
  margin-top: auto;
  /* top: 10px; */
  /* background-color: rebeccapurple; */
  flex-direction: row;
  justify-content: space-between;
`

const WeatherRow = styled(Row)`
  align-items: center;
  margin: 0 20px;
  justify-content: space-between;
  width: 33.3%;
  margin-top: auto;
  top: 10%;
`

export default Welcome
