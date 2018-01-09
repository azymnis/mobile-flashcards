import React from 'react'
import { Keyboard, StyleSheet, Text, TextInput, KeyboardAvoidingView, Button } from 'react-native'
import { white, green, black } from '../utils/colors'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api'
import { modifyDeck } from '../actions'
import TextInputWithLabel from './TextInputWithLabel'

class AddCard extends React.Component {
  static navigationOptions = () => {
    return {
      title: "Add Card"
    }
  }

  state = {
    question: "",
    answer: ""
  }

  _submit = () => {
    const { dispatch, navigation } = this.props
    const { title } = navigation.state.params
    const { question, answer } = this.state
    if (question === "" || answer === "") {
      Keyboard.dismiss()
      alert("Question and answer cannot be empty")
    } else {
      const card = { question, answer }
      addCardToDeck(title, card)
        .then( deck =>
          dispatch(modifyDeck(title, deck))
        )
        .then( () => {
          this.setState({question: "", answer: ""})
          navigation.goBack()
          Keyboard.dismiss()
        })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.form} behavior="padding">
        <TextInputWithLabel
          labelText="What is the question?"
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />
        <TextInputWithLabel
          labelText="What is the answer?"
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
        <Button
          onPress={this._submit}
          title="Add Card"
          color={green}
          accessibilityLabel="Add a card to an existing deck"
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})

export default connect()(AddCard)
