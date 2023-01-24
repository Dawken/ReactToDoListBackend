const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    MONGODB_LOCAL_PORT,
    DB_NAME
} = process.env

export const mongoDb = {
    url: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${MONGODB_LOCAL_PORT}/${DB_NAME}`
}