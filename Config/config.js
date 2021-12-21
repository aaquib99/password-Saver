require("dotenv").config();
const config = {
    //serviceName: process.env.SERVICENAME || 'PostgresDB',
    port: process.env.PORT || 5000,
    loggerLevel: process.env.LOGGERLEVEL || 'debug',
    db:{
        user: process.env.HEROKU_USER || '',
        database: process.env.HEROKU_DB || '',
        password: process.env.HEROKU_DB_PASS || '',
        host: process.env.HEROKU_DB_HOST || '',
        port: 7869,
        //url: process.env.HEROKU_DB_URL || '',
        //ssl: { rejectUnauthorized: false },
        //max: parseInt(process.env.DB_MAX_CLIENTS) || 20,
        //idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS) || 30000
    }
}

module.exports = config;