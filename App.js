import React from 'react'
import { StatusBar, View } from 'react-native'
import DeckList from './components/DeckList'
import { Constants } from 'expo'

function CustomStatusBar() {
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CustomStatusBar />
        <DeckList />
      </View>
    )
  }
}
