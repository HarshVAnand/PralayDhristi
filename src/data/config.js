/**
 * Global Configuration for PralaayDhristi
 * Easily editable for custom branding, coordinates, sensor counts, and links.
 */
export const APP_CONFIG = {
  name: 'PralayaDhristi',
  tagline: 'Precision Weather Intelligence Powered by AI',
  heroHeading: 'Precision Weather Intelligence',
  heroHighlight: 'Powered by AI',
  subtitle: 'Real-time weather monitoring and AI-driven flood prediction for vulnerable river basins. Protect communities with 24-hour advance warning and 91.3% model accuracy.',
  systemStatus: {
    active: true,
    label: 'LIVE SYSTEM ACTIVE',
    region: 'Brunei Darussalam · Ganga-Brahmaputra Basin',
    lastSync: '12s ago',
    activeSensors: 12,
    accuracy: '91.3%',
    forecastHorizon: '24h',
    latency: '<30s'
  },
  stats: [
    { value: '91.3%', label: 'Prediction accuracy' },
    { value: '24h', label: 'Forecast horizon' },
    { value: '12', label: 'Active sensors' },
    { value: '<30s', label: 'Data latency' }
  ],
  capabilities: [
    {
      id: 'ai-prediction',
      title: 'AI Flood Prediction',
      category: 'Machine Learning',
      description: 'Neural ensemble model combining LSTM networks, random forest, and gradient boosting achieves 91.3% accuracy up to 24 hours ahead.',
      icon: 'brain'
    },
    {
      id: 'sensor-network',
      title: 'Real-Time Sensor Network',
      category: 'IoT Integration',
      description: 'Live ingestion from 12+ field sensors. Temperature, humidity, pressure, wind, and river level — streamed every 30 seconds.',
      icon: 'activity'
    },
    {
      id: 'configurable-alerts',
      title: 'Configurable Alerts',
      category: 'Alerting',
      description: 'Multi-channel notifications via email, SMS, push, and webhook. Threshold-based triggers with severity classification.',
      icon: 'bell'
    },
    {
      id: 'interactive-analytics',
      title: 'Interactive Analytics',
      category: 'Visualization',
      description: 'Multi-station time-series charts for all meteorological variables. Exportable reports in CSV and PDF formats.',
      icon: 'barChart'
    }
  ],
  methodologySteps: [
    {
      number: '01',
      title: 'Sensor Ingestion',
      description: 'Field sensors transmit atmospheric and hydrological readings every 30s.'
    },
    {
      number: '02',
      title: 'Data Pipeline',
      description: 'Readings are validated, normalized, and stored in time-series database.'
    },
    {
      number: '03',
      title: 'AI Inference',
      description: 'Ensemble model generates 24h flood probability and water level forecasts.'
    },
    {
      number: '04',
      title: 'Alert Dispatch',
      description: 'Threshold breaches trigger automated multi-channel alerts to field and admin.'
    }
  ],
  footer: {
    copyright: '© 2026 PralaayDhristi (प्रलय दृष्टि) · AI Flood Intelligence & Early Warning System',
    links: ['Privacy', 'Terms', 'Documentation', 'API Gateway']
  }
};
