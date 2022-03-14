module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 2525,
    DEV: 1,
    DB_RETRY_TIME: process.env.db_retry_time || 3000,
    DB_SERVICE: process.env.db_service || 'mongodb',
    DB_PORT: process.env.db_port || 2717,
    DB_DATABASE: process.env.db_database || 'api',
    DB_USERNAME: process.env.db_username || 'root',
    DB_PASSWORD: process.env.db_password || 'root',
    llave: "estoesnetflixbb"
}