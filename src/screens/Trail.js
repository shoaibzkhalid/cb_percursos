import React from 'react'

import { Flex, Image, Row, ScrollView } from 'native-base'
import { BackButton } from 'components'
import { COLORS, Fonts } from 'theme'

import { useI18n } from 'hooks/useI18n'
import { useRoute } from '@react-navigation/native'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import TrailSpecs from 'features/TrailSpecs'
import TrailMap from 'features/TrailMap'

const Trail = () => {
  const lang = useSelector((state) => state.app.lang)

  const { t } = useI18n()
  const route = useRoute()
  const item = route.params.item

  const { properties } = item

  const trailImage = route.params.trailImage
  const desc = item.description[lang]

  return (
    <>
      <Row alignItems={'center'} m={'10px'}>
        <BackButton />
        <Fonts.RegularText color={COLORS.white}>{t('TRAIL')}</Fonts.RegularText>
      </Row>

      <ScrollView
        background={COLORS.screenBg}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Image source={trailImage} h={'250px'} alt={'trail'} />

        <CustomCard>
          <Flex mb={'20px'}>
            <TrailSpecs properties={properties} />
          </Flex>
          <Fonts.RegularTextLight color={COLORS.dark80}>{desc}</Fonts.RegularTextLight>
        </CustomCard>

        <TrailMap trail={item} />
      </ScrollView>
    </>
  )
}

const CustomCard = styled(Flex)`
  background-color: ${COLORS.white};
  border-radius: 20px;
  min-width: 200px;

  margin: 10px 10px;

  padding: 20px;
`

export default Trail
