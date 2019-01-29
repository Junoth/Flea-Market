const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    familyName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    telephoneNumber: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    social: {
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        instagram: {
            type: String
        }
    }
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema);