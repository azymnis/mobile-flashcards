import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { white, black, green } from '../utils/colors'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { modifyDeck } from '../actions'

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
    const { deckTitles, navigation, dispatch } = this.props
    const { title } = this.state
    if (title === "") {
      alert("A deck cannot have an empty title")
    } else if (deckTitles.has(title)) {
      alert("A deck with this title already exists")
    } else {
      saveDeckTitle(title)
        .then( deck => dispatch(modifyDeck(title, deck)))
        .then( () => {
          this.setState({title: ""})
          navigation.navigate("DeckList")
        })
    }
  }

  render() {
    return (
      <View style={styles.form}>
        <Text style={styles.textLabel}>What is the title of your new deck?</Text>
        <TextInput
          onChangeText={(title) => this.setState({title})}
          style={styles.textInput}
          value={this.state.title}
        />
        <Button
          onPress={this._onPress}
          title="Create"
          color={green}
          accessibilityLabel="Create a new deck of flash cards"
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

function mapStateToProps(state) {
  return {
    deckTitles: new Set(Object.keys(state.decks))
  }
}

export default connect(
  mapStateToProps,
)(AddDeck)
