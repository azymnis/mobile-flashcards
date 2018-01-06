import React from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { white, gray } from '../utils/colors'
import { connect } from 'react-redux'
import { getDecks, deleteDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { AppLoading} from 'expo'

function DeckItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.cardNumText}>{item.questions.length} cards</Text>
    </TouchableOpacity>
  )
}

class DeckList extends React.Component {
  static navigationOptions = () => {
    return {
      title: "Deck List"
    }
  }

  state = {
    ready: false,
  }

  componentDidMount() {
    const { dispatch } = this.props
    getDecks()
      .then( decks => dispatch(receiveDecks(decks)) )
      .then(() => this.setState({ready: true}))
  }

  _onPress = (title) => {
    this.props.navigation.navigate(
      'DeckDetail',
      { title }
    )
  }

  _renderItem = (el) => {
    return (<DeckItem item={el.item} onPress={() => this._onPress(el.item.title)} />)
  }

  _keyExtractor(el) {
    return el.title
  }

  render() {
    const { ready } = this.state
    if (ready === false) {
      return <AppLoading />
    }

    return (
      this.props.decks.length == 0 ?
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>There are no decks to show!</Text>
        <Text style={styles.emptyText}>Please create a new one.</Text>
      </View>  :
      <FlatList
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
  emptyContainer: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 20,
    fontSize: 28,
  },
  cardNumText: {
    padding: 10,
    textAlign: 'center',
    color: gray,
    fontSize: 20,
  },
  listItem: {
    minHeight: 150,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'black'
  }
})

function mapStateToProps(state) {
  return {
    decks: Object.values(state.decks)
  }
}

export default connect(
  mapStateToProps,
)(DeckList)
