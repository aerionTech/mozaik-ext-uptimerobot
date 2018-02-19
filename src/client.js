import Promise from 'bluebird'; // use bluebird for simplicity, you should also use a Promise polyfill
import config from './config';
import UptimeRobot from 'uptimerobot-apiv2';

// When Mozaïk instanciate a client, it pass the mozaik instance to it,
// it's usefull to use the builtin Mozaïk logger for example.
// This function MUST return an object whose keys correspond to all available operations.
const client = mozaik => {
    return {
        // This function MUST return a promise.
        getMonitors() {
            mozaik.loadApiConfig(config);
            var apiKey = config.get('uptimerobot.uptimerobotAPIKey');
            const uptimerobot = new UptimeRobot(apiKey);
            var data = uptimerobot.getMonitors();
            return Promise.resolve(data);       
        }
    }    
};

export default client;