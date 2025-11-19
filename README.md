# 🃏 War Card Game — JavaScript & Deck of Cards API

A fun, browser-based **War card game** built with **vanilla JavaScript** and powered by the [Deck of Cards API](https://deckofcardsapi.com/).
Each round, both you and the computer draw a card — the higher value wins the round. The game continues until the deck is empty!

---

## 🎯 Overview

This project demonstrates the use of **fetch API**, **DOM manipulation**, and **game logic** in JavaScript.
It’s a beginner-friendly example of how to work with APIs and update the UI dynamically based on user interactions and real-time data.

---

## 🚀 Features

✅ Fetches a **new shuffled deck** from the Deck of Cards API.
✅ Draws **two cards per round** — one for the player and one for the computer.
✅ Automatically **tracks and displays scores**.
✅ Declares the **final winner** once the deck runs out of cards.
✅ Dynamically **updates the DOM** to show cards, remaining count, and messages.
✅ Includes **“War!”** state for tied cards.

---

## 🧩 How It Works

### 1️⃣ Get a New Deck

When the player clicks **“New Deck”**, the app fetches a fresh, shuffled deck and stores the deck ID:

```javascript
fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
```

### 2️⃣ Draw Two Cards

Each click of **“Draw Cards”** draws two cards from the current deck:

```javascript
fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
```

One card goes to the computer, one to the player — both displayed visually.

### 3️⃣ Determine the Winner

Card values are compared using a predefined ranking array:

```javascript
const valueOptions = ["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"];
```

* Higher index value → winner.
* Scores update dynamically.
* Ties result in **“War!”** being displayed.

### 4️⃣ End of Game

When no cards remain, the draw button disables and the app displays:

* 🏆 “You won the game!”
* 💻 “The computer won the game!”
* ⚖️ “It’s a tie game!”

---

## 💻 Code Highlights

```javascript
if (data.remaining === 0) {
    drawCardBtn.disabled = true
    if (computerScore > myScore) {
        header.textContent = "The computer won the game!"
    } else if (myScore > computerScore) {
        header.textContent = "You won the game!"
    } else {
        header.textContent = "It's a tie game!"
    }
}
```

---

## 🛠️ Technologies Used

* **HTML5** — structure
* **CSS3** — styling (customizable UI)
* **JavaScript (ES6)** — logic, fetch requests, DOM manipulation
* **Deck of Cards API** — data source

---

## 🕹️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/war-card-game.git
cd war-card-game
```

### 2. Open in your browser

Simply open `index.html` in your preferred browser — no build tools required.

---

## 💡 Future Improvements

* Add **card flip animations**
* Display **round history**
* Add **sound effects** for wins/ties
* Implement **multiplayer** or **AI difficulty modes**

---

## 👩‍💻 Author

**Ibi-ilate Braide**
📧 ibi-ilatebraide@outlook.com
🌐 https://github.com/ibraide

