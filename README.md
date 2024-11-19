Concert Hall Backend API

This Node.js project provides the backend API for a concert hall management system. Built with Express and Mongoose, it allows management of events and ticket sales, including creating, editing, and deleting events and tickets in the MongoDB database.
Table of Contents

    Project Overview
    Features
    Prerequisites
    Installation
    Usage
    API Endpoints
    License

Project Overview

The Concert Hall Backend API provides endpoints to manage concerts, shows, and ticket sales. It stores and retrieves data about scheduled events and associated ticket sales, offering an interface for CRUD operations.
Features

    Event Management: Create, edit, delete, and view events (concerts, shows, etc.)
    Ticket Management: Manage ticket sales for each event, including purchase and cancellation
    Data Storage: Uses MongoDB to store data with Mongoose as an ODM for schema definitions and database operations

Prerequisites

    Node.js (v14 or higher)
    MongoDB (local instance or a cloud database such as MongoDB Atlas)
    npm

Installation

    Clone this repository:

git clone https://github.com/your-username/concert-hall-backend.git
cd concert-hall-backend

Install dependencies:

npm install

Set up environment variables:

Create a .env file in the root directory and add the following:

MONGODB_URI=your_mongodb_connection_string
PORT=3000

Start the server:

    In development mode with Nodemon:

npx nodemon server.js

Or directly with Node.js:

        node server.js

    Access the API at http://localhost:3000.

Usage

This project is intended as a REST API for managing event and ticket data. It can be integrated with a frontend or accessed directly through an HTTP client like Postman for testing.
API Endpoints
Events

    Create Event
    POST /api/events
    Add a new event.

    Get All Events
    GET /api/events
    Retrieve a list of all events.

    Get Event by ID
    GET /api/events/:id
    Retrieve details of a specific event by ID.

    Update Event
    PUT /api/events/:id
    Edit details of an existing event.

    Delete Event
    DELETE /api/events/:id
    Remove an event.

Tickets

    Create Ticket
    POST /api/tickets
    Add a new ticket for a specific event.

    Get All Tickets for Event
    GET /api/tickets?eventId=eventId
    Retrieve a list of all tickets sold for a specific event.

    Get Ticket by ID
    GET /api/tickets/:id
    Retrieve details of a specific ticket.

    Update Ticket
    PUT /api/tickets/:id
    Edit details of an existing ticket.

    Delete Ticket
    DELETE /api/tickets/:id
    Remove a ticket.

License

This project is licensed under the MIT License.
