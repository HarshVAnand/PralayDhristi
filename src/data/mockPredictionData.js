/**
 * Mock Hydrological Datasets and Real-Time Sensor Telemetry
 * for Neervana AI model graphs (Recharts)
 */

export const BASINS = [
  { id: 'basin-tutong', name: 'Tutong River Basin - Station Alpha', currentLevel: 4.82, dangerLevel: 6.5, warningLevel: 5.2, riskStatus: 'WARNING' },
  { id: 'basin-belait', name: 'Belait Catchment Area - Station Beta', currentLevel: 3.15, dangerLevel: 5.8, warningLevel: 4.5, riskStatus: 'NORMAL' },
  { id: 'basin-temburong', name: 'Temburong Headwaters - Station Delta', currentLevel: 4.10, dangerLevel: 5.5, warningLevel: 4.2, riskStatus: 'WATCH' },
  { id: 'basin-brunei-muara', name: 'Brunei-Muara Coastal Confluence', currentLevel: 2.75, dangerLevel: 4.9, warningLevel: 3.8, riskStatus: 'NORMAL' }
];

export const HOURLY_24H_FORECAST = [
  { time: '00:00', observed: 3.2, predicted: 3.2, rainfall: 4.2, discharge: 120, probability: 14, warningThreshold: 5.2, dangerThreshold: 6.5 },
  { time: '02:00', observed: 3.4, predicted: 3.4, rainfall: 6.8, discharge: 135, probability: 18, warningThreshold: 5.2, dangerThreshold: 6.5 },
  { time: '04:00', observed: 3.8, predicted: 3.9, rainfall: 12.4, discharge: 175, probability: 28, warningThreshold: 5.2, dangerThreshold: 6.5 },
  { time: '06:00', observed: 4.3, predicted: 4.4, rainfall: 18.9, discharge: 240, probability: 42, warningThreshold: 5.2, dangerThreshold: 6.5 },
  { time: '08:00', observed: 4.6, predicted: 4.7, rainfall: 24.5, discharge: 310, probability: 58, warningThreshold: 5.2, dangerThreshold: 6.5 },
  { time: '10:00', observed: 4.82, predicted: 4.9, rainfall: 29.0, discharge: 365, probability: 67, warningThreshold: 5.2, dangerThreshold: 6.5 },
  { time: '12:00', observed: null, predicted: 5.35, rainfall: 34.2, discharge: 420, probability: 78, warningThreshold: 5.2, dangerThreshold: 6.5 },
  { time: '14:00', observed: null, predicted: 5.85, rainfall: 31.5, discharge: 490, probability: 86, warningThreshold: 5.2, dangerThreshold: 6.5 },
  { time: '16:00', observed: null, predicted: 6.20, rainfall: 22.0, discharge: 540, probability: 91.3, warningThreshold: 5.2, dangerThreshold: 6.5 },
  { time: '18:00', observed: null, predicted: 5.95, rainfall: 14.1, discharge: 480, probability: 84, warningThreshold: 5.2, dangerThreshold: 6.5 },
  { time: '20:00', observed: null, predicted: 5.40, rainfall: 8.5, discharge: 390, probability: 69, warningThreshold: 5.2, dangerThreshold: 6.5 },
  { time: '22:00', observed: null, predicted: 4.80, rainfall: 3.2, discharge: 280, probability: 45, warningThreshold: 5.2, dangerThreshold: 6.5 },
  { time: '24:00', observed: null, predicted: 4.10, rainfall: 1.0, discharge: 195, probability: 28, warningThreshold: 5.2, dangerThreshold: 6.5 },
];

export const INUNDATION_PROBABILITY_ZONES = [
  { elevation: '0-2m (Floodplain)', probability: 94, riskZone: 'Critical High', color: '#ef4444' },
  { elevation: '2-4m (Lowlands)', probability: 78, riskZone: 'Elevated Danger', color: '#f97316' },
  { elevation: '4-6m (Buffer Plains)', probability: 42, riskZone: 'Moderate Watch', color: '#eab308' },
  { elevation: '6-8m (High Banks)', probability: 16, riskZone: 'Low Risk', color: '#22c55e' },
  { elevation: '>8m (Elevated Ridge)', probability: 3, riskZone: 'Minimal', color: '#3b82f6' }
];

export const MODEL_FEATURE_IMPORTANCE = [
  { feature: 'Precipitation Accumulation (6h)', weight: 38, icon: 'CloudRain' },
  { feature: 'Upstream Dam Release / Inflow', weight: 24, icon: 'Droplets' },
  { feature: 'Soil Moisture Saturation Index', weight: 21, icon: 'Layers' },
  { feature: 'Basin Slope & Terrain Runoff', weight: 17, icon: 'TrendingUp' }
];

