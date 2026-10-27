import { nodeBackendClient, API_ENDPOINTS } from './apiClient';
import { io } from 'socket.io-client';
import { ACTIVE_SENSORS, HARDWARE_INGESTION_TIMELINE } from '../data/mockPredictionData';

/**
 * Service for communicating with Node.js Hardware Telemetry Backend
 * Handles IoT sensor streams, hardware telemetry packets, and alerts.
 */
export const nodeHardwareService = {
  socket: null,

  /**
   * Initialize Real-Time WebSocket stream for field sensor hardware
   * @param {Function} onTelemetryUpdate - Callback when new packet arrives
   */
  connectHardwareStream(onTelemetryUpdate) {
    if (API_ENDPOINTS.USE_MOCK_FALLBACK) {
      console.log('[Node Hardware Stream] Using mock fallback stream');
      // Simulate live telemetry interval
      const interval = setInterval(() => {
        const randomSensorIdx = Math.floor(Math.random() * ACTIVE_SENSORS.length);
        const sensor = ACTIVE_SENSORS[randomSensorIdx];
        if (sensor && onTelemetryUpdate) {
          onTelemetryUpdate({
            sensorId: sensor.id,
            timestamp: new Date().toISOString(),
            currentLevel: sensor.level,
            rainRate: sensor.rainRate,
            battery: sensor.batteryVal,
            latencyMs: sensor.latency + Math.floor(Math.random() * 6 - 3)
          });
        }
      }, 4000);

      return () => clearInterval(interval);
    }

    try {
      this.socket = io(API_ENDPOINTS.WS_TELEMETRY_URL, {
        reconnectionAttempts: 5,
        timeout: 5000
      });

      this.socket.on('sensor:packet', (data) => {
        if (onTelemetryUpdate) onTelemetryUpdate(data);
      });

      return () => {
        if (this.socket) this.socket.disconnect();
      };
    } catch (err) {
      console.warn('[Node Hardware] WebSocket connection failed:', err);
    }
  },

  /**
   * Fetch all 12 field hardware sensors telemetry status
   */
  async fetchSensorFleet() {
    if (API_ENDPOINTS.USE_MOCK_FALLBACK) {
      return ACTIVE_SENSORS;
    }
    try {
      const res = await nodeBackendClient.get('/sensors');
      return res.data;
    } catch (err) {
      return ACTIVE_SENSORS;
    }
  },

  /**
   * Dispatch Emergency Flood Alert to field channels (SMS, Webhooks, Sirens)
   */
  async dispatchEmergencyAlert(payload) {
    if (API_ENDPOINTS.USE_MOCK_FALLBACK) {
      return { success: true, broadcastId: `ALERT-${Date.now()}`, recipientsCount: 1420 };
    }
    const res = await nodeBackendClient.post('/alerts/dispatch', payload);
    return res.data;
  },

  /**
   * Toggle sensor node maintenance state
   */
  async toggleSensorMaintenance(sensorId, status) {
    if (API_ENDPOINTS.USE_MOCK_FALLBACK) {
      return { success: true, sensorId, status };
    }
    const res = await nodeBackendClient.patch(/sensors//status, { status });
    return res.data;
  }
};
