import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { white, green, black } from '../utils/colors'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api'
import { modifyDeck } from '../actions'

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
        })

    }
  }

  render() {
    return (
      <View style={styles.form}>
        <Text style={styles.textLabel}>What is the question?</Text>
        <TextInput
          onChangeText={(question) => this.setState({question})}
          style={styles.textInput}
          value={this.state.question}
        />
        <Text style={styles.textLabel}>What is the answer?</Text>
        <TextInput
          onChangeText={(answer) => this.setState({answer})}
          style={styles.textInput}
          value={this.state.answer}
        />
        <Button
          onPress={this._submit}
          title="Add Card"
          color={green}
          accessibilityLabel="Add a card to an existing deck"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 20,
    padding: 10,
    borderColor: black,
    borderWidth: 1,
  },
})

export default connect()(AddCard)
