import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [players, setPlayers] = useState([]);
    const [status, setStatus] = useState([]);

    // Registrar jugadores
    const registerPlayers = async () => {
        const response = await axios.post("http://localhost:5000/api/game/assign", {
            players: ["Alice", "Bob", "Charlie", "Diana"]
        });
        setPlayers(response.data.targets);
    };

    // Eliminar jugador
    const eliminatePlayer = async (player) => {
        const response = await axios.post("http://localhost:5000/api/game/eliminate", { player });
        setStatus(response.data.remaining);
    };

    // Obtener estado del juego
    const fetchStatus = async () => {
        const response = await axios.get("http://localhost:5000/api/game/status");
        setStatus(response.data.players);
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    return (
        <div>
            <h1>Battle Royale Game</h1>
            <button onClick={registerPlayers}>Asignar Jugadores</button>
            <ul>
                {status.map(({ player, target }) => (
                    <li key={player}>
                        {player} → {target}
                        <button onClick={() => eliminatePlayer(player)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;

