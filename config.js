const config = {
    dbUrl: process.env.DB_URL || 'localhost',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROUTE || 'app',
    publicFolder: process.env.PUBLIC_Folder || 'public',
    filesRoute: process.env.FILES_ROUTE || 'files',
    
}

export default config