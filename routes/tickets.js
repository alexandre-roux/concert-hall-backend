const express = require("express");
const router = express.Router();

// Import des models
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");

router.post("/tickets/book", async (req, res) => {
    console.log(req.fields);
    try {
        if (
            req.fields.eventId &&
            req.fields.mail &&
            req.fields.username &&
            req.fields.category &&
            (req.fields.category === "orchestre" ||
                req.fields.category === "mezzanine") &&
            req.fields.seats &&
            typeof req.fields.seats === "number" &&
            req.fields.seats > 0 &&
            req.fields.seats < 5
        ) {
            // D'abord trouver l'évent associé
            const event = await Event.findById(req.fields.eventId);
            if (event) {
                // Vérifier le nombre de places restantes
                if (event.seats[req.fields.category] - req.fields.seats < 0) {
                    res.status(400).json({
                        error: {
                            message: "Not enough available seats for this category",
                        },
                    });
                } else {
                    // Créer le ticket
                    const newTicket = new Ticket({
                        mail: req.fields.mail,
                        username: req.fields.username,
                        category: req.fields.category,
                        seats: req.fields.seats,
                        event: event,
                    });
                    await newTicket.save();

                    // Mettre à jour le nombre de places
                    event.seats[req.fields.category] -= req.fields.seats;
                    await event.save();

                    res.status(200).json({
                        message: req.fields.seats + " seats successfully booked",
                    });
                }
            } else {
                res.status(400).json({
                    error: {
                        message: "Wrong event ID",
                    },
                });
            }
        } else {
            res.status(400).json({error: {message: "Invalid request"}});
        }
    } catch (error) {
        res.status(400).json({error: {message: error.message}});
    }
});

router.get("/tickets", async (req, res) => {
    console.log(req.fields);
    try {
        if (req.query.email) {
            const tickets = await Ticket.find({mail: req.query.email}).populate(
                "event"
            );
            res.status(200).json(tickets);
        } else if (req.fields.eventId) {
            const tickets = await Ticket.find({event: req.fields.eventId}).populate(
                "event"
            );
            res.status(200).json(tickets);
        } else if (req.fields.id) {
            const tickets = await Ticket.findById(req.fields.id);
            res.status(200).json(tickets);
        } else {
            const tickets = await Ticket.find({}).populate(
                "event"
            );
            res.status(200).json(tickets);
        }
    } catch (error) {
        res.status(400).json({error: {message: error.message}});
    }
});

router.delete("/tickets/cancel", async (req, res) => {
    console.log(req.query);
    try {
        if (req.query.id) {
            // Delete ticket
            const deletedTicket = await Ticket.findByIdAndDelete(req.query.id);
            if (deletedTicket) {
                // Update available seats for the associated event
                const eventToUpdate = await Event.findById(deletedTicket.event);
                eventToUpdate.seats[deletedTicket.category] += deletedTicket.seats;
                await eventToUpdate.save();
                if (deletedTicket.seats === 1) {
                    res.status(200).json({message: "Ticket successfully canceled"});
                } else {
                    res.status(200).json({message: "Tickets successfully canceled"});
                }
            } else {
                res.status(400).json({
                    error: {
                        message: "Wrong ticket ID",
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
