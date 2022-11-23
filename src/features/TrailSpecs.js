import React from 'react'
import _ from 'lodash'
import { Flex, Row } from 'native-base'

import { COLORS, Fonts, Icons } from 'theme'
import { useI18n } from 'hooks/useI18n'

const TrailSpecs = ({ item }) => {
  const { t } = useI18n()

  const { properties } = item
  const { distance, duration, difficulty } = properties
  const hours = Math.abs((duration / 60).toFixed(1))
  const maxEl = parseFloat(_.max(item.elevations)).toFixed(1)

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
      value: `${t(difficulty.toUpperCase())}`,
    },

    {
      id: 3,
      icon: <Icons.Elevation color={COLORS.textAccent} />,
      value: `${maxEl} m`,
    },
  ]

  const filterSpecs = _.max(item.elevations) ? specs.slice(0) : specs.slice(0, 3)

  return (
    <Row mt={'10px'} justifyContent={'space-between'} mx={'5px'}>
      {filterSpecs.map(({ icon, value, id }) => (
        <Row key={id} alignItems={'center'}>
          <Flex mr={'5px'}>
            <Fonts.SmallText>{value}</Fonts.SmallText>
          </Flex>
          {icon}
        </Row>
      ))}
    </Row>
  )
}

export default TrailSpecs
