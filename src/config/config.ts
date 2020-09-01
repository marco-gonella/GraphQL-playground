import dotenv from 'dotenv';

// // Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// Cli command
// SET NODE_ENV=development

const result = dotenv.config()

if (result.error) {
    throw result.error
}

export default {

     /**
     * playground settings for apollo client
     */
    usePlayground: process.env.PLAYGROUND,
    playground: {
        'editor.theme': "light",
        'request.credentials': "include"
    },

    domain: 'test',

    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10) || 4000,

    /**
     * Use this to enable cors origin
     */
    enableCors: false,

    /**
     * Database URL for mongodb
     */
    databaseURL: process.env.MONGODB_URI,

    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET,

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    /**
     * Agenda.js stuff
     */
    agenda: {
        dbCollection: process.env.AGENDA_DB_COLLECTION,
        pooltime: process.env.AGENDA_POOL_TIME,
        concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
    },

    /**
     * Agendash config
     */
    agendash: {
        user: 'agendash',
        password: '123456'
    },
    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
    /**
     * Mailgun email credentials
     */
    emails: {
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
};