import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { white, red, green, blue, gray } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'

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
    const {index, correct} = this.state
    this.setState({
      index: index + 1,
      correct: (isCorrect ? correct + 1 : correct),
      showAnswer: false
    })
  }

  _toggleShowAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer })
  }

  _restartQuiz = () => {
    this.setState({
      index: 0,
      correct: 0,
      showAnswer: false
    })
  }

  _goBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  componentWillUpdate(nextProps, nextState) {
    const { deck } = nextProps
    const { index } = nextState
    const totalQuestions = deck.questions.length

    // If this is the last index then reset the notification
    if (index === totalQuestions) {
      clearLocalNotification()
        .then(setLocalNotification)
    }
  }

  congratsView(totalQuestions, correct) {
    return (
      <View style={styles.container}>
        <Text style={styles.finalText}>
        { totalQuestions === correct ?
          `Congratulations! You answered all ${totalQuestions} questions correctly! 🎉🎉🎉` :
          `You guessed ${correct} out of ${totalQuestions} questions correctly`
        }
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._goBack}
            title="Go Back"
            color={blue}
            accessibilityLabel="Go back to deck detail view"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._restartQuiz}
            title="Restart Quiz"
            color={blue}
            accessibilityLabel="Run through the same quiz again"
          />
        </View>
      </View>
    )
  }

  render() {
    const { deck } = this.props
    const { index, correct, showAnswer } = this.state
    const totalQuestions = deck.questions.length

    if (index === totalQuestions) {
      return this.congratsView(totalQuestions, correct)
    }

    const { question, answer } = deck.questions[index]

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.indexCounter}>Question {index + 1} / {totalQuestions}</Text>
          <Text style={styles.questionText}>{showAnswer ? answer : question}</Text>
          <TouchableOpacity onPress={this._toggleShowAnswer}>
            <Text style={styles.answerToggle}>{showAnswer ? "QUESTION" : "ANSWER"}</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => this._submitAnwer(true)}
              title="Correct"
              color={green}
              accessibilityLabel="Answer is correct"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => this._submitAnwer(false)}
              title="Incorrect"
              color={red}
              accessibilityLabel="Answer is Incorrect"
            />
          </View>
        </ScrollView>
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
  indexCounter: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    color: gray,
  },
  questionText: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    paddingTop: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  answerToggle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: blue,
    paddingTop: 15,
    paddingBottom: 30,
  },
  buttonContainer: {
    padding: 5,
  },
  finalText: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    margin: 40,
  },
})

function mapStateToProps (state, { navigation }) {
  const { title } = navigation.state.params

  return {
    title,
    deck: state.decks[title],
  }
}

export default connect(mapStateToProps)(QuizView)