export const ACTIVE_SENSORS = [
  { id: 'SN-01', name: 'Tutong Bridge Gauge', type: 'Ultrasonic Stage', level: '4.82m', temp: '27.4°C', rainRate: '28.4 mm/h', battery: '98%', batteryVal: 98, signal: 'Strong', rssi: -62, latency: 18, status: 'Online', packetsPerMin: 120, basin: 'Tutong' },
  { id: 'SN-02', name: 'Lamunin Hydro Station', type: 'Pressure Transducer', level: '5.10m', temp: '26.8°C', rainRate: '31.2 mm/h', battery: '94%', batteryVal: 94, signal: 'Strong', rssi: -65, latency: 22, status: 'Online', packetsPerMin: 120, basin: 'Tutong' },
  { id: 'SN-03', name: 'Kuala Abang Weir', type: 'Radar Level Sensor', level: '3.95m', temp: '28.1°C', rainRate: '19.5 mm/h', battery: '89%', batteryVal: 89, signal: 'Moderate', rssi: -78, latency: 34, status: 'Online', packetsPerMin: 118, basin: 'Tutong' },
  { id: 'SN-04', name: 'Belait River Headwater', type: 'Doppler Velocity', level: '3.15m', temp: '27.0°C', rainRate: '8.0 mm/h', battery: '96%', batteryVal: 96, signal: 'Strong', rssi: -58, latency: 15, status: 'Online', packetsPerMin: 120, basin: 'Belait' },
  { id: 'SN-05', name: 'Kuala Balai Siphon', type: 'Submersible Transducer', level: '2.80m', temp: '27.5°C', rainRate: '5.2 mm/h', battery: '91%', batteryVal: 91, signal: 'Strong', rssi: -71, latency: 28, status: 'Online', packetsPerMin: 120, basin: 'Belait' },
  { id: 'SN-06', name: 'Sukang Tributary Gauge', type: 'Ultrasonic Stage', level: '3.60m', temp: '26.2°C', rainRate: '12.0 mm/h', battery: '78%', batteryVal: 78, signal: 'Moderate', rssi: -82, latency: 42, status: 'Online', packetsPerMin: 115, basin: 'Belait' },
  { id: 'SN-07', name: 'Bangar Upstream Monitor', type: 'Radar Level Sensor', level: '4.10m', temp: '26.5°C', rainRate: '22.1 mm/h', battery: '95%', batteryVal: 95, signal: 'Strong', rssi: -64, latency: 19, status: 'Online', packetsPerMin: 120, basin: 'Temburong' },
  { id: 'SN-08', name: 'Labu Estuary Sensor', type: 'Tide & Crest Meter', level: '2.40m', temp: '28.9°C', rainRate: '4.5 mm/h', battery: '99%', batteryVal: 99, signal: 'Strong', rssi: -55, latency: 14, status: 'Online', packetsPerMin: 120, basin: 'Temburong' },
  { id: 'SN-09', name: 'Amo Catchment Sentry', type: 'Acoustic Doppler', level: '3.88m', temp: '25.9°C', rainRate: '26.0 mm/h', battery: '87%', batteryVal: 87, signal: 'Moderate', rssi: -76, latency: 31, status: 'Online', packetsPerMin: 119, basin: 'Temburong' },
  { id: 'SN-10', name: 'Sungai Kedayan Outlet', type: 'Optical Flowmeter', level: '2.75m', temp: '29.1°C', rainRate: '6.4 mm/h', battery: '100%', batteryVal: 100, signal: 'Strong', rssi: -52, latency: 12, status: 'Online', packetsPerMin: 120, basin: 'Brunei-Muara' },
  { id: 'SN-11', name: 'Mengkubau Reservoir Inflow', type: 'Pressure Transducer', level: '4.45m', temp: '26.9°C', rainRate: '18.2 mm/h', battery: '93%', batteryVal: 93, signal: 'Strong', rssi: -68, latency: 25, status: 'Online', packetsPerMin: 120, basin: 'Brunei-Muara' },
  { id: 'SN-12', name: 'Muara Port Marine Hydrometry', type: 'Multi-parameter Buoy', level: '1.95m', temp: '29.8°C', rainRate: '2.0 mm/h', battery: '92%', batteryVal: 92, signal: 'Strong', rssi: -60, latency: 17, status: 'Online', packetsPerMin: 120, basin: 'Brunei-Muara' }
];

