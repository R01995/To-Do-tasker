const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
    },
    gender: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        require : true
    },

    createDate: {
        type: Date,
        default: Date.now
    },

    },
    {
        versionKey: false
    }
)

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel