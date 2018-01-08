import React from 'react'
import { Platform, StatusBar, View } from 'react-native'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import DeckDetail from './components/DeckDetail'
import QuizView from './components/QuizView'
import { Constants } from 'expo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'
import { setLocalNotification } from './utils/notifications'

function CustomStatusBar() {
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome color={tintColor} name='stack-overflow' size={30} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome color={tintColor} name='plus-square' size={30} />
    },
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail
  },
  AddCard: {
    screen: AddCard
  },
  QuizView: {
    screen: QuizView
  }
})

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          { Platform.OS !== 'ios' && (<CustomStatusBar />) }
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
