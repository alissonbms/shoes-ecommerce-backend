/* eslint-disable @typescript-eslint/restrict-template-expressions */

import mongoose from 'mongoose'

const connectToDatabase = async (): Promise<void> => {
  await mongoose.connect(`${process.env.MONGO_URI}`, (error) => {
    if (error != null) {
      return console.log(`Could not connect to MongoDB: ${error.message}`)
    }

    return console.log('Connected to MongoDB!')
  })
}

export default connectToDatabase
