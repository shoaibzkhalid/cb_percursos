import React from 'react'
import { Flex, Row } from 'native-base'

import { COLORS, Fonts, Icons } from 'theme'
import { getDifficulty } from 'utils'
import { useI18n } from 'hooks/useI18n'

const TrailSpecs = ({ properties, ml = '0px' }) => {
  const { t } = useI18n()

  const { distance, duration } = properties
  const hours = Math.abs((duration / 60).toFixed(1))

  const specs = [
    {
      id: 0,
      icon: <Icons.Compass color={COLORS.textAccent} />,
      value: `${(distance / 1000).toLocaleString('pt-PT')} km`,
    },
    {
      id: 1,
      icon: <Icons.Hourglass color={COLORS.textAccent} />,
      value: `${hours.toLocaleString('pt-PT')} hr`,
    },
    {
      id: 2,
      icon: <Icons.Balance color={COLORS.textAccent} />,
      value: `${t(getDifficulty(distance))}`,
    },
  ]

  return (
    <Row mt={'10px'}>
      {specs.map(({ icon, value, id }) => (
        <Row key={id} alignItems={'center'} mx={'10px'} ml={ml}>
          <Flex mr={'5px'}>
            <Fonts.RegularText>{value}</Fonts.RegularText>
          </Flex>
          {icon}
        </Row>
      ))}
    </Row>
  )
}

export default TrailSpecs
