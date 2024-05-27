// Import required modules
const express = require("express"); // Express framework for building web applications
const mongoose = require("mongoose"); // Mongoose library for MongoDB object modeling
const bodyParser = require("body-parser"); // Middleware to parse incoming request bodies
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const campaigns = require("./routes/campaigns"); // Campaigns routes module
const characters = require("./routes/characters"); // Characters routes module
const places = require("./routes/places"); // Places routes module
const notes = require("./routes/notes"); // Notes routes module

// Initialize Express application
const app = express();

// Bodyparser Middleware
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies
app.use(cors()); // Use CORS middleware to allow cross-origin requests

// DB Config
const db = require("./config/keys").mongoURI; // Load MongoDB URI from configuration file

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true }) // Connect to MongoDB using the provided URI and options
    .then(() => console.log("MongoDB Connected...")) // Log a success message if connection is successful
    .catch((err) => console.log(err)); // Log any connection errors

// Use Routes
app.use("/api/campaigns", campaigns); // Mount the campaigns routes at /api/campaigns
app.use("/api/characters", characters); // Mount the characters routes at /api/characters
app.use("/api/places", places); // Mount the places routes at /api/places
app.use("/api/notes", notes); // Mount the notes routes at /api/notes

// Define the port the server will listen on
const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`)); // Start listening for incoming requests and log the port
