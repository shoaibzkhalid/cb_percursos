import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'native-base'
import { getTrails } from 'store/trails'

const Dashboard = () => {
  const trails = getTrails()

  return (
    <View>
      <Text>Dashboard</Text>
      {/* <FlatList data={null} /> */}
    </View>
  )
}

export default Dashboard
