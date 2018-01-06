import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { white } from '../utils/colors'
import { connect } from 'react-redux'

class DeckDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title
    }
  }

  render() {
    return (
      <View><Text>{this.props.deck.title}</Text></View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const { title } = navigation.state.params

  return {
    title,
    deck: state.decks[title],
  }
}

export default connect(mapStateToProps)(DeckDetail)
