const db = require("../database");

// Asignar objetivos al azar
exports.assignTargets = async (req, res) => {
    try {
        const { players } = req.body; // Lista de jugadores
        const shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
        const targets = shuffledPlayers.map((player, i) => ({
            player,
            target: shuffledPlayers[(i + 1) % players.length],
        }));
        await db.query("DELETE FROM targets");
        for (const { player, target } of targets) {
            await db.query("INSERT INTO targets (player, target) VALUES ($1, $2)", [player, target]);
        }
        res.json({ message: "Targets assigned", targets });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar jugador
exports.eliminatePlayer = async (req, res) => {
    try {
        const { player } = req.body; // Jugador eliminado
        await db.query("DELETE FROM targets WHERE player = $1", [player]);
        const remaining = await db.query("SELECT * FROM targets");
        res.json({ message: "Player eliminated", remaining: remaining.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Estado del juego
exports.getGameStatus = async (req, res) => {
    try {
        const players = await db.query("SELECT * FROM targets");
        res.json({ players: players.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

