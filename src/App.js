import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import * as gameService from './services/gameService';
import uniqid from 'uniqid';


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
  const navigate = useNavigate();

  const addComment = (gameId, comment) => {
    setGames(state => {
      const game = state.find(x => x._id == gameId);

      const comments = game.comments || [];
      comments.push(comment);

      return [
        ...state.filter(x => x._id != gameId),
        { ...game, comments }
      ];

    });
  };

  const addGameHandler = (gameData) => {
    setGames(state => [
      ...state,
      {
        ...gameData,
        _id: uniqid()
      },
    ]);

    navigate('/catalog');
  };

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
          <Route path="/create" element={<Create addGameHandler={addGameHandler} />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/catalog" element={<Catalog games={games} />} />
          <Route path="/catalog/:gameId" element={<GameDetails games={games} addComment={addComment} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
