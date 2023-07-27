import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './Home Page/HomePage';
import Game from './game_hangman/App';
import Todo from './Todo/TodoList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/hangman' element={<Game />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </Router>
  );
};

export default App;
