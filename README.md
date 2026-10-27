<<<<<<< HEAD
# PralaayDhristi (ATMOS) · AI Flood Prediction Frontend

PralaayDhristi is a modern, high-precision flood intelligence & early-warning web frontend built with **React.js**, **Tailwind CSS**, and **Recharts**.

---

## 🚀 Quick Start in VS Code

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies (if not already installed)
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

---

## 📂 Clean Project Structure

```
frontend/
├── src/
│   ├── assets/                 # Brand assets and icons
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.jsx          # Top navigation (Features, How it works, Team, Contact, Neervana, Admin Login)
│   │   ├── Hero.jsx            # Hero section with live status badge & serif headings
│   │   ├── StatsBar.jsx        # 91.3% Accuracy, 24h forecast, 12 sensors, <30s latency
│   │   ├── Capabilities.jsx    # 4 operational capability cards
│   │   ├── HowItWorks.jsx      # 4-step methodology timeline (01 to 04)
│   │   ├── TeamSection.jsx     # Glowing circular researcher badges (AR, KH, SN, MF)
│   │   ├── NewsletterCTA.jsx   # Real-time flood advisory subscription box
│   │   ├── Footer.jsx          # Footer links and copyright
│   │   ├── FloatingAdminBadge.jsx # Floating "ADMIN DASHBOARD" & quick help buttons
│   │   └── AdminLoginModal.jsx # Admin authentication modal
│   │
│   ├── pages/
│   │   ├── HomePage.jsx        # Landing experience matching the provided UI designs
│   │   ├── NeervanaAI.jsx      # AI Prediction Hub (Interactive Recharts hydrographs, scenario sandbox)
│   │   ├── ContactPage.jsx     # 24/7 Flood Hotline & operational dispatch form
│   │   └── AdminDashboardPreview.jsx # Sensor fleet manager & broadcast alert trigger
│   │
│   ├── services/
│   │   └── neervanaApi.js      # Plug-and-play API service for your AI model / backend
│   │
│   ├── data/
│   │   ├── config.js           # App titles, badges, and navigation links
│   │   ├── mockPredictionData.js # 24h hydrograph datasets, risk zones, and active sensors
│   │   └── teamData.js         # Researcher bios and glowing avatar settings
│   │
│   ├── App.jsx                 # Main state router & modal coordinator
│   ├── index.css               # Custom glows, glassmorphism, and dark midnight themes
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🧠 How to Integrate your AI Model & Backend

Open `src/services/neervanaApi.js`:

1. Set `USE_MOCK_FALLBACK: false`
2. Update `BASE_URL` to point to your backend (e.g. `http://localhost:8000/api/v1`):

```javascript
export const API_CONFIG = {
  USE_MOCK_FALLBACK: false,
  BASE_URL: 'http://localhost:8000/api/v1',
  WS_TELEMETRY_URL: 'ws://localhost:8000/ws/sensors'
};
```

When your FastAPI, Flask, or Node.js server receives the POST payload from `runNeervanaPrediction({ basinId, rainfallIntensity, damDischarge, soilSaturation })`, return the JSON format:

```json
{
  "metrics": {
    "peakWaterLevelMeters": 6.20,
    "floodProbabilityPercent": 91.3,
    "riskLevel": "WARNING",
    "confidenceInterval": "±0.18m (95% CI)"
  }
}
```

---

## 🎨 Easy Customizations in VS Code

- **Change App Title & Subtitles**: Edit [`src/data/config.js`](./src/data/config.js)
- **Change Team Members**: Edit [`src/data/teamData.js`](./src/data/teamData.js)
- **Change Basins, Sensors, or Hydrograph Data**: Edit [`src/data/mockPredictionData.js`](./src/data/mockPredictionData.js)
- **Customize Theme & Glow Colors**: Edit [`src/index.css`](./src/index.css)

=======
# PralayDhristi
>>>>>>> 5ace61a0b4c0ce91e886f0c690d609a1b0886917
