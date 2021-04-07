import express, { Application } from 'express'
import http from 'http'
import mongoose from 'mongoose'
import router from './routes/router'

const MONGO_DB_STRING = 'mongodb://holidayextra-mongodb:27017/development'

async function bootstrap(): Promise<http.Server> {
    try {
        mongoose.set('useCreateIndex', true)
        await mongoose
            .connect(MONGO_DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .catch((error) => {
                throw new Error(`MongoDB connection error: - ${JSON.stringify(error)} -`)
            })
        const app: Application = express()
        app.use(express.json())
        app.use(router)

        return app.listen(3000, () => console.log('App started on port 3000'))
    } catch (error) {
        console.log(`Error in the bootstrap function: ${error.message}`)
        process.exit(1)
    }
}

bootstrap()
