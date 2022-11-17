import { Share } from 'react-native'

export const getDifficulty = (distance) => {
  if (distance > 50000) {
    return 'HARD'
  }

  if (distance > 20000) {
    return 'MEDIUM'
  }

  return 'EASY'
}

export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((res, fn) => fn(res), x)

export const onShare = async (message) => {
  console.log('message', message)

  try {
    const result = await Share.share({
      message,
    })
    if (result.action === Share.dismissedAction) return
    if (result.activityType) {
      // shared with activity type of result.activityType
    }
  } catch (error) {
    alert(error.message)
  }
}
