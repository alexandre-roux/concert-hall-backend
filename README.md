# Concert Hall Backend API

This Node.js project provides the backend API for a concert hall management system. Built with Express and Mongoose, it allows management of events and ticket sales, including creating, editing, and deleting events and tickets in the MongoDB database.

## Table of Contents

- Project Overview
- Features
- Prerequisites
- Installation
- Usage
- API Endpoints
- License

## Project Overview

The Concert Hall Backend API provides endpoints to manage concerts, shows, and ticket sales. It stores and retrieves data about scheduled events and associated ticket sales, offering an interface for CRUD operations.

## Features

- Event Management: Create, edit, delete, and view events (concerts, shows, etc.)
- Ticket Management: Manage ticket sales for each event, including purchase and cancellation
- Data Storage: Uses MongoDB to store data with Mongoose as an ODM for schema definitions and database operations

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or a cloud database such as MongoDB Atlas)
- npm

## Installation

1. Clone this repository:

```
git clone https://github.com/your-username/concert-hall-backend.git
cd concert-hall-backend
```

2. Install dependencies:

`npm install`

3. Set up environment variables:

Create a .env file in the root directory and add the following:

```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Start the server:

- In development mode with Nodemon:

`npx nodemon server.js`

- Or directly with Node.js:

`node server.js`

5. Access the API at http://localhost:3000.

## Usage

This project is intended as a REST API for managing event and ticket data. It can be integrated with a frontend or accessed directly through an HTTP client like Postman for testing.

## API Endpoints

### Events

    Create event
    POST /events/create
    body: 
    {   
        "name": "Crazy Frog",
        "date": "2020-02-01",
    }

    Get all events
    GET /events

    Get events by date
    GET /events/availabilities?date=

    Get event by ID
    GET /events?id=

    Update Event
    PUT /events/edit?id=
    body:
    {   
        "name": "Crazy Frog",
        "date": "2020-02-01",
    }

    Delete Event
    DELETE /events/edit?id=

### Tickets

    Create ticket
    POST /tickets/book
    body:
    {
        "eventId": "6733787cf2048439b4bab0dc",
        "mail": "email@email.com",
        "username": "user123",
        "category": "orchestre",
        "seats": 2
    }

    Get all bookings
    GET /tickets

    Get all bookings for event
    GET /tickets?eventId=

    Get all bookings for a user
    GET /tickets?email=

    Get booking by ID
    GET /tickets?id=

    Update booking
    PUT /tickets?id=

    Cancel booking
    DELETE /tickets/cancel?id=

## License

This project is licensed under the MIT License.
