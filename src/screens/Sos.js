import React from 'react'

import Content from 'features/Content'
import { useI18n } from 'hooks/useI18n'

import { Flex, Row } from 'native-base'
import { Linking } from 'react-native'
import styled from 'styled-components'

import { COLORS, Fonts, Icons } from 'theme'
import { PressableOpacity } from 'components'

const Sos = () => {
  const { t } = useI18n()

  const content = {
    title: t('SOS'),
    icon: <Icons.Sos width={30} height={30} color={COLORS.white} style={{ margin: 10 }} />,
  }

  return (
    <>
      <Content content={content}>
        <PressableOpacity
          onPress={() => {
            Linking.openURL('tel:112')
          }}
        >
          <Row alignItems={'center'} my={'30px'}>
            <Icons.Phone
              style={{ marginRight: 10 }}
              width={30}
              height={30}
              color={COLORS.textAccent}
            />
            <Fonts.RegularText color={COLORS.dark80}>SOS Emergência 112</Fonts.RegularText>
          </Row>
        </PressableOpacity>

        <PressableOpacity
          onPress={() => {
            Linking.openURL('mailto:camara@cm-castelobranco.pt')
          }}
        >
          <Row alignItems={'center'}>
            <Icons.Mail
              style={{ marginRight: 10 }}
              width={30}
              height={30}
              color={COLORS.textAccent}
            />
            <Fonts.RegularText color={COLORS.dark80}>
              camara@cm-castelobranco.pt
            </Fonts.RegularText>
          </Row>
        </PressableOpacity>
      </Content>
    </>
  )
}

export default Sos
