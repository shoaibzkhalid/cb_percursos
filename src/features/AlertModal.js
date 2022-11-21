import { CustomButton } from 'components'
import { useI18n } from 'hooks/useI18n'
import React from 'react'
import { COLORS, Fonts, Icons } from 'theme'

const { Center, AlertDialog, Button } = require('native-base')

const AlertModal = ({ isOpen, onClose, onPress }) => {
  const { t } = useI18n()
  const cancelRef = React.useRef(null)

  return (
    <Center>
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content style={{ borderRadius: 15 }} background={'red.100'}>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{t('ALERT_TITLE')}</AlertDialog.Header>
          <AlertDialog.Body>{t('ALERT_MSG')}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <CustomButton title={'Cancel'} type={'secondary'} onPress={onClose} />
              <CustomButton onPress={onPress}>
                <Icons.Directions color={COLORS.white} style={{ margin: 10 }} />
                <Fonts.RegularText color={COLORS.white}>Go to Map</Fonts.RegularText>
              </CustomButton>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  )
}

export default AlertModal
