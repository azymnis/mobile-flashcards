import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { white, gray, green, blue } from '../utils/colors'
import { connect } from 'react-redux'

class DeckDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title
    }
  }

  _onPressAddCard = () => {
    this.props.navigation.navigate(
      'AddCard',
      { title: this.props.title }
    )
  }

  _onPressStartQuiz = () => {
    this.props.navigation.navigate(
      'QuizView',
      { title: this.props.title }
    )
  }

  render() {
    const { deck, title } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.cardNumText}>{deck.questions.length} cards</Text>
        </View>
        <Button
          onPress={this._onPressAddCard}
          title="Add Card"
          color={green}
          accessibilityLabel="Add a card to an existing deck"
        />
        <View style={{height: 20}}/>
        {deck.questions.length > 0 && ( <Button
          onPress={this._onPressStartQuiz}
          title="Start Quiz"
          color={blue}
          accessibilityLabel="Start a quiz for a given deck of cards"
        />)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textBox: {
    height: 300,
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    fontSize: 28,
  },
  cardNumText: {
    padding: 10,
    textAlign: 'center',
    color: gray,
    fontSize: 20,
  },
})

function mapStateToProps (state, { navigation }) {
  const { title } = navigation.state.params

  return {
    title,
    deck: state.decks[title],
  }
}

export default connect(mapStateToProps)(DeckDetail)
