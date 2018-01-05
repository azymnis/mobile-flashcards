import React from 'react'
import { StatusBar, View } from 'react-native'
import DeckList from './components/DeckList'
import { Constants } from 'expo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

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
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <CustomStatusBar />
          <DeckList />
        </View>
      </Provider>
    )
  }
}
