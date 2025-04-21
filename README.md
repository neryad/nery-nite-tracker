# 🎮 NeryNite Tracker

![NeryNite Tracker](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2RzZXU0bGlrZ3Q5ZzM1Z2k4eDJweGN2bGFzMTk3a3YzZGVja2xrcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uFLjWRH3WsWM7eTfxZ/giphy.gif)

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-id/deploy-status)](https://nerynite.netlify.app/)

## 📊 About NeryNite Tracker

NeryNite Tracker is a retro-styled web application that allows you to check player statistics for Fortnite. With its pixel-perfect UI, it provides a nostalgic yet functional experience for tracking game stats.

**[Try it now! →](https://nerynite.netlify.app/)**

## ✨ Features

- 🔍 **Player Search**: Look up any Fortnite player by username
- 📈 **Comprehensive Stats**: View key performance metrics including:
  - Wins and win rate percentage
  - K/D ratio (kills/deaths)
  - Total matches played
  - Top placements (Top 3, Top 10, Top 25)
  - Total score and score per match
  - Device-specific performance stats
- 🎯 **Battle Pass Progress**: Check current Battle Pass level and progress
- 🎨 **Retro UI**: Enjoy the nostalgic pixel art design

## 🛠️ Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: TailwindCSS 4
- **UI Components**: [Pixel RetroUI](https://www.retroui.io/) - For that perfect retro feel!
- **API**: [Official Fortnite API](https://fortnite-api.com/) - Real-time player statistics

## 🚀 Upcoming Features

This is version 0.1.0, and we're just getting started! Here's what's coming soon:

- ⭐ **Favorites System**: Save your favorite players for quick access
- 📱 **PWA Integration**: Install NeryNite Tracker as a native app
- 📊 **Enhanced Player Stats**: More detailed performance analytics
- 📄 **Match History**: View recent match details and outcomes
- 🌙 **Dark Mode**: For those late-night gaming sessions

## 🔧 Installation & Development

```bash
# Clone the repository
git clone https://github.com/neryad/nery-nite-tracker.git

# Navigate to the project directory
cd nery-nite-tracker

# Install dependencies
npm install

# Create a .env file with your Fortnite API key
echo "VITE_API_URL=https://fortnite-api.com/v2/stats/br/v2" > .env
echo "VITE_API_KEY=your-api-key-here" >> .env

# Start the development server
npm run dev
```

## 📝 Build

```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

## 👨‍💻 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Connect with Me

- Twitter: [@neryadg](https://twitter.com/neryadg)
- GitHub: [neryad](https://github.com/neryad)
- YouTube: [@neryad](https://www.youtube.com/@neryad)

---

Made with ❤️ and React by Neryad
