const config = {
    dbUrl: process.env.DB_URL || '',
    port: process.env.PORT || 3000,
    publicHost: process.env.HOST || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROUTE || 'app',
    publicFolder: process.env.PUBLIC_Folder || 'public',
    filesRoute: process.env.FILES_ROUTE || 'files',
}

export default {
    config
}