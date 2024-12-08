const suits = ['hearts', 'diamonds', 'clubs', 'spades']
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

function createDeck() {
    const deck = []

    for (const suit in suits){
        for (const rank in ranks){
            deck.push({suit: suits[suit], rank: ranks[rank]})
        }
    }

    return shuffle(deck)
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1)); 
        [deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]]; 
    }
    return deck;
}

export default createDeck