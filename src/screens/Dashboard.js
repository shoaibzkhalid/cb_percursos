import { View, Text } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { Flex } from 'native-base'
import { BackButton } from 'components'

const Dashboard = () => {
  return (
    <View>
      <BackButton />
      <Flex background={'red.100'} height={'200px'}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </Flex>
    </View>
  )
}

export default Dashboard
