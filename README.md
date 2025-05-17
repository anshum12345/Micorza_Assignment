# Memory Card Match Game 🎴

A modern and interactive memory matching game built with React. Choose from various game modes and difficulty levels, enjoy smooth animations and sound effects, and track your best scores — all in a sleek, responsive interface.

---

## Table of Contents

* [Live Demo](#live-demo)
* [Features](#features)
* [How to Play](#how-to-play)
* [Installation](#installation)
* [Running Locally](#running-locally)
* [Deployment](#deployment)
* [Technologies Used](#technologies-used)
* [Contributing](#contributing)
* [License](#license)

---

## Live Demo

[![Live Demo](https://img.shields.io/badge/Play%20Now-Live%20Demo-brightgreen)](https://micorza-assignment-vqcv.vercel.app/)

👉 Try the game in your browser — no installation required!

---

## Features ✨

### 🕹 Game Modes

* **Normal Mode** – Classic memory matching gameplay with a timer.
* **Timed Mode** – Match as many pairs as possible within 60 seconds.
* **Zen Mode** – Calming gameplay with a pause after every match.

### 🎯 Difficulty Levels

* **Easy** – 4×4 grid (8 pairs)
* **Medium** – 6×6 grid (18 pairs)
* **Hard** – 8×8 grid (32 pairs)

### 🎨 Customization Options

* Light / Dark theme toggle
* Multiple card back designs
* Toggle sound effects on/off

### 🧠 Gameplay Highlights

* Smooth flip animations
* Score tracking: attempts, moves, and time
* Best scores saved locally
* Confetti celebration upon winning

---

## How to Play 🎮

### Basic Rules

1. Click any card to flip it over.
2. Find another card with the same symbol.
3. Match all pairs to complete the game.

### Game Modes Overview

| Mode   | Description                                     |
| ------ | ----------------------------------------------- |
| Normal | Timer counts up — match all pairs to finish.    |
| Timed  | 60-second challenge — match as many as you can. |
| Zen    | Relaxed mode with pauses between matches.       |

### Controls

* **New Game** – Start a fresh round
* **Difficulty** – Select grid size (Easy / Medium / Hard)
* **Theme** – Toggle light/dark mode
* **Card Backs** – Change card design
* **Sound** – Enable/disable sound effects

---

## Installation

### Prerequisites

* Node.js v14+
* npm v6+

### Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/anshum12345/Micorza_Assignment.git

# 2. Navigate to the project directory
cd memory-card-game

# 3. Install dependencies
npm install
```

---

## Running Locally

To start the development server:

```bash
npm run dev
```

Then open your browser and visit:
`http://localhost:3000`

---

## Deployment

### Deploying to GitHub Pages

1. Install the deployment package:

```bash
npm install gh-pages --save-dev
```

2. Add the following to `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
},
"homepage": "https://your-github-username.github.io/repository-name"
```

3. Deploy the app:

```bash
npm run deploy
```

---

## Technologies Used 🛠️

* **Framework**: React
* **Styling**: styled-components
* **Build Tool**: Vite
* **Animation**: react-confetti
* **Audio**: use-sound
* **Hosting**: GitHub Pages / Vercel

---

## Contributing

Contributions are warmly welcomed! To contribute:

1. Fork this repository
2. Create a new feature branch:
   `git checkout -b feature/YourFeatureName`
3. Commit your changes:
   `git commit -m "Add: Your feature description"`
4. Push to your branch:
   `git push origin feature/YourFeatureName`
5. Open a Pull Request for review

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

**Have fun matching!** 🎉

