const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    // first name of the customer
    first_name: String,
    // last name of the customer 
    last_name: String,
    // customer's email
    email: {
        type: String,
        requires: true,
        unique: true
    },
    // customer's password
    password: String,
    // customer's address
    address: String,
    credit_card: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Credit Card',
        required: false
    }]
});

module.exports = mongoose.model("Customer", CustomerSchema);