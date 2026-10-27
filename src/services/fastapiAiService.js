import { fastapiClient, API_ENDPOINTS } from './apiClient';

/**
 * Service for communicating with Python FastAPI AI Backend
 * Model: Neervana LSTM + XGBoost Hydrological Ensemble
 */
export const fastapiAiService = {
  /**
   * Run real-time flood prediction inference
   * @param {Object} payload - { basinId, rainfallIntensity, damDischarge, soilSaturation }
   */
  async predictFlood(payload) {
    if (API_ENDPOINTS.USE_MOCK_FALLBACK) {
      return this._simulateInference(payload);
    }
    try {
      const response = await fastapiClient.post('/predict', payload);
      return response.data;
    } catch (error) {
      console.warn('[FastAPI AI] Backend unreachable, using fallback simulation:', error.message);
      return this._simulateInference(payload);
    }
  },

  /**
   * Fetch current model weights & feature importances from FastAPI
   */
  async getModelMetadata() {
    if (API_ENDPOINTS.USE_MOCK_FALLBACK) {
      return {
        model: 'Neervana-Ensemble-v3.4',
        accuracy: 91.3,
        lstmWeights: 0.42,
        xgboostWeights: 0.31,
        randomForestWeights: 0.27,
        status: 'Optimal'
      };
    }
    try {
      const response = await fastapiClient.get('/model/metadata');
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  },

  /**
   * Trigger model retraining on recent 48h hardware telemetry
   */
  async triggerRetrain(stationId = 'all') {
    if (API_ENDPOINTS.USE_MOCK_FALLBACK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, message: 'Model weights updated with 48h field telemetry', newAccuracy: 91.8 });
        }, 1500);
      });
    }
    const response = await fastapiClient.post('/model/retrain', { stationId });
    return response.data;
  },

  _simulateInference({ rainfallIntensity = 35, damDischarge = 420, soilSaturation = 82 }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const rainFactor = (rainfallIntensity / 50) * 2.8;
        const dischargeFactor = (damDischarge / 500) * 1.6;
        const saturationMultiplier = (soilSaturation / 100) * 1.35;
        
        const peakLevel = Math.min(8.5, +(3.2 + (rainFactor + dischargeFactor) * saturationMultiplier * 0.58).toFixed(2));
        const probability = Math.min(99.4, Math.max(8.0, +((peakLevel / 6.5) * 88).toFixed(1)));
        
        let riskLevel = 'NORMAL';
        if (peakLevel >= 6.5) riskLevel = 'CRITICAL DANGER';
        else if (peakLevel >= 5.2) riskLevel = 'WARNING';
        else if (peakLevel >= 4.0) riskLevel = 'WATCH';

        resolve({
          success: true,
          timestamp: new Date().toISOString(),
          model: 'Neervana-Ensemble-v3.4 (FastAPI Simulated)',
          metrics: {
            peakWaterLevelMeters: peakLevel,
            floodProbabilityPercent: probability,
            timeToCrestHours: 6.5,
            riskLevel,
            confidenceInterval: '±0.18m (95% CI)',
            ensembleWeights: {
              lstmTemporal: 0.42,
              randomForestSpatial: 0.31,
              xgboostHydrology: 0.27
            }
          }
        });
      }, 500);
    });
  }
};
