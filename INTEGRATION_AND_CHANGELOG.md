# PralaayDhristi (प्रलय दृष्टि) · Integration Guide & Changelog

This document details the latest architectural enhancements, animations, smooth scrolling, Recharts hardware visualizations, and backend integration pipelines (FastAPI & Node.js).

---

## 📦 Newly Added Dependencies

| Package | Version | Purpose & Performance Optimization |
| :--- | :--- | :--- |
| **`lenis`** | `^1.1.x` | **Silky-Smooth 60fps Scrolling**: Ultra-lightweight smooth scroll system running via `requestAnimationFrame` without hijacking default touch gestures or stressing the CPU. |
| **`gsap`** | `^3.12.x` | **Hardware-Accelerated Motion**: High-performance UI entrance animations and staggered reveals. All animations use `gsap.context()` to guarantee complete garbage collection on unmount. |
| **`axios`** | `^1.7.x` | **REST API Client**: Interceptors for authorization tokens, unified error handling, and robust timeouts for FastAPI and Node.js backends. |
| **`socket.io-client`** | `^4.8.x` | **Real-Time IoT Streaming**: Bi-directional, low-latency WebSocket connection for live hardware sensor telemetry. |
| **`recharts`** | `^3.10.x` | **High-Fidelity Data Visualizations**: Interactive hydrographs, ingestion throughput, multi-station thresholds, and hardware battery/signal matrices. |
| **`lucide-react`** | `^1.33.x` | Modern, tree-shakable SVG iconography. |
| **`tailwindcss`** | `^4.3.x` | Next-generation zero-runtime atomic CSS styling. |

---

## 🚀 Key Architectural Changes

### 1. Lenis Smooth Scrolling Integration
- **Hook**: [`src/hooks/useLenis.js`](./src/hooks/useLenis.js)
- Global `requestAnimationFrame` loop with exponential smooth easing curve.
- Handles page navigation and anchor jumps (`#features`, `#how-it-works`, `#team`) with calibrated offset (`-80px` for navbar).

### 2. GPU-Accelerated GSAP Animations
- **Hero Section** ([`src/components/Hero.jsx`](./src/components/Hero.jsx)): Coordinated stagger for status badge, serif headline, subtitle, and CTA buttons.
- **Key Metrics Bar** ([`src/components/StatsBar.jsx`](./src/components/StatsBar.jsx)): Staggered metric card rise.
- **Capabilities Grid** ([`src/components/Capabilities.jsx`](./src/components/Capabilities.jsx)): Micro-interactions and card entrances.
- **How It Works** ([`src/components/HowItWorks.jsx`](./src/components/HowItWorks.jsx)): Sequential timeline milestone pop-ins.
- **Team Section** ([`src/components/TeamSection.jsx`](./src/components/TeamSection.jsx)): Glowing avatar badge entrance.

### 3. Admin Dashboard Recharts Hardware Visualizations
[`src/pages/AdminDashboardPreview.jsx`](./src/pages/AdminDashboardPreview.jsx) now includes:
1. **24-Hour Hardware Ingestion & Latency** (`ComposedChart`): Real-time packets/second area mapped with gateway response latency (ms).
2. **Multi-Station Stage Comparison** (`BarChart`): Compares water stage height (m) across 6 primary catchment gauges against **Warning (5.2m)** and **Critical Danger (6.5m)** threshold lines.
3. **Field Hardware Health Matrix** (`ComposedChart`): Live battery charge percentage (%) vs radio signal quality (RSSI dBm) across all 12 sensor nodes.
4. **Live Telemetry Stream Switch & Maintenance Controls**: Real-time packet updates and individual sensor offline/online toggle.

---

## 🐍 Connecting Python FastAPI (AI Prediction Backend)

### 1. Configure the Frontend Endpoint
In [`src/services/apiClient.js`](./src/services/apiClient.js):
```javascript
export const API_ENDPOINTS = {
  FASTAPI_AI_URL: 'http://localhost:8000/api/v1',
  NODE_HARDWARE_URL: 'http://localhost:5000/api',
  WS_TELEMETRY_URL: 'ws://localhost:5000',
  USE_MOCK_FALLBACK: false // <-- Set to false to use your live FastAPI server
};
```

