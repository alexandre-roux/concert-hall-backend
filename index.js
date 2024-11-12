const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");

const app = express();
app.use(formidable());

// Import routes
const eventRoutes = require("./routes/events");
app.use(eventRoutes);

const ticketRoutes = require("./routes/tickets");
app.use(ticketRoutes);

mongoose.connect("mongodb://localhost/olympia", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(3000, () => {
    console.log("Server started");
});
