import React from 'react'
import CompassHeading from 'react-native-compass-heading'

export const useCompass = () => {
  const [heading, setHeading] = React.useState(90)

  React.useEffect(() => {
    const degree_update_rate = 3

    try {
      CompassHeading.start(degree_update_rate, ({ heading }) => {
        setHeading(heading)
      })
    } catch (e) {
      console.log('error', e)
    }

    return () => {
      CompassHeading.stop()
    }
  }, [])

  return { heading }
}
