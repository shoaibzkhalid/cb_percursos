import React from 'react'
import Toast, { BaseToast } from 'react-native-toast-message'
import { COLORS } from 'theme'

// Toast customizations
const baseToast = (props, color) => (
  <BaseToast
    {...props}
    text2Style={{ fontSize: 19 }}
    style={{ borderLeftColor: color, paddingBottom: 4, height: 100 }}
    text2NumberOfLines={3}
  />
)

// Toast config
export const toastConfig = {
  success: (props) => baseToast(props, COLORS.primaryBtn),
  error: (props) => baseToast(props, COLORS.red),
}

// Helper function to show toast messages
export const showSuccessToast = (message, subject) => {
  Toast.show({
    type: 'success',
    text1: subject || 'Success',
    text2: message,
  })
}

// Helper function to show error toast
export const showErrorToast = (message) => {
  Toast.show({
    type: 'error',
    text2: message,
  })
}
