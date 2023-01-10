import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { getDistance } from 'geolib'
import { Flex, Row } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'

import { COLORS, Fonts, Icons } from 'theme'
import { PressableOpacity } from 'components'
import { setRoutePlaying } from 'store/slices/appSlice'
import { useI18n } from 'hooks'
import { getDistanceInKm, getTimeFromSecs } from './utils'

const RouteInfoBox = ({ currentLocation }) => {
  const dispatch = useDispatch()
  const { t } = useI18n()
  const distance = React.useRef(0)
  const previous = React.useRef(null)

  const accSec = React.useRef(null)
  const userLocation = useSelector((state) => state.app.userLocation)
  const routePlaying = useSelector((state) => state.app.routePlaying)

  const [initTime, setInitTime] = React.useState(null)
  // const initTime = React.useRef(null)
  let previousLocation = previous.current || userLocation
  // newly calculated distance from the new point -- currentLocation
  const newCalcDistance = getDistance(previousLocation, currentLocation)
  // add new distance in the previous distance tally -- acc
  distance.current = distance.current + newCalcDistance
  // SET previous location to the current location
  previous.current = currentLocation
  const [dt, setDt] = React.useState(new Date().toISOString())

  React.useEffect(() => {
    let secTimer
    if (routePlaying) {
      secTimer = setInterval(() => {
        setDt(new Date().toISOString())
      }, 1000)
    }

    if (routePlaying === false) {
      clearInterval(secTimer)
    }

    return () => clearInterval(secTimer)
  }, [routePlaying])

  const seconds = initTime ? dayjs(dt).diff(initTime, 'seconds') : 0 // in seconds
  const accSeconds = accSec.current

  const altitude = currentLocation?.altitude

  const columns = [
    {
      id: 0,
      title: t('DURATION'),
      value: `${getTimeFromSecs(seconds < 0 ? 0 + accSeconds : seconds + accSeconds)}`,
      icon: <Icons.Hourglass color={COLORS.textAccent} />,
    },
    {
      id: 1,
      title: t('DISTANCE'),
      value: `${getDistanceInKm(distance.current)} km`,

      icon: <Icons.Compass color={COLORS.textAccent} />,
    },
    {
      id: 2,
      title: t('ELEVATION'),
      value: `${Math.abs(altitude).toFixed(1)} m`,
      icon: <Icons.Elevation color={COLORS.textAccent} />,
    },
  ]

  return (
    <Container>
      <Row alignItems={'center'} p={'10px'} justifyContent={'space-around'}>
        {columns.map((c) => (
          <Row alignItems={'center'} key={c.id}>
            <Flex mr={'6px'}>{c.icon}</Flex>
            <Flex alignItems={'center'}>
              <Fonts.SmallTextLight color={COLORS.dark80}>{c.title}</Fonts.SmallTextLight>
              <Fonts.MediumPlus>{c.value}</Fonts.MediumPlus>
            </Flex>
          </Row>
        ))}
      </Row>

      <PauseBtn
        backgroundColor={'red.400'}
        onPress={() => {
          dispatch(setRoutePlaying(!routePlaying))

          if (!routePlaying && !initTime) {
            return setInitTime(new Date().toISOString())
          }

          accSec.current = accSeconds + seconds
          setInitTime(null)
        }}
      >
        {routePlaying ? (
          <Icons.Pause color={COLORS.white} width={15} height={15} />
        ) : (
          <Icons.Play color={COLORS.white} width={15} height={15} />
        )}
      </PauseBtn>
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
