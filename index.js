let deckId
let computerScore = 0
let myScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

async function handleClick() {
    newDeckBtn.disabled = true
    drawCardBtn.disabled = true
    header.textContent = "Shuffling..."
    cardsContainer.children[0].innerHTML = ""
    cardsContainer.children[1].innerHTML = ""
    computerScore = 0
    myScore = 0
    computerScoreEl.textContent = "Computer score: 0"
    myScoreEl.textContent = "My score: 0"

    try {
        const res = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        if (!res.ok) {
            throw Error("Could not get a new deck")
        }
        const data = await res.json()
        remainingText.textContent = `Remaining cards: ${data.remaining}`
        deckId = data.deck_id
        header.textContent = "Game of War"
        drawCardBtn.disabled = false
    } catch (err) {
        header.textContent = "Could not load a new deck"
        remainingText.textContent = "Please try again."
        console.error(err)
    } finally {
        newDeckBtn.disabled = false
    }
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", async () => {
    if (!deckId) {
        header.textContent = "Click New Deck first"
        return
    }

    drawCardBtn.disabled = true
    try {
        const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        if (!res.ok) {
            throw Error("Could not draw cards")
        }
        const data = await res.json()
        remainingText.textContent = `Remaining cards: ${data.remaining}`
        cardsContainer.children[0].innerHTML = `
            <img src="${data.cards[0].image}" class="card" alt="${data.cards[0].value} of ${data.cards[0].suit}" />
        `
        cardsContainer.children[1].innerHTML = `
            <img src="${data.cards[1].image}" class="card" alt="${data.cards[1].value} of ${data.cards[1].suit}" />
        `
        const winnerText = determineCardWinner(data.cards[0], data.cards[1])
        header.textContent = winnerText
        
        if (data.remaining === 0) {
            if (computerScore > myScore) {
                header.textContent = "The computer won the game!"
            } else if (myScore > computerScore) {
                header.textContent = "You won the game!"
            } else {
                header.textContent = "It's a tie game!"
            }
        }
    } catch (err) {
        header.textContent = "Could not draw cards"
        console.error(err)
    } finally {
        if (deckId && remainingText.textContent !== "Remaining cards: 0") {
            drawCardBtn.disabled = false
        }
    }
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = `My score: ${myScore}`
        return "You win!"
    } else {
        return "War!"
    }
}
