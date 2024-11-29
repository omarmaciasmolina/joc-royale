const express = require("express");
const router = express.Router();
const { assignTargets, eliminatePlayer, getGameStatus } = require("../controllers/gameController");

// Rutas del juego
router.post("/assign", assignTargets);
router.post("/eliminate", eliminatePlayer);
router.get("/status", getGameStatus);

module.exports = router;

