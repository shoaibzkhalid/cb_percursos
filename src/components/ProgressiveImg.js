import React from 'react'
import styled from 'styled-components'
import { Flex, Image } from 'native-base'

import { COLORS } from 'theme'

const ProgressiveImg = (props) => {
  const [loading, setLoading] = React.useState(true)

  return (
    <>
      <Image {...props} onLoadEnd={() => setLoading(false)} alt={'image'} />
      {loading && <LoadingBg />}
    </>
  )
}

const LoadingBg = styled(Flex)`
  width: 45px;
  height: 45px;
  border-radius: 50px;
  background-color: ${COLORS.grey};
  position: absolute;
`

export default ProgressiveImg
