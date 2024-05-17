const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    place:{
        type:String,
        required:[true,"Place should not be empty"],
        trim:true
    },
    services: [{
        service_id:{
            type:mongoose.Schema.Types.ObjectId,
        },
        name: {
            type: String,
            required: [true, "Service name should not be empty"],
            trim: true
        },
        price: {
            type: Number,
            required: [true, "Service price should not be empty"]
        },
        available: {
            type: Number,
            default: 5
        }
    }],
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    },
})

module.exports = mongoose.model("Service",bookingSchema);