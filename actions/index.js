export const RECEIVE_DECKS = "RECEIVE_DECKS"
export const MODIFY_DECK  = "MODIFY_DECK"

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function modifyDeck(title, deck) {
  return {
    type: MODIFY_DECK,
    title,
    deck,
  }
}
