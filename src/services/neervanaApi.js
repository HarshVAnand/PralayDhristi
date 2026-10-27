/**
 * Unified Neervana Gateway
 * Integrates FastAPI AI Model Service and Node.js Hardware Telemetry Service.
 */
import { fastapiAiService } from './fastapiAiService';
import { nodeHardwareService } from './nodeHardwareService';
import { API_ENDPOINTS } from './apiClient';

export { API_ENDPOINTS, fastapiAiService, nodeHardwareService };

export async function runNeervanaPrediction(input) {
  return await fastapiAiService.predictFlood(input);
}
