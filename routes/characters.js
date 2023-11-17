//imports des packages
const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const api_key = process.env.MARVEL_API_KEY;

//obtenir la liste des personnages

router.get("/characters", async (req, res) => {
  try {
    let { limit, skip, name } = req.query;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${
        process.env.MARVEL_API_KEY
      }&name=${name || ""}&limit=${limit || ""}&skip=${skip || ""}`
    );
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const id = req.params.characterId;

    if (id) {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${process.env.MARVEL_API_KEY}`
      );
      res.json(response.data);
    } else {
      res.status(400).json({ message: "missing parameter" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
