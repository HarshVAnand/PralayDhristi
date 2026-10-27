import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  AreaChart, 
  BarChart, 
  Line, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine, 
  Legend 
} from 'recharts';
import { 
  Cpu, 
  AlertTriangle, 
  CloudRain, 
  TrendingUp, 
  Droplets, 
  Sliders, 
  Play, 
  Layers, 
  RefreshCw, 
  CheckCircle2, 
  Gauge, 
  Radio, 
  Code, 
  ShieldAlert 
} from 'lucide-react';
import { 
  BASINS, 
  HOURLY_24H_FORECAST, 
  INUNDATION_PROBABILITY_ZONES, 
  MODEL_FEATURE_IMPORTANCE, 
  ACTIVE_SENSORS 
} from '../data/mockPredictionData';
import { runNeervanaPrediction } from '../services/neervanaApi';
import projectLogo from '../assets/logo.jpg';

// Custom Recharts Dark Tooltip
const CustomChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#070D22]/95 border border-blue-800/80 p-3.5 rounded-xl shadow-2xl backdrop-blur-md font-mono-code text-xs">
        <div className="text-slate-400 font-bold mb-2 pb-1 border-b border-slate-800">
          Timestamp: {label} (T+{label})
        </div>
        {payload.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-4 py-0.5">
            <span style={{ color: item.color }} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name}:
            </span>
            <span className="font-bold text-white">
              {item.value} {item.unit || ''}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function NeervanaAI() {
  const [selectedBasin, setSelectedBasin] = useState(BASINS[0]);
  const [forecastData, setForecastData] = useState(HOURLY_24H_FORECAST);
  
  // Scenario Simulator State
  const [simRainfall, setSimRainfall] = useState(35);
  const [simDischarge, setSimDischarge] = useState(420);
  const [simSaturation, setSimSaturation] = useState(82);
  const [isInferencing, setIsInferencing] = useState(false);
  const [predictionResult, setPredictionResult] = useState({
    peakWaterLevelMeters: 6.20,
    floodProbabilityPercent: 91.3,
    riskLevel: 'WARNING',
    confidenceInterval: '±0.18m (95% CI)'
  });

  const [activeTab, setActiveTab] = useState('forecast'); // 'forecast', 'sensors', 'architecture'

  const handleRunSimulation = async () => {
    setIsInferencing(true);
    const result = await runNeervanaPrediction({
      basinId: selectedBasin.id,
      rainfallIntensity: simRainfall,
      damDischarge: simDischarge,
      soilSaturation: simSaturation
    });

    if (result && result.metrics) {
      setPredictionResult(result.metrics);

      // Dynamically adjust forecast curve based on simulation inputs
      const multiplier = (result.metrics.peakWaterLevelMeters / 6.20);
      const updated = HOURLY_24H_FORECAST.map(item => ({
        ...item,
        predicted: +(item.predicted * multiplier).toFixed(2),
        probability: Math.min(99.9, Math.round(item.probability * multiplier)),
        rainfall: +(item.rainfall * (simRainfall / 30)).toFixed(1),
        discharge: Math.round(item.discharge * (simDischarge / 400))
      }));
      setForecastData(updated);
    }
    setIsInferencing(false);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Top Header & AI Model Status */}
      <div className="atmos-glass-card rounded-2xl p-6 sm:p-8 border border-blue-900/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-600 shadow-[0_0_25px_rgba(56,189,248,0.4)] flex-shrink-0">
            <img 
              src={projectLogo} 
              alt="Pralaya Drishti Logo" 
              className="w-full h-full object-cover rounded-[14px]"
            />
          </div>
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-blue-950 border border-blue-700 flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              </div>
              <span className="font-mono-code text-xs uppercase tracking-widest text-cyan-300 font-bold">
                NEERVANA AI ENGINE (V3.4) · PRALAAYDHRISTI
              </span>
            </div>
            <h1 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
              AI Flood Prediction Hub
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-mono-code mt-1">
              Real-time inference combining LSTM Temporal Recurrent Networks, XGBoost, and Hydrological Physics.
            </p>
          </div>
        </div>

        {/* Basin Selector */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="bg-[#050814] border border-blue-900/80 rounded-xl p-2 flex items-center gap-2">
            <span className="text-xs font-mono-code text-slate-400 pl-2">Basin:</span>
            <select
              value={selectedBasin.id}
              onChange={(e) => {
                const found = BASINS.find(b => b.id === e.target.value);
                if (found) setSelectedBasin(found);
              }}
              className="bg-transparent text-white font-mono-code text-xs sm:text-sm focus:outline-none pr-3"
            >
              {BASINS.map(b => (
                <option key={b.id} value={b.id} className="bg-[#070D22] text-white">
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Real-time Status Metric Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="atmos-glass-card rounded-xl p-5 border border-slate-800">
          <div className="text-xs font-mono-code text-slate-400 mb-1 flex items-center justify-between">
            <span>PREDICTED CREST</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-mono-code font-bold text-white">
            {predictionResult.peakWaterLevelMeters}m
          </div>
          <div className="text-[11px] font-mono-code text-blue-300 mt-1">
            Current Stage: {selectedBasin.currentLevel}m · Threshold: {selectedBasin.warningLevel}m
          </div>
        </div>

        <div className="atmos-glass-card rounded-xl p-5 border border-slate-800">
          <div className="text-xs font-mono-code text-slate-400 mb-1 flex items-center justify-between">
            <span>FLOOD PROBABILITY</span>
            <Gauge className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-mono-code font-bold text-amber-400">
            {predictionResult.floodProbabilityPercent}%
          </div>
          <div className="text-[11px] font-mono-code text-slate-400 mt-1">
            Horizon: 24 Hours · CI: {predictionResult.confidenceInterval}
          </div>
        </div>

        <div className="atmos-glass-card rounded-xl p-5 border border-slate-800">
          <div className="text-xs font-mono-code text-slate-400 mb-1 flex items-center justify-between">
            <span>RISK CLASSIFICATION</span>
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
          <div className={`text-2xl font-mono-code font-bold ${
            predictionResult.riskLevel.includes('DANGER') || predictionResult.riskLevel.includes('WARNING')
              ? 'text-red-400'
              : 'text-emerald-400'
          }`}>
            {predictionResult.riskLevel}
          </div>
          <div className="text-[11px] font-mono-code text-slate-400 mt-1">
            Status: Active Automated Monitoring
          </div>
        </div>

        <div className="atmos-glass-card rounded-xl p-5 border border-slate-800">
          <div className="text-xs font-mono-code text-slate-400 mb-1 flex items-center justify-between">
            <span>DATA TELEMETRY</span>
            <Radio className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-mono-code font-bold text-sky-300">
            12/12 SENSORS
          </div>
          <div className="text-[11px] font-mono-code text-emerald-400 mt-1">
            ● Stream Synced (Latency &lt; 30s)
          </div>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('forecast')}
          className={`px-4 py-2 rounded-lg text-xs font-mono-code font-bold transition-all cursor-pointer ${
            activeTab === 'forecast'
              ? 'bg-blue-600/30 text-blue-300 border border-blue-500'
              : 'text-slate-400 hover:text-white bg-slate-900/50'
          }`}
        >
          24H HYDROGRAPH & INFERENCE CHARTS
        </button>
        <button
          onClick={() => setActiveTab('sensors')}
          className={`px-4 py-2 rounded-lg text-xs font-mono-code font-bold transition-all cursor-pointer ${
            activeTab === 'sensors'
              ? 'bg-blue-600/30 text-blue-300 border border-blue-500'
              : 'text-slate-400 hover:text-white bg-slate-900/50'
          }`}
        >
          FIELD SENSOR TELEMETRY (12 STATIONS)
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2 rounded-lg text-xs font-mono-code font-bold transition-all cursor-pointer ${
            activeTab === 'architecture'
              ? 'bg-blue-600/30 text-blue-300 border border-blue-500'
              : 'text-slate-400 hover:text-white bg-slate-900/50'
          }`}
        >
          AI MODEL ARCHITECTURE & API INTEGRATION
        </button>
      </div>

      {/* TAB 1: FORECAST & RECHARTS */}
      {activeTab === 'forecast' && (
        <div className="space-y-8">
          
          {/* Main Chart 1: 24h River Stage Water Level Forecast */}
          <div className="atmos-glass-card rounded-2xl p-6 sm:p-8 border border-blue-900/40">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white font-mono-code flex items-center gap-2">
                  <span>24-Hour Stage Height & AI Forecast Hydrograph</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                    Recharts.js
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-mono-code mt-0.5">
                  Observed Stage (m) vs Neervana AI Predicted Crest with Warning (5.2m) and Danger (6.5m) thresholds.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono-code">
                <div className="flex items-center gap-1.5 text-blue-400">
                  <span className="w-3 h-0.5 bg-blue-400" /> Observed
                </div>
                <div className="flex items-center gap-1.5 text-sky-300">
                  <span className="w-3 h-0.5 bg-sky-300 border-dashed" /> Predicted (AI)
                </div>
                <div className="flex items-center gap-1.5 text-red-400">
                  <span className="w-3 h-0.5 bg-red-400" /> Danger (6.5m)
                </div>
              </div>
            </div>

            <div className="h-80 sm:h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={forecastData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="observedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis domain={[0, 8]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} unit="m" />
                  <Tooltip content={<CustomChartTooltip />} />
                  
                  {/* Warning & Danger Thresholds */}
                  <ReferenceLine y={5.2} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Warning (5.2m)', fill: '#f59e0b', fontSize: 10, position: 'insideTopRight' }} />
                  <ReferenceLine y={6.5} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Critical Danger (6.5m)', fill: '#ef4444', fontSize: 10, position: 'insideTopRight' }} />

                  {/* AI Predicted Area & Curve */}
                  <Area type="monotone" dataKey="predicted" name="AI Predicted Level" stroke="#38bdf8" strokeWidth={3} fill="url(#predictedGrad)" unit="m" />
                  
                  {/* Observed Sensor Line */}
                  <Line type="monotone" dataKey="observed" name="Observed Stage" stroke="#60a5fa" strokeWidth={3} dot={{ r: 4, fill: '#60a5fa' }} unit="m" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grid of 2 Charts: Rainfall Inflow vs Discharge & Inundation Probability */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Chart 2: Rainfall (mm) vs Inflow Discharge (m³/s) */}
            <div className="atmos-glass-card rounded-2xl p-6 border border-blue-900/40">
              <h3 className="text-base font-bold text-white font-mono-code mb-1">
                Rainfall Inflow vs Runoff Discharge
              </h3>
              <p className="text-xs text-slate-400 font-mono-code mb-4">
                Hourly basin precipitation accumulation (mm) mapped with river discharge rate (m³/s).
              </p>

              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={forecastData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <YAxis yAxisId="left" stroke="#38bdf8" tick={{ fill: '#38bdf8', fontSize: 10 }} unit="mm" />
                    <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" tick={{ fill: '#f59e0b', fontSize: 10 }} unit="m³/s" />
                    <Tooltip content={<CustomChartTooltip />} />
                    <Bar yAxisId="left" dataKey="rainfall" name="Rainfall" fill="#38bdf8" radius={[4, 4, 0, 0]} unit="mm" opacity={0.8} />
                    <Line yAxisId="right" type="monotone" dataKey="discharge" name="Discharge Rate" stroke="#f59e0b" strokeWidth={2.5} dot={false} unit="m³/s" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3: Flood Risk Inundation Probability (%) */}
            <div className="atmos-glass-card rounded-2xl p-6 border border-blue-900/40">
              <h3 className="text-base font-bold text-white font-mono-code mb-1">
                Flood Risk Probability Curve (%)
              </h3>
              <p className="text-xs text-slate-400 font-mono-code mb-4">
                AI ensemble certainty score for overtopping thresholds over the next 24-hour cycle.
              </p>

              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="probGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <YAxis domain={[0, 100]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} unit="%" />
                    <Tooltip content={<CustomChartTooltip />} />
                    <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'High Risk (80%)', fill: '#ef4444', fontSize: 9 }} />
                    <Area type="monotone" dataKey="probability" name="Flood Probability" stroke="#f59e0b" strokeWidth={2.5} fill="url(#probGrad)" unit="%" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Interactive AI Scenario Simulator */}
          <div className="atmos-glass-card rounded-2xl p-6 sm:p-8 border border-blue-600/50 bg-[#070E28]/90 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white font-mono-code flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-blue-400" />
                  <span>Neervana AI Interactive Scenario Sandbox</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono-code mt-0.5">
                  Adjust simulated atmospheric and hydrological inputs to test real-time AI inference.
                </p>
              </div>

              <button
                onClick={handleRunSimulation}
                disabled={isInferencing}
                className="px-6 py-2.5 rounded-xl font-bold text-xs font-mono-code text-white glow-btn-primary flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isInferencing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Computing Ensemble Model...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Run Neervana AI Prediction</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              
              <div className="bg-[#050814] p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                  <span className="text-slate-300">Rainfall Intensity</span>
                  <span className="text-blue-400 font-bold">{simRainfall} mm/h</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={simRainfall}
                  onChange={(e) => setSimRainfall(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono-code mt-1">
                  <span>5 mm/h (Light)</span>
                  <span>120 mm/h (Torrential)</span>
                </div>
              </div>

              <div className="bg-[#050814] p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                  <span className="text-slate-300">Dam Outflow / Inflow</span>
                  <span className="text-amber-400 font-bold">{simDischarge} m³/s</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1200"
                  value={simDischarge}
                  onChange={(e) => setSimDischarge(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono-code mt-1">
                  <span>50 m³/s (Base)</span>
                  <span>1200 m³/s (Spillway Open)</span>
                </div>
              </div>

              <div className="bg-[#050814] p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                  <span className="text-slate-300">Soil Saturation Index</span>
                  <span className="text-emerald-400 font-bold">{simSaturation}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={simSaturation}
                  onChange={(e) => setSimSaturation(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono-code mt-1">
                  <span>10% (Dry)</span>
                  <span>100% (Fully Saturated)</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 2: ACTIVE SENSORS */}
      {activeTab === 'sensors' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-mono-code">
              12 Active Field Hydrological Sensors
            </h3>
            <span className="text-xs font-mono-code text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
              ● All Sensors Transmitting
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACTIVE_SENSORS.map((sensor) => (
              <div key={sensor.id} className="atmos-glass-card rounded-xl p-5 border border-slate-800 hover:border-blue-500/50 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-mono-code font-bold text-blue-400">{sensor.id}</span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{sensor.name}</h4>
                    <span className="text-[11px] text-slate-400 font-mono-code">{sensor.type}</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono-code pt-3 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-500">Stage:</span>
                    <div className="font-bold text-amber-300">{sensor.level}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Rain Rate:</span>
                    <div className="font-bold text-sky-300">{sensor.rainRate}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Water Temp:</span>
                    <div className="font-bold text-slate-300">{sensor.temp}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Battery:</span>
                    <div className="font-bold text-emerald-400">{sensor.battery}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AI ARCHITECTURE & CODE INTEGRATION */}
      {activeTab === 'architecture' && (
        <div className="space-y-8">
          
          {/* Architecture overview */}
          <div className="atmos-glass-card rounded-2xl p-6 sm:p-8 border border-blue-900/40">
            <h3 className="text-lg font-bold text-white font-mono-code mb-3 flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-400" />
              <span>Neervana AI Architecture & Backend Integration Guide</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
              Neervana is designed as a modular plug-and-play AI system. The React frontend communicates with your model through 
              <code className="text-blue-300 bg-blue-950 px-2 py-0.5 rounded mx-1 font-mono-code">src/services/neervanaApi.js</code>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Feature Weights */}
              <div className="bg-[#050814] p-5 rounded-xl border border-slate-800">
                <h4 className="text-xs font-mono-code font-bold text-amber-400 uppercase mb-3">
                  Neervana Model Feature Weights
                </h4>
                <div className="space-y-3 font-mono-code text-xs">
                  {MODEL_FEATURE_IMPORTANCE.map((f, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>{f.feature}</span>
                        <span className="text-blue-400 font-bold">{f.weight}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${f.weight}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* API Integration Snippet */}
              <div className="bg-[#050814] p-5 rounded-xl border border-slate-800">
                <h4 className="text-xs font-mono-code font-bold text-blue-400 uppercase mb-3">
                  FastAPI / Flask Integration Endpoint
                </h4>
                <pre className="text-[11px] font-mono-code text-slate-300 bg-[#030611] p-3 rounded-lg overflow-x-auto border border-slate-900 leading-relaxed">
{`# In your Python FastAPI Backend:
@app.post("/api/v1/predict")
async def predict_flood(input: FloodInput):
    # 1. Run LSTM spatio-temporal model
    # 2. Compute crest height & probability
    return {
        "metrics": {
            "peakWaterLevelMeters": 6.20,
            "floodProbabilityPercent": 91.3,
            "riskLevel": "WARNING"
        }
    }`}
                </pre>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
