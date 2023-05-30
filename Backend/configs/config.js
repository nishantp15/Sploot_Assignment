const configs = {
    JWT_SECRET_KEY : process.env.JWT_secret_key,
    DB_CONNECTION_URL:process.env.URI,
    PORT:process.env.PORT
}

module.exports = configs