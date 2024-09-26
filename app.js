const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;
const OMDB_API_KEY = "b8f8ec5a"; // Replace this with your OMDB API key

// Set up EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route to render the form
app.get("/", (req, res) => {
  res.render("index", { movie: null, error: null });
});

// Route to handle form submission and fetch movie details
app.post("/search", async (req, res) => {
  const movieName = req.body.movieName;
  const apiUrl = `http://www.omdbapi.com/?t=${movieName}&apikey=${OMDB_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    const movie = response.data;

    if (movie.Response === "False") {
      res.render("index", { movie: null, error: "Movie not found!" });
    } else {
      res.render("index", { movie: movie, error: null });
    }
  } catch (error) {
    res.render("index", { movie: null, error: "Error fetching data!" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
