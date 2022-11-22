import React from 'react'

import Content from 'features/Content'
import { useI18n } from 'hooks/useI18n'

import { Flex, Pressable, Row } from 'native-base'
import { useSelector } from 'react-redux'
import { Linking } from 'react-native'
import styled from 'styled-components'

import { COLORS, Fonts, Icons } from 'theme'
import { CustomButton } from 'components'
import { onShare } from 'utils'

const Sos = () => {
  const { t } = useI18n()
  const userLocation = useSelector((state) => state.app.userLocation)

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
        icon: <Icons.Phone width={25} height={25} color={COLORS.primary} />,
        onPress: () => Linking.openURL('tel:112'),
      },
      {
        id: 1,
        title: t('SEND_LOCATION'),
        value: '112',
        icon: <Icons.Mail width={25} height={25} color={COLORS.primary} />,
        onPress: (message) => onShare(message),
      },
    ],
  }

  return (
    <>
      <Content content={content} bg={COLORS.brand}>
        {/* <BtnContainer>
          {content.contactIcons.map((c) => (
            <IconContainer key={c.id} onPress={() => c.onPress(message)}>
              <Flex justifyContent={'center'} alignItems={'center'}>
                {c.icon}

                <Flex my={'10px'}>
                  <Fonts.RegularText color={COLORS.white}>{c.title}</Fonts.RegularText>
                </Flex>
              </Flex>
            </IconContainer>
          ))}
        </BtnContainer> */}

        <Flex mt={'20px'}>
          <Flex mb={'10px'}>
            <Fonts.RegularText color={COLORS.white}>{t('EMERGENCY_TXT')}</Fonts.RegularText>
          </Flex>
          {content.contactIcons.map((c) => (
            <CustomButton type={'secondary'} key={c.id} onPress={() => c.onPress(message)}>
              <Row justifyContent={'center'} alignItems={'center'}>
                <Flex mr={'10px'}>{c.icon}</Flex>
                <Fonts.RegularText color={COLORS.primary}>{c.title}</Fonts.RegularText>
              </Row>
            </CustomButton>
          ))}

          <Flex my={'10px'}>
            <Fonts.RegularText color={COLORS.white}>{t('OTHER_CONTACTS')}</Fonts.RegularText>
          </Flex>

          <CustomButton
            title={`${t('GNR')} (272 330339)`}
            onPress={() => Linking.openURL('tel:272 330339')}
            type={'secondary'}
          />
          <CustomButton
            type={'secondary'}
            onPress={() => Linking.openURL('tel:272 329935')}
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
