const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    CV: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Application',applicationSchema);