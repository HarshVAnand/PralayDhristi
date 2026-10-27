import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  BarChart, 
  AreaChart, 
  LineChart, 
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
  ShieldCheck, 
  Server, 
  AlertTriangle, 
  Radio, 
  RefreshCw, 
  CheckCircle2, 
  Cpu, 
  Database, 
  BellRing, 
  Activity, 
  Wifi, 
  BatteryMedium, 
  Sliders, 
  Filter 
} from 'lucide-react';
import { 
  ACTIVE_SENSORS, 
  HARDWARE_INGESTION_TIMELINE, 
  HARDWARE_STATION_COMPARISON, 
  HARDWARE_HEALTH_DISTRIBUTION 
} from '../data/mockPredictionData';
import { nodeHardwareService } from '../services/nodeHardwareService';
import { fastapiAiService } from '../services/fastapiAiService';
import projectLogo from '../assets/logo.jpg';

// Custom Admin Recharts Tooltip
const AdminChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#070D22]/95 border border-cyan-800/80 p-3 rounded-xl shadow-2xl backdrop-blur-md font-mono-code text-xs">
        <div className="text-slate-400 font-bold mb-1.5 pb-1 border-b border-slate-800">
          Time / Node: {label}
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

export default function AdminDashboardPreview({ user, onBackHome }) {
  const [sensors, setSensors] = useState(ACTIVE_SENSORS);
  const [ingestionTimeline, setIngestionTimeline] = useState(HARDWARE_INGESTION_TIMELINE);
  const [selectedBasinFilter, setSelectedBasinFilter] = useState('ALL');
  const [liveStreamActive, setLiveStreamActive] = useState(true);
  const [alertSent, setAlertSent] = useState(false);
  const [retraining, setRetraining] = useState(false);
  const [modelStatus, setModelStatus] = useState('Neervana-Ensemble v3.4 (Optimal)');
  const [recentLivePacket, setRecentLivePacket] = useState(null);

  // Connect live hardware telemetry stream (FastAPI / Node.js WebSocket Bridge)
  useEffect(() => {
    if (!liveStreamActive) return;

    const cleanup = nodeHardwareService.connectHardwareStream((packet) => {
      setRecentLivePacket(packet);
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, [liveStreamActive]);

  const triggerBroadcastAlert = async () => {
    setAlertSent(true);
    await nodeHardwareService.dispatchEmergencyAlert({
      level: 'CRITICAL WARNING',
      message: 'Urgent: Water levels approaching threshold in Tutong catchment.'
    });
    setTimeout(() => setAlertSent(false), 5000);
  };

  const triggerRetrain = async () => {
    setRetraining(true);
    setModelStatus('Retraining LSTM & XGBoost weights with 48h hardware telemetry...');
    const result = await fastapiAiService.triggerRetrain();
    setTimeout(() => {
      setRetraining(false);
      setModelStatus(`Neervana-Ensemble v3.4.1 (Accuracy: ${result.newAccuracy || 91.8}%)`);
    }, 2000);
  };

  const toggleSensor = async (id) => {
    const updated = sensors.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Online' ? 'Maintenance' : 'Online';
        nodeHardwareService.toggleSensorMaintenance(id, nextStatus);
        return { ...s, status: nextStatus };
      }
      return s;
    });
    setSensors(updated);
  };

  const filteredSensors = selectedBasinFilter === 'ALL'
    ? sensors
    : sensors.filter(s => s.basin === selectedBasinFilter);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Banner with Brand Logo */}
      <div className="atmos-glass-card rounded-2xl p-6 border border-blue-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 shadow-lg shadow-cyan-500/30 flex-shrink-0">
            <img src={projectLogo} alt="Pralaya Drishti Logo" className="w-full h-full object-cover rounded-[10px]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-bold text-white font-mono-code tracking-wide">
                PRALAAYDHRISTI HARDWARE CONTROL CENTER
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-mono-code mt-0.5">
              Node ID: BSB-HYDRO-GATEWAY-01 · Operator: <span className="text-cyan-300 font-semibold">{user ? user.role : 'Chief Hydrologist'}</span> ({user ? user.email : 'admin@pralaaydhristi.org'})
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setLiveStreamActive(!liveStreamActive)}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono-code flex items-center gap-2 border transition-all cursor-pointer ${
              liveStreamActive
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-slate-900 text-slate-400 border-slate-700'
            }`}
          >
            <Activity className={`w-3.5 h-3.5 ${liveStreamActive ? 'animate-pulse' : ''}`} />
            <span>{liveStreamActive ? 'LIVE TELEMETRY STREAMING' : 'STREAM PAUSED'}</span>
          </button>

          <button
            onClick={triggerRetrain}
            disabled={retraining}
            className="px-4 py-2 rounded-lg bg-blue-950 hover:bg-blue-900 border border-blue-700 text-blue-300 text-xs font-mono-code flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${retraining ? 'animate-spin' : ''}`} />
            <span>Retrain AI Weights</span>
          </button>

          <button
            onClick={triggerBroadcastAlert}
            className="px-4 py-2 rounded-lg bg-red-950 hover:bg-red-900 border border-red-700 text-red-300 text-xs font-mono-code flex items-center gap-2 cursor-pointer"
          >
            <BellRing className="w-3.5 h-3.5 animate-bounce" />
            <span>Dispatch Flood Broadcast</span>
          </button>
        </div>
      </div>

      {alertSent && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-500 text-red-200 text-xs font-mono-code flex items-center gap-3 shadow-2xl animate-fadeIn">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <div>
            <div className="font-bold">MULTI-CHANNEL FLOOD ADVISORY TRANSMITTED</div>
            <div className="text-[11px] text-red-300">Push notifications, SMS gateway, and emergency siren webhooks dispatches sent to 4 catchment zones.</div>
          </div>
        </div>
      )}

      {/* Real-time Hardware KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="atmos-glass-card rounded-xl p-5 border border-slate-800">
          <div className="flex items-center justify-between mb-2 text-slate-400 text-xs font-mono-code">
            <span>AI MODEL STATUS</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-sm font-bold text-white truncate">{modelStatus}</div>
          <div className="text-[11px] text-emerald-400 font-mono-code mt-1">● Fast API Connected & Calibrated</div>
        </div>

        <div className="atmos-glass-card rounded-xl p-5 border border-slate-800">
          <div className="flex items-center justify-between mb-2 text-slate-400 text-xs font-mono-code">
            <span>FIELD SENSOR NODES</span>
            <Radio className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono-code">
            {sensors.filter(s => s.status === 'Online').length} / {sensors.length} ACTIVE
          </div>
          <div className="text-[11px] text-sky-300 font-mono-code mt-1">LoRaWAN & Cellular Ingestion: 30s</div>
        </div>

        <div className="atmos-glass-card rounded-xl p-5 border border-slate-800">
          <div className="flex items-center justify-between mb-2 text-slate-400 text-xs font-mono-code">
            <span>HARDWARE PACKET RATE</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono-code">38.4 PKT/S</div>
          <div className="text-[11px] text-slate-400 font-mono-code mt-1">Packet Loss: &lt; 0.12% (Nominal)</div>
        </div>

        <div className="atmos-glass-card rounded-xl p-5 border border-slate-800">
          <div className="flex items-center justify-between mb-2 text-slate-400 text-xs font-mono-code">
            <span>ACTIVE ALERT ZONE</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-amber-400 font-mono-code">TUTONG BASIN</div>
          <div className="text-[11px] text-amber-300 font-mono-code mt-1">Stage: 4.82m · Warning: 5.2m</div>
        </div>

      </div>

      {/* RECHARTS SECTION 1: Hardware Ingestion & Comparative Multi-Station Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: 24h Hardware Packet Ingestion Rate & Network Latency */}
        <div className="atmos-glass-card rounded-2xl p-6 border border-blue-900/40">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white font-mono-code flex items-center gap-2">
                <span>Hardware Packet Ingestion & Latency (Recharts)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-cyan-800">
                  Node.js IoT Gateway
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono-code mt-0.5">
                Real-time packets received per second vs gateway response latency (ms).
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={ingestionTimeline} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="packetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis yAxisId="left" stroke="#38bdf8" tick={{ fill: '#38bdf8', fontSize: 10 }} unit=" p/s" />
                <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" tick={{ fill: '#f59e0b', fontSize: 10 }} unit="ms" />
                <Tooltip content={<AdminChartTooltip />} />
                <Area yAxisId="left" type="monotone" dataKey="packetsSec" name="Packets/Sec" stroke="#38bdf8" strokeWidth={2.5} fill="url(#packetGrad)" unit=" pkt/s" />
                <Line yAxisId="right" type="monotone" dataKey="latencyMs" name="Latency" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} unit="ms" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Multi-Station Stage Comparison vs Thresholds */}
        <div className="atmos-glass-card rounded-2xl p-6 border border-blue-900/40">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white font-mono-code flex items-center gap-2">
                <span>Multi-Station Water Levels vs Danger Thresholds</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-cyan-800">
                  Hydro Stage
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono-code mt-0.5">
                Current sensor stage height (m) compared against warning (5.2m) and critical danger (6.5m).
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HARDWARE_STATION_COMPARISON} margin={{ top: 10, right: 10, left: -15, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="station" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 9 }} angle={-15} textAnchor="end" />
                <YAxis domain={[0, 7.5]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} unit="m" />
                <Tooltip content={<AdminChartTooltip />} />
                <ReferenceLine y={5.2} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Warn 5.2m', fill: '#f59e0b', fontSize: 9 }} />
                <ReferenceLine y={6.5} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Danger 6.5m', fill: '#ef4444', fontSize: 9 }} />
                <Bar dataKey="currentLevel" name="Current Level" fill="#3b82f6" radius={[4, 4, 0, 0]} unit="m" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* RECHARTS SECTION 2: Hardware Health (Battery & Signal RSSI) */}
      <div className="atmos-glass-card rounded-2xl p-6 border border-blue-900/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-white font-mono-code flex items-center gap-2">
              <BatteryMedium className="w-5 h-5 text-emerald-400" />
              <span>Field Hardware Health Matrix (Battery % & Signal RSSI dBm)</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono-code mt-0.5">
              Live power reserves and telemetry radio link quality across all 12 field hardware stations.
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={HARDWARE_HEALTH_DISTRIBUTION} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 9 }} angle={-15} textAnchor="end" />
              <YAxis yAxisId="bat" domain={[0, 100]} stroke="#10b981" tick={{ fill: '#10b981', fontSize: 10 }} unit="%" />
              <YAxis yAxisId="rssi" orientation="right" domain={[-100, -40]} stroke="#38bdf8" tick={{ fill: '#38bdf8', fontSize: 10 }} unit="dBm" />
              <Tooltip content={<AdminChartTooltip />} />
              <Bar yAxisId="bat" dataKey="battery" name="Battery Charge" fill="#10b981" radius={[4, 4, 0, 0]} unit="%" opacity={0.85} />
              <Line yAxisId="rssi" type="monotone" dataKey="rssi" name="Signal RSSI" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4, fill: '#38bdf8' }} unit=" dBm" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sensor Hardware Fleet Management Table */}
      <div className="atmos-glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white font-mono-code">
              Field Sensor Hardware Fleet ({filteredSensors.length} Stations)
            </h3>
            <span className="text-xs font-mono-code text-slate-400">Manage hardware status, calibration, and IoT streaming</span>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedBasinFilter}
              onChange={(e) => setSelectedBasinFilter(e.target.value)}
              className="bg-[#050814] border border-slate-700 text-white font-mono-code text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Basins (12 Stations)</option>
              <option value="Tutong">Tutong Catchment</option>
              <option value="Belait">Belait Basin</option>
              <option value="Temburong">Temburong Headwaters</option>
              <option value="Brunei-Muara">Brunei-Muara Estuary</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-code">
            <thead className="bg-[#050814] text-slate-400 border-b border-slate-800 uppercase">
              <tr>
                <th className="px-5 py-3.5">Station ID</th>
                <th className="px-5 py-3.5">Sensor Name</th>
                <th className="px-5 py-3.5">Sensor Type</th>
                <th className="px-5 py-3.5">Stage Level</th>
                <th className="px-5 py-3.5">Rain Rate</th>
                <th className="px-5 py-3.5">Battery</th>
                <th className="px-5 py-3.5">Signal RSSI</th>
                <th className="px-5 py-3.5">Latency</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Hardware Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredSensors.map((sensor) => (
                <tr key={sensor.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-cyan-400">{sensor.id}</td>
                  <td className="px-5 py-3.5 text-white font-medium">{sensor.name}</td>
                  <td className="px-5 py-3.5 text-slate-400">{sensor.type}</td>
                  <td className="px-5 py-3.5 text-amber-300 font-bold">{sensor.level}</td>
                  <td className="px-5 py-3.5 text-sky-300">{sensor.rainRate}</td>
                  <td className="px-5 py-3.5 text-emerald-400">{sensor.battery}</td>
                  <td className="px-5 py-3.5 text-slate-300">{sensor.rssi ? `${sensor.rssi} dBm` : '-64 dBm'}</td>
                  <td className="px-5 py-3.5 text-cyan-300">{sensor.latency ? `${sensor.latency}ms` : '18ms'}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      sensor.status === 'Online'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sensor.status === 'Online' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      {sensor.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => toggleSensor(sensor.id)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] transition-colors cursor-pointer"
                    >
                      {sensor.status === 'Online' ? 'Set Offline' : 'Set Online'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
