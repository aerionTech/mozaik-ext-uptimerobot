import convict from 'convict';

const config = convict({
  uptimerobot: {
    uptimerobotAPIKey: {
      doc: 'The main API key from your UptimeRobot account',
      default: null,
      format: String,
      env: 'UPTIMEROBOT_API_KEY'
    },
  }
});

export default config;
