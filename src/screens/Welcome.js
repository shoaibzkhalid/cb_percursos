import React from 'react'
import styled from 'styled-components'
import { Flex, Image, Row } from 'native-base'
import { ImageBackground, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { capitalize } from 'lodash'

import { PressableOpacity } from 'components'
import { COLORS, Fonts, images } from 'theme'
import { useWeather, useTrails, useLocation } from 'hooks'
import { setLang } from 'store/slices/appSlice'
import { languages } from 'config/constants'
import { weatherIcons } from 'theme/weatherIcons'

const Welcome = ({ navigation: { navigate } }) => {
  useTrails()
  useWeather()
  useLocation()

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
      <Flex alignItems={'center'}>
        <Row
          w={'100%'}
          justifyContent={'space-between'}
          mt={Platform.OS === 'ios' ? '50px' : '10px'}
        >
          <Image alt={'logo'} style={{ width: 130, height: 60 }} source={images.logoLight} />
        </Row>

        <Image
          source={images.launcherIcon}
          resizeMode={'contain'}
          style={{ width: 140, height: 180 }}
          alt={'title'}
        />
      </Flex>

      <Weather />

      <Flex mt={'auto'} m={'10px'}>
        <Image alt={'logo'} source={images.branding} style={{ borderRadius: 15 }} />
      </Flex>

      <LangSelector>
        {languages.map(({ title, code, image }) => (
          <Language
            key={title}
            onPress={() => {
              navigate('HomeTabs')
              dispatch(setLang(code))
            }}
          >
            <Flex alignSelf={'center'}>
              <Flag source={images[image]} alt={'flag'} />
            </Flex>
            <Flex mt={'10px'}>
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
  margin: 0px 5px;

  align-items: center;
  justify-content: center;
`

const LangSelector = styled(Flex)`
  margin: 20px;
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
