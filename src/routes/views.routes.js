const express = require("express");
const path = require("path");

const router = express.Router();

// 🔹 GET - Páginas HTML
router.get("/professor", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/professor.html"));
});

router.get("/coordenacao-pooling", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/coordenacao-pooling.html"));
});

router.get("/coordenacao-long", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/coordenacao-long.html"));
});

router.get("/coordenacao-ws", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/coordenacao-ws.html"));
});

module.exports = router;
