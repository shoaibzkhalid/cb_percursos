import React from 'react'
import styled from 'styled-components'
import { Flex, Row } from 'native-base'

import { COLORS, Fonts, Icons } from 'theme'
import { PressableOpacity } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { setRoutePlaying } from 'store/slices/appSlice'
import { useI18n } from 'hooks/useI18n'
import { getDistance } from 'geolib'
import { getDistanceInKm, getTimeFromSecs } from './utils'

const RouteInfoBox = ({ currentLocation }) => {
  const dispatch = useDispatch()
  const { t } = useI18n()
  const timeInterval = React.useRef(null)
  const timeElapsed = React.useRef(0)
  const distance = React.useRef(0)
  const previous = React.useRef(null)
  const userLocation = useSelector((state) => state.app.userLocation)
  const routePlaying = useSelector((state) => state.app.routePlaying)

  let previousLocation = previous.current || userLocation
  // newly calculated distance from the new point -- currentLocation
  const newCalcDistance = getDistance(previousLocation, currentLocation)
  // add new distance in the previous distance tally -- acc
  distance.current = distance.current + newCalcDistance
  // SET previous location to the current location
  previous.current = currentLocation
  // console.log('test', newCalcDistance, distance.current)

  const ActionBtn = React.useCallback(() => {
    return (
      <PauseBtn
        backgroundColor={'red.400'}
        onPress={() => dispatch(setRoutePlaying(!routePlaying))}
      >
        {routePlaying ? (
          <Icons.Pause color={COLORS.white} width={15} height={15} />
        ) : (
          <Icons.Play color={COLORS.white} width={15} height={15} />
        )}
      </PauseBtn>
    )
  }, [routePlaying])

  React.useEffect(() => {
    if (routePlaying) {
      // getDistance()

      timeInterval.current = setInterval(() => {
        timeElapsed.current = timeElapsed.current + 1
      }, 1000)
      return
    }

    clearInterval(timeInterval.current)
  }, [routePlaying])

  React.useEffect(() => {
    return () => {
      clearInterval(timeInterval.current)
    }
  }, [])

  const InfoRow = React.useCallback(() => {
    const seconds = timeElapsed.current // in seconds
    const altitude = currentLocation?.altitude

    const columns = [
      { id: 0, title: t('DURATION'), value: `${getTimeFromSecs(seconds)}` },
      { id: 1, title: t('DISTANCE'), value: `${getDistanceInKm(distance.current)} km` },
      { id: 2, title: t('ELEVATION'), value: `${Math.abs(altitude).toFixed(1)} m` },
    ]

    return (
      <Row alignItems={'center'} p={'10px'} justifyContent={'space-around'}>
        {columns.map((c) => (
          <Flex alignItems={'center'} key={c.id}>
            <Fonts.RegularTextLight color={COLORS.dark80}>{c.title}</Fonts.RegularTextLight>
            <Fonts.RegularText>{c.value}</Fonts.RegularText>
          </Flex>
        ))}
      </Row>
    )
  }, [timeElapsed.current])

  return (
    <Container>
      <InfoRow />
      <ActionBtn />
      {routePlaying ? null : (
        <Flex my={'5px'} m={'auto'}>
          <Fonts.SmallText color={COLORS.dark80}>{t('PRESS_TO_START')}</Fonts.SmallText>
        </Flex>
      )}
    </Container>
  )
}

const Container = styled(Flex)`
  height: 150px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${COLORS.white};
  opacity: 0.9;
`

const PauseBtn = styled(PressableOpacity)`
  align-self: center;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`

export default RouteInfoBox
