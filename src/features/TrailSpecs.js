import React from 'react'
import _ from 'lodash'
import { Flex, Row } from 'native-base'

import { Fonts } from 'theme'
import { useTrailActions } from 'hooks'

const TrailSpecs = ({ item }) => {
  const { getTrailSpecs } = useTrailActions()
  const specs = getTrailSpecs(item)

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
