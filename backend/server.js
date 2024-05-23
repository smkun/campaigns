//server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const campaigns = require("./routes/campaigns");
const characters = require("./routes/characters");
const places = require("./routes/places");
const notes = require("./routes/notes");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

// Use Routes
app.use("/api/campaigns", campaigns);
app.use("/api/characters", characters);
app.use("/api/places", places);
app.use("/api/notes", notes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