### 2. Sample FastAPI Server Implementation (`main.py`)
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np

app = FastAPI(title="Neervana AI Flood Prediction Engine", version="3.4")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FloodInput(BaseModel):
    basinId: str
    rainfallIntensity: float
    damDischarge: float
    soilSaturation: float

@app.post("/api/v1/predict")
async def predict_flood(payload: FloodInput):
    # Load your LSTM / XGBoost / PyTorch model here:
    # model = load_model('neervana_lstm_v3.h5')
    
    # Example calculation:
    rain_factor = (payload.rainfallIntensity / 50.0) * 2.8
    discharge_factor = (payload.damDischarge / 500.0) * 1.6
    sat_multiplier = (payload.soilSaturation / 100.0) * 1.35
    
    peak_level = round(3.2 + (rain_factor + discharge_factor) * sat_multiplier * 0.58, 2)
    probability = min(99.4, max(8.0, round((peak_level / 6.5) * 88.0, 1)))
    
    risk_level = "NORMAL"
    if peak_level >= 6.5:
        risk_level = "CRITICAL DANGER"
    elif peak_level >= 5.2:
        risk_level = "WARNING"
    elif peak_level >= 4.0:
        risk_level = "WATCH"

    return {
        "success": True,
        "model": "Neervana-Ensemble-v3.4-FastAPI",
        "metrics": {
            "peakWaterLevelMeters": peak_level,
            "floodProbabilityPercent": probability,
            "timeToCrestHours": 6.5,
            "riskLevel": risk_level,
            "confidenceInterval": "+-0.18m (95% CI)",
            "ensembleWeights": {
                "lstmTemporal": 0.42,
                "randomForestSpatial": 0.31,
                "xgboostHydrology": 0.27
            }
        }
    }

@app.post("/api/v1/model/retrain")
async def retrain_model():
    # Trigger PyTorch / TensorFlow background retraining job
    return {"success": True, "newAccuracy": 91.9, "status": "Retrained"}
```

---

## ⚡ Connecting Node.js (Hardware Ingestion & WebSocket Telemetry)

### Sample Node.js / Express / Socket.IO Server (`server.js`)
```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Hardware Telemetry REST Ingestion (from Field Sensors / Gateways)
app.post('/api/sensors/ingest', (req, res) => {
  const { sensorId, stageLevel, rainRate, battery, rssi } = req.body;
  
  const packet = {
    sensorId,
    level: `${stageLevel}m`,
    rainRate: `${rainRate} mm/h`,
    battery: `${battery}%`,
    rssi: Number(rssi),
    timestamp: new Date().toISOString()
  };

  // Broadcast live telemetry packet to all connected dashboards
  io.emit('sensor:packet', packet);
  res.json({ success: true, receivedAt: Date.now() });
});

// Emergency Alert Dispatch Webhook
app.post('/api/alerts/dispatch', (req, res) => {
  const { level, message } = req.body;
  console.log(`[ALERT BROADCAST] Level: ${level} - ${message}`);
  // Trigger SMS Gateway (Twilio) / Siren relays
  res.json({ success: true, broadcastId: `ALERT-${Date.now()}` });
});

io.on('connection', (socket) => {
  console.log('Dashboard client connected to telemetry stream:', socket.id);
});

server.listen(5000, () => {
  console.log('Node.js Telemetry Gateway running on port 5000');
});
```

---

## 📂 Modular Services Layer

- [`src/services/apiClient.js`](./src/services/apiClient.js) — Base Axios configuration, endpoints, auth headers.
- [`src/services/fastapiAiService.js`](./src/services/fastapiAiService.js) — FastAPI AI inference client.
- [`src/services/nodeHardwareService.js`](./src/services/nodeHardwareService.js) — Node.js IoT hardware stream & alert client.
- [`src/services/neervanaApi.js`](./src/services/neervanaApi.js) — Clean facade exported to UI components.
