import React from 'react'

import Content from 'features/Content'
import { useI18n } from 'hooks/useI18n'

import { Flex, Pressable, Row } from 'native-base'
import { Linking } from 'react-native'
import styled from 'styled-components'

import { COLORS, Fonts, Icons } from 'theme'
import { CustomButton, PressableOpacity } from 'components'
import { onShare } from 'utils'
import { useLocation } from 'hooks/useLocation'

const Sos = () => {
  const { t } = useI18n()
  const { userLocation } = useLocation()
  const location = `${userLocation?.latitude},${userLocation?.longitude}`

  const locationUrl = `https://maps.google.com/maps?q=${location}`
  const message = `${t('MY_LOCATION')}\n${t('COORDINATES')}: ${locationUrl}\n\n${t(
    'SENT_FROM'
  )}`

  const content = {
    title: t('SOS'),
    icon: <Icons.Sos width={30} height={30} color={COLORS.white} style={{ margin: 10 }} />,

    contactIcons: [
      {
        id: 0,
        title: `${t('CALL')} 112`,
        value: '112',
        icon: <Icons.Phone width={50} height={50} color={COLORS.white} />,
        onPress: () => Linking.openURL('tel:112'),
      },
      {
        id: 1,
        title: t('SEND_LOCATION'),
        value: '112',
        icon: <Icons.Mail width={50} height={50} color={COLORS.white} />,
        onPress: (message) => onShare(message),
      },
    ],
  }

  return (
    <>
      <Content content={content}>
        <BtnContainer>
          {content.contactIcons.map((c) => (
            <IconContainer
              key={c.id}
              onPress={() => {
                c.onPress(message)
              }}
            >
              <Flex justifyContent={'center'} alignItems={'center'}>
                {c.icon}

                <Flex my={'10px'}>
                  <Fonts.RegularText color={COLORS.white}>{c.title}</Fonts.RegularText>
                </Flex>
              </Flex>
            </IconContainer>
          ))}
        </BtnContainer>

        <Flex mt={'20px'}>
          <CustomButton
            title={`${t('GNR')} (272 330339)`}
            onPress={() => {
              Linking.openURL('tel:272 330339')
            }}
          />
          <CustomButton
            onPress={() => {
              Linking.openURL('tel:272 329935')
            }}
            title={`${t('CIVIL_DEFENSE')} (272 329935)`}
          />
        </Flex>
      </Content>
    </>
  )
}

const BtnContainer = styled(Row)`
  /* background-color: red; */
  justify-content: space-between;
`

const IconContainer = styled(Pressable)`
  background-color: ${COLORS.textAccent};
  width: 45%;
  border-radius: 15px;
  justify-content: center;
  padding: 20px 10px;
`

export default Sos
