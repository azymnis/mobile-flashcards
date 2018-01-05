import React from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { white, gray } from '../utils/colors'

const MockData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

function DeckItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.cardNumText}>{item.questions.length} cards</Text>
    </TouchableOpacity>
  )
}

export default class DeckList extends React.Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.setState({
      data: Object.values(MockData)
    })
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
      data={this.state.data}
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

