import React from 'react'
import { Keyboard, StyleSheet, Text, KeyboardAvoidingView, TextInput, Button } from 'react-native'
import { white, black, green } from '../utils/colors'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { modifyDeck } from '../actions'
import TextInputWithLabel from './TextInputWithLabel'
import { NavigationActions } from 'react-navigation'

class AddDeck extends React.Component {
  static navigationOptions = () => {
    return {
      title: "Add New Deck"
    }
  }

  state = {
    title: ""
  }

  _onPress = () => {
    const { deckTitles, navigation, modifyDeck } = this.props
    const { title } = this.state
    if (title === "") {
      Keyboard.dismiss()
      alert("A deck cannot have an empty title")
    } else if (deckTitles.has(title)) {
      Keyboard.dismiss()
      alert("A deck with this title already exists")
    } else {
      saveDeckTitle(title)
        .then( deck => modifyDeck(title, deck))
        .then( () => {
          this.setState({title: ""})

          // Simulate navigation as if new deck submission happened from Home
          const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({ routeName: 'Home'}),
              NavigationActions.navigate({ routeName: 'DeckDetail', params: { title }})
            ]
          })
          navigation.dispatch(resetAction)

          Keyboard.dismiss()
        })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.form} behavior="padding">
        <TextInputWithLabel
          labelText="What is the title of your new deck?"
          value={this.state.title}
          onChangeText={(title) => this.setState({title})}
        />
        <Button
          onPress={this._onPress}
          title="Create"
          color={green}
          accessibilityLabel="Create a new deck of flash cards"
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

function mapStateToProps(state) {
  return {
    deckTitles: new Set(Object.keys(state.decks))
  }
}

export default connect(
  mapStateToProps,
  { modifyDeck }
)(AddDeck)
