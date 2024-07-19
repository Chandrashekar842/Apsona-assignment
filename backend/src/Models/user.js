import mongoose from "mongoose";

const schema = mongoose.Schema

const userSchema = new schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export const User = mongoose.model('User', userSchema)