import { AsyncStorage } from 'react-native'

const MOBILE_FLASHCARDS_KEY = "mobile-flashcards:data"

/**
 * Return all of the decks along with their titles, questions, and answers.
 */
export function getDecks() {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
    .then(JSON.parse)
}

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
}