/**
 * 24-Hour Hardware Packet Ingestion & Network Latency Data for Admin Recharts
 */
export const HARDWARE_INGESTION_TIMELINE = [
  { time: '00:00', packetsSec: 24, latencyMs: 18, packetLoss: 0.1, payloadKb: 48 },
  { time: '02:00', packetsSec: 24, latencyMs: 19, packetLoss: 0.0, payloadKb: 48 },
  { time: '04:00', packetsSec: 25, latencyMs: 22, packetLoss: 0.2, payloadKb: 52 },
  { time: '06:00', packetsSec: 28, latencyMs: 25, packetLoss: 0.4, payloadKb: 58 },
  { time: '08:00', packetsSec: 32, latencyMs: 28, packetLoss: 0.3, payloadKb: 65 },
  { time: '10:00', packetsSec: 36, latencyMs: 29, packetLoss: 0.5, payloadKb: 72 },
  { time: '12:00', packetsSec: 40, latencyMs: 34, packetLoss: 0.6, payloadKb: 80 },
  { time: '14:00', packetsSec: 42, latencyMs: 32, packetLoss: 0.4, payloadKb: 85 },
  { time: '16:00', packetsSec: 38, latencyMs: 28, packetLoss: 0.2, payloadKb: 76 },
  { time: '18:00', packetsSec: 32, latencyMs: 24, packetLoss: 0.1, payloadKb: 64 },
  { time: '20:00', packetsSec: 28, latencyMs: 21, packetLoss: 0.0, payloadKb: 56 },
  { time: '22:00', packetsSec: 25, latencyMs: 19, packetLoss: 0.1, payloadKb: 50 },
  { time: '24:00', packetsSec: 24, latencyMs: 18, packetLoss: 0.0, payloadKb: 48 }
];

/**
 * Multi-Station Comparative Stage & Danger Level Matrix for Admin Recharts
 */
export const HARDWARE_STATION_COMPARISON = [
  { station: 'Tutong Bridge', currentLevel: 4.82, warningLevel: 5.2, dangerLevel: 6.5, riseRate: '+0.24 m/h', risk: 'High' },
  { station: 'Lamunin Hydro', currentLevel: 5.10, warningLevel: 5.2, dangerLevel: 6.5, riseRate: '+0.31 m/h', risk: 'Critical' },
  { station: 'Kuala Abang', currentLevel: 3.95, warningLevel: 4.8, dangerLevel: 6.0, riseRate: '+0.15 m/h', risk: 'Moderate' },
  { station: 'Belait Headwater', currentLevel: 3.15, warningLevel: 4.5, dangerLevel: 5.8, riseRate: '+0.08 m/h', risk: 'Normal' },
  { station: 'Bangar Upstream', currentLevel: 4.10, warningLevel: 4.2, dangerLevel: 5.5, riseRate: '+0.21 m/h', risk: 'Elevated' },
  { station: 'Mengkubau Reservoir', currentLevel: 4.45, warningLevel: 4.8, dangerLevel: 5.6, riseRate: '+0.18 m/h', risk: 'Moderate' }
];

/**
 * Hardware Node Battery & Signal RSSI Distribution
 */
export const HARDWARE_HEALTH_DISTRIBUTION = [
  { name: 'SN-01 (Tutong)', battery: 98, rssi: -62, status: 'Optimal' },
  { name: 'SN-02 (Lamunin)', battery: 94, rssi: -65, status: 'Optimal' },
  { name: 'SN-03 (K. Abang)', battery: 89, rssi: -78, status: 'Moderate' },
  { name: 'SN-04 (Belait)', battery: 96, rssi: -58, status: 'Optimal' },
  { name: 'SN-05 (K. Balai)', battery: 91, rssi: -71, status: 'Optimal' },
  { name: 'SN-06 (Sukang)', battery: 78, rssi: -82, status: 'Check Signal' },
  { name: 'SN-07 (Bangar)', battery: 95, rssi: -64, status: 'Optimal' },
  { name: 'SN-08 (Labu)', battery: 99, rssi: -55, status: 'Optimal' },
  { name: 'SN-09 (Amo)', battery: 87, rssi: -76, status: 'Moderate' },
  { name: 'SN-10 (S. Kedayan)', battery: 100, rssi: -52, status: 'Optimal' },
  { name: 'SN-11 (Mengkubau)', battery: 93, rssi: -68, status: 'Optimal' },
  { name: 'SN-12 (Muara)', battery: 92, rssi: -60, status: 'Optimal' }
];
