const config = {
    dbUrl: process.env.DB_URL || 'localhost',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROUTE || 'app',
    publicFolder: process.env.PUBLIC_Folder || 'public',
    filesRoute: process.env.FILES_ROUTE || 'files',
    apiKey: process.env.API_KEY || 123,
    jwtSecret: process.env.SECRET || 'ISK3WMCXE62Dp7YVJ4BdgORNtZiaFm8P'
}

export default config