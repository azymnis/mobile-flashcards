import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button } from 'react-native'
import { white, red, green, blue } from '../utils/colors'

class QuizView extends React.Component {
  static navigationOptions = () => {
    return {
      title: "Quiz"
    }
  }

  state = {
    index: 0,
    correct: 0,
    showAnswer: false
  }

  _submitAnwer = (isCorrect) => {

  }

  _toggleShowAnswer = () => {
    this.setState( state => {showAnswer: !state.showAnswer } )
  }

  render() {
    return (
      <View><Text>Quiz for {this.props.title}</Text></View>
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

export default connect(mapStateToProps)(QuizView)
