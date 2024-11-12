const mongoose = require("mongoose");

const Event = mongoose.model("Event", {
    date: String,
    name: String,
    seats: {
        orchestre: {type: Number, default: 1164},
        mezzanine: {type: Number, default: 824},
    },
});

module.exports = Event;
