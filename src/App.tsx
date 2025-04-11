import React from 'react';
import logo from './logo.svg';
import './App.css';

import CreatePlaylistPage from './create-playlist';
import PlaylistView from './view-playlist';
import HomePage from './homepage';
function App() {
  return (
    <div className="App">
      <CreatePlaylistPage />
    </div>
  );
}

export default App;