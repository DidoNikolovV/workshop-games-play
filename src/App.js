import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import * as gameService from './services/gameService';


import './App.css';
import { Catalog } from './components/Catalog/Catalog';
import { Create } from './components/Create/Create';
import { Edit } from './components/Edit/Edit';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { GameDetails } from './components/GameDetails/GameDetails';

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    gameService.getAll()
      .then(result => {
        setGames(result);
      });
  }, []);

  return (
    <div id="box">
      <Header />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home games={games} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/catalog" element={<Catalog games={games} />} />
          <Route path="/catalog/:gameId" element={<GameDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
