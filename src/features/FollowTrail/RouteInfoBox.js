import React from 'react'
import styled from 'styled-components'
import { Flex, Row } from 'native-base'

import { COLORS, Fonts } from 'theme'
import { PressableOpacity } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { setRoutePlaying } from 'store/slices/appSlice'

const RouteInfoBox = ({ routeDetails, altitude }) => {
  const dispatch = useDispatch()
  // console.log('TEST', routeDetails)
  const routePlaying = useSelector((state) => state.app.routePlaying)

  const { distance, duration } = routeDetails
  const columns = [
    { id: 0, title: 'Time', value: `${Math.abs(duration.toFixed(1))} min` },
    { id: 1, title: 'Distance', value: `${Math.abs(distance.toFixed(2))} km` },
    { id: 2, title: 'Elevation', value: `${Math.abs(altitude).toFixed(1)} m` },
  ]

  const ActionBtn = React.useCallback(() => {
    return (
      <PauseBtn
        backgroundColor={'red.400'}
        onPress={() => {
          dispatch(setRoutePlaying(!routePlaying))
          // navigate('TrailMapFull')
        }}
      >
        <Fonts.RegularText color={COLORS.white}>
          {routePlaying ? 'Pause' : 'Play'}
        </Fonts.RegularText>
      </PauseBtn>
    )
  }, [routePlaying])

  return (
    <Container>
      <Row alignItems={'center'} p={'20px'} justifyContent={'space-around'}>
        {columns.map((c) => (
          <Flex alignItems={'center'} key={c.id}>
            <Fonts.RegularTextLight color={COLORS.dark80}>{c.title}</Fonts.RegularTextLight>
            <Fonts.RegularText>{c.value}</Fonts.RegularText>
          </Flex>
        ))}
      </Row>

      <ActionBtn />
    </Container>
  )
}

const Container = styled(Flex)`
  height: 200px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${COLORS.white};
  opacity: 0.9;
  /* ...Styles.dropShadowLight, */
`

const PauseBtn = styled(PressableOpacity)`
  align-self: center;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`

export default RouteInfoBox
