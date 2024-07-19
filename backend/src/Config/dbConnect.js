import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const dbConnect = async () => {
    await mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("successfully connected to database")
        })
        .catch((err) => {
            console.log("Unable to connect to MongoDB Atlas!");
            console.error(err);
        })
}