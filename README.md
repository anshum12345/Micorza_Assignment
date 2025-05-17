# Memory Card Match Game 🎴

![Game Screenshot](./public/screenshot.png)  
*A fun and interactive memory matching game built with React*

## Table of Contents
- [Live Demo](#live-demo)
- [Features](#features)
- [How to Play](#how-to-play)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Live Demo
[![Live Demo](https://img.shields.io/badge/Play%20Now-Live%20Demo-brightgreen)](https://micorza-assignment-vqcv.vercel.app/)

Try the game now in your browser!

## Features ✨

### Game Modes
- **Normal Mode**: Classic memory matching experience
- **Timed Mode**: Race against a 60-second clock
- **Zen Mode**: Relaxed gameplay with pauses between matches

### Difficulty Levels
- Easy (4×4 grid - 8 pairs)
- Medium (6×6 grid - 18 pairs)
- Hard (8×8 grid - 32 pairs)

### Customization
- Light/Dark theme toggle
- Multiple card back designs
- Sound effects toggle

### Gameplay
- Smooth card flip animations
- Score tracking (attempts, moves, time)
- Best scores saved locally
- Confetti celebration on victory

## How to Play 🎮

### Basic Rules
1. Click on cards to flip them over
2. Find two cards with matching symbols
3. Match all pairs to win the game

### Game Modes Explained
| Mode | Description |
|------|-------------|
| Normal | Classic memory game with timer counting up |
| Timed | Match as many pairs as possible in 60 seconds |
| Zen | Relaxed mode with pauses after matches |

### Controls
- **New Game**: Starts a new game with current settings
- **Difficulty**: Changes grid size (Easy/Medium/Hard)
- **Theme**: Toggles between light and dark mode
- **Card Backs**: Changes card design
- **Sound**: Toggles sound effects on/off

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps
1. Clone the repository:
```bash
git clone https://github.com/anshum12345/Micorza_Assignment.git
```
2. Navigate to project directory:
```bash
cd memory-card-game
```
3. Install dependencies:
```bash
npm install
```

## Running Locally

Start the development server:
```bash
npm run dev
```

The game will open in your default browser at `http://localhost:3000`

## Deployment

### To GitHub Pages
1. Install gh-pages:
```bash
npm install gh-pages --save-dev
```

2. Add to package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
},
"homepage": "https://github.com/anshum12345/Micorza_Assignment.git"
```

3. Run deployment:
```bash
npm run deploy
```

## Technologies Used 🛠️

- **Frontend**: React, styled-components
- **Build Tool**: Vite
- **Animation**: react-confetti
- **Audio**: use-sound
- **Deployment**: GitHub Pages

## Contributing

Contributions are welcome! Here's how:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Enjoy the game!** 🎉  
If you have any questions or suggestions, feel free to open an issue.
