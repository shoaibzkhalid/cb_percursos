import React from 'react'
import Toast, { BaseToast } from 'react-native-toast-message'
import { COLORS } from 'theme'

// Toast customizations
const baseToast = (props, color) => (
  <BaseToast
    {...props}
    text1Style={{ fontSize: 15, color, paddingVertical: 10 }}
    text2Style={{ fontSize: 19 }}
    style={{ borderLeftColor: color, paddingBottom: 10, height: 100 }}
    text1NumberOfLines={1}
    text2NumberOfLines={2}
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
    text1: 'Error',
    text2: message,
  })
}
