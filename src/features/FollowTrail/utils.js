export const getTimeFromSecs = (seconds) => {
  const zeroPad = (num) => String(num).padStart(2, '0')

  const h = zeroPad(Math.floor((seconds % (3600 * 24)) / 3600))
  const m = zeroPad(Math.floor((seconds % 3600) / 60))
  const s = zeroPad(Math.floor(seconds % 60))

  return seconds < 60 ? `${seconds} sec` : `${h}:${m}:${s}`
}

export const getDistanceInKm = (distance) => {
  return Math.abs(distance / 1000).toFixed(2)
}
