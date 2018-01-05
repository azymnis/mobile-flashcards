import React from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { white, gray } from '../utils/colors'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'

function DeckItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.cardNumText}>{item.questions.length} cards</Text>
    </TouchableOpacity>
  )
}

class DeckList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    getDecks()
      .then( decks => dispatch(receiveDecks(decks)) )
  }

  _onPress = () => {
    console.log("pressed")
  }

  _renderItem = (el) => {
    return (<DeckItem item={el.item} onPress={this._onPress} />)
  }

  _keyExtractor(el) {
    return el.title
  }

  render() {
    return (<FlatList
      contentContainerStyle={styles.container}
      data={this.props.decks}
      renderItem={this._renderItem}
      keyExtractor={this._keyExtractor}
    />)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
  },
  cardNumText: {
    padding: 10,
    textAlign: 'center',
    color: gray,
    fontSize: 20,
  },
  listItem: {
    height: 150,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'black'
  }
})

function mapStateToProps (state) {
  return {
    decks: Object.values(state.decks)
  }
}

export default connect(
  mapStateToProps,
)(DeckList)

