const express = require("express");
const router = express.Router();

// Import des models
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");

router.post("/events/create", async (req, res) => {
    console.log(req.fields);
    try {
        if (req.fields.name && req.fields.date) {
            const event = await Event.find({name: req.fields.name, date: req.fields.date});
            if (event.length > 0) {
                res.status(400).json({error: {message: "Event already exists"}});
            } else {
                // nous avons besoin du model Event ici
                const newEvent = new Event({
                    name: req.fields.name,
                    date: req.fields.date,
                    seats: req.fields.seats,
                });
                await newEvent.save();
                res.json({message: "Event successfully created"})
            }
        } else {
            res.status(400).json({error: {message: "Missing parameter"}});
        }
    } catch (error) {
        res.status(400).json({error: {message: error.message}});
    }
});

router.get("/events/availabilities", async (req, res) => {
    console.log(req.query);
    try {
        if (req.query.date) {
            const events = await Event.find({date: req.query.date});
            res.status(200).json(events);
        } else {
            res.status(400).json({error: {message: "Missing parameter"}});
        }
    } catch (error) {
        res.status(400).json({error: {message: error.message}});
    }
});

router.get("/events", async (req, res) => {
    console.log(req.query);
    try {
        if (req.query.id) {
            const event = await Event.findById(req.query.id);
            res.status(200).json(event);
        } else {
            const events = await Event.find({})
            res.status(200).json(events);
        }
    } catch (error) {
        res.status(400).json({error: {message: error.message}});
    }
});

router.put("/events/edit", async (req, res) => {
    console.log(req.fields);
    try {
        if (req.fields.id) {
            // D'abord trouver l'évent associé
            const event = await Event.findById(req.fields.id);
            // Mettre à jour
            if (req.fields.date) event.date = req.fields.date;
            if (req.fields.name) event.name = req.fields.name;
            if (req.fields.seats && req.fields.seats.orchestre)
                event.seats.orchestre = req.fields.seats.orchestre;
            if (req.fields.seats && req.fields.seats.mazzanine)
                event.seats.mazzanine = req.fields.seats.mazzanine;
            // Savegarder dans la BD
            await event.save();
            res.status(200).json({message: "Event successfully updated"});
        } else {
            res.status(400).json({error: {message: "Missing parameter"}});
        }
    } catch (error) {
        res.status(400).json({error: {message: error.message}});
    }
});

router.get("/events/delete", async (req, res) => {
    console.log(req.query);
    try {
        if (req.query.id) {
            // Delete event
            const deletedEvent = await Event.findByIdAndDelete(req.query.id);
            if (deletedEvent) {
                // Delete all tickets for this event
                const ticketsToDelete = await Ticket.find({event: req.query.id});
                for (const element of ticketsToDelete) {
                    await element.remove();
                }
                res.status(200).json({message: "Event successfully deleted"});
            } else {
                res.status(400).json({
                    error: {
                        message: "Wrong event ID",
                    },
                });
            }
        } else {
            res.status(400).json({error: {message: "Missing parameter"}});
        }
    } catch (error) {
        res.status(400).json({error: {message: error.message}});
    }
});

module.exports = router;
