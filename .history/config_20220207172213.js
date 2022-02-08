const config = {
    dbUrl: process.env.DB_URL || '',
    port: process.env.PORT || 3000,
    publicHost: process.env.HOST || 'http://localhost',
    filesRoute: process.env.FILES_ROUTE || 'files'
}

module.exports = config