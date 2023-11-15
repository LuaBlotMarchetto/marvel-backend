//import des packages
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

//creation du serveur
const app = express();
//securisation du frontend
app.use(cors());
//recuperation des données body des routes en post
app.use(express.json());

//import des routesn
const comicsRoutes = require("./routes/comics");
const charactersRoutes = require("./routes/characters");

app.use(comicsRoutes);
app.use(charactersRoutes);

// route générale
app.all("*", (req, res) => {
  res.status(404).json({ message: "API Marvel de Lua Blot-Marchetto" });
});

//mise en place de l'écoute
app.listen(process.env.PORT, () => {
  console.log("server has started");
});
