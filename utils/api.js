import { AsyncStorage } from 'react-native'

const MOBILE_FLASHCARDS_KEY = "mobile-flashcards:data"

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
  },
  Fubar: {
    title: 'Fubar',
    questions: []
  },
  Fubar2: {
    title: 'Fubar2',
    questions: []
  },
  Fubar3: {
    title: 'Fubar3',
    questions: []
  },
  Fubar4: {
    title: 'Fubar4',
    questions: []
  },
  Fubar5: {
    title: 'Fubar5',
    questions: []
  },
}

/**
 * Return all of the decks along with their titles, questions, and answers.
 */
export function getDecks() {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
    .then(JSON.parse)
}

// export function getDecks() {
//   return Promise.resolve(MockData)
// }

/**
 * Take in a single title argument and return the deck associated with that id.
 */
export function getDeck(title) {
  return getDecks()
    .then(data => {
      return data[title]
    })
}

/**
 * Take in a single title argument and add it to the decks.
 */
export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(MOBILE_FLASHCARDS_KEY, JSON.stringify({
      [title]: {
        title: title,
        questions: []
      }
    }))
    .then(() => getDeck(title))
}

/**
 * Take in two arguments, title and card, and will add the card to
 * the list of questions for the deck with the associated title.
 */
export function addCardToDeck(title, card) {
  return getDecks()
    .then(data => {
      data[title].questions.push(card)
      AsyncStorage.setItem(MOBILE_FLASHCARDS_KEY, JSON.stringify(data))
    })
    .then(() => getDeck(title))
}
