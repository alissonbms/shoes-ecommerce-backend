import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import connectToDatabase from './src/database/mongoose.database'

import productRouter from './src/routes/product.routes'
import categoryRouter from './src/routes/category.routes'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

void connectToDatabase()

app.use('/api/product', productRouter)
app.use('/api/category', categoryRouter)

const port = 8000
// process.env.PORT = será a porta do heroku quando fizermos o deploy
app.listen(port, () => console.log(`Server listening on port ${port}`))
