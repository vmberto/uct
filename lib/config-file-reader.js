/**
 * Config File Reader
 * 
 * Searches for a config file and then returns the object.
 * 
 */
const configFileReader = () => {

    try {

        const configFile = require(process.cwd() + '/uct.js');

        return configFile;

    } catch (e) {
        //        
    }

    

}

module.exports = configFileReader;