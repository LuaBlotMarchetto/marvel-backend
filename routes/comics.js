//imports des packages
const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const api_key = process.env.MARVEL_API_KEY;
//obtenir la liste des comics

router.get("/comics", async (req, res) => {
  try {
    let { skip, title } = req.query;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${
        process.env.MARVEL_API_KEY
      }&title=${title || ""}&skip=${skip || ""}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/comic/:comicId", async (req, res) => {
  try {
    const id = req.params.comicId;

    if (id) {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comic/${id}?apiKey=${process.env.MARVEL_API_KEY}`
      );
      res.json(response.data);
    } else {
      res.status(400).json({ message: "missing parameter" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const id = req.params.characterId;

    if (id) {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${process.env.MARVEL_API_KEY}`
      );
      res.json(response.data.comics);
    } else {
      res.status(400).json({ message: "missing parameter" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
