import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    members: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export const Events = mongoose.model("Events", schema);