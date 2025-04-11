import React, { useState, useEffect } from 'react';
import '../base.css';
import './index.css';
import Navbar from '../navbar/navbar';

// Define interfaces based on the ER diagram
interface Artist {
  artist_id: number;
  name: string;
  genre: string;
}

interface Song {
  song_id: number;
  title: string;
  artist_id: number;
  genre: string;
  release_date: Date;
  artist?: Artist; // Join data
  album?: string;  // Added album property
}

interface Note {
  note_id: number;
  song_id: number;
  user_id: number;
  note_text: string;
  note_date: Date;
}

interface User {
  user_id: number;
  name: string;
}

interface Playlist {
  playlist_id: number;
  name: string;
  user_id: number;
  song_ids: number[];
}

const CreatePlaylistPage: React.FC = () => {
  // Playlist details state
  const [playlistName, setPlaylistName] = useState<string>('');
  const [playlistDescription, setPlaylistDescription] = useState<string>('');
  const [playlistImage, setPlaylistImage] = useState<string | null>(null);
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [songNotes, setSongNotes] = useState<Record<number, string>>({});
  const [noteDialogOpen, setNoteDialogOpen] = useState<boolean>(false);
  const [currentSongForNote, setCurrentSongForNote] = useState<Song | null>(null);
  const [currentNote, setCurrentNote] = useState<string>('');

  // Mock database of songs - in a real app, this would come from your API
  const songDatabase: Song[] = [
    { 
      song_id: 1, 
      title: "Sports Car", 
      artist_id: 1, 
      genre: "Pop", 
      release_date: new Date('1990-04-14'), 
      artist: { artist_id: 1, name: "Tate Mcrae", genre: "Rock" },
      album: "Little Death"
    },
    { 
      song_id: 2, 
      title: "Diet Pepsi", 
      artist_id: 2, 
      genre: "Pop", 
      release_date: new Date('2008-05-12'), 
      artist: { artist_id: 2, name: "Addison Rae", genre: "Indie" },
      album: "Diet Pepsi"
    },
    { 
      song_id: 3, 
      title: "Only A Fool Would Say That", 
      artist_id: 3, 
      genre: "Jazz Rock", 
      release_date: new Date('1972-11-01'), 
      artist: { artist_id: 3, name: "Steely Dan", genre: "Jazz Rock" },
      album: "Can't Buy A Thrill"
    },
    { 
      song_id: 4, 
      title: "You Know I'm Down", 
      artist_id: 4, 
      genre: "Indie Rock", 
      release_date: new Date('2008-01-01'), 
      artist: { artist_id: 4, name: "Frog", genre: "Indie Rock" },
      album: "Count Bateman"
    },
    { 
      song_id: 5, 
      title: "The Skin of My Yellow Country Teeth", 
      artist_id: 5, 
      genre: "Indie Rock", 
      release_date: new Date('2004-03-23'), 
      artist: { artist_id: 5, name: "Clap Your Hands Say Yeah", genre: "Indie Rock" },
      album: "Clap Your Hands Say Yeah"
    },
    { 
      song_id: 6, 
      title: "I Never Want to See You Again", 
      artist_id: 6, 
      genre: "Experimental", 
      release_date: new Date('2003-09-09'), 
      artist: { artist_id: 6, name: "Quasi", genre: "Experimental" },
      album: "Featuring \"Birds\""
    },
    { 
      song_id: 7, 
      title: "You Are Every Girl to Me", 
      artist_id: 7, 
      genre: "Folk", 
      release_date: new Date('2017-05-05'), 
      artist: { artist_id: 7, name: "MJ Lenderman", genre: "Folk" },
      album: "Boat Songs"
    },
    { 
      song_id: 8, 
      title: "Ibuprofen", 
      artist_id: 8, 
      genre: "Electronic", 
      release_date: new Date('2021-08-15'), 
      artist: { artist_id: 8, name: "Blaketheman1000", genre: "Electronic" },
      album: "Ibuprofen"
    },
    { 
      song_id: 9, 
      title: "American", 
      artist_id: 4, 
      genre: "Indie Rock", 
      release_date: new Date('2018-04-18'), 
      artist: { artist_id: 4, name: "Frog", genre: "Indie Rock" },
      album: "Whatever We Probably Already Had"
    },
    { 
      song_id: 10, 
      title: "Gravity Rides Everything", 
      artist_id: 9, 
      genre: "Indie Rock", 
      release_date: new Date('2000-03-14'), 
      artist: { artist_id: 9, name: "Modest Mouse", genre: "Indie Rock" },
      album: "The Moon & Antarctica"
    },
    { 
      song_id: 11, 
      title: "You Have Bought Yourself A Boat", 
      artist_id: 7, 
      genre: "Folk", 
      release_date: new Date('2017-05-05'), 
      artist: { artist_id: 7, name: "MJ Lenderman", genre: "Folk" },
      album: "Boat Songs"
    },
    { 
      song_id: 12, 
      title: "Asc. Scorpio", 
      artist_id: 10, 
      genre: "Experimental", 
      release_date: new Date('2022-02-11'), 
      artist: { artist_id: 10, name: "Oracle Sisters", genre: "Experimental" },
      album: "Asc. Scorpio"
    }
  ];

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = songDatabase.filter(
      song => 
        song.title.toLowerCase().includes(query) || 
        song.artist?.name.toLowerCase().includes(query) ||
        song.genre.toLowerCase().includes(query)
    );
    setSearchResults(results);
  }, [searchQuery]);

  // Handle adding song to playlist
  const addSongToPlaylist = (song: Song) => {
    if (!selectedSongs.some(s => s.song_id === song.song_id)) {
      setSelectedSongs([...selectedSongs, song]);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  // Handle removing song from playlist
  const removeSongFromPlaylist = (songId: number) => {
    setSelectedSongs(selectedSongs.filter(song => song.song_id !== songId));
    
    // Also remove any notes for this song
    const updatedNotes = { ...songNotes };
    delete updatedNotes[songId];
    setSongNotes(updatedNotes);
  };

  // Handle note dialog
  const openNoteDialog = (song: Song) => {
    setCurrentSongForNote(song);
    setCurrentNote(songNotes[song.song_id] || '');
    setNoteDialogOpen(true);
  };

  const saveNote = () => {
    if (currentSongForNote) {
      setSongNotes({
        ...songNotes,
        [currentSongForNote.song_id]: currentNote
      });
    }
    setNoteDialogOpen(false);
  };

  // Handle playlist save
  const savePlaylist = () => {
    if (!playlistName.trim()) {
      alert('Please provide a playlist name');
      return;
    }

    // In a real app, you would send the playlist data to your backend
    const playlist: Playlist = {
      playlist_id: Math.floor(Math.random() * 1000), // Just for demo
      name: playlistName,
      user_id: 1, // Assuming logged in user has ID 1
      song_ids: selectedSongs.map(song => song.song_id)
    };

    // Create notes from the songNotes object
    const notes: Note[] = Object.entries(songNotes).map(([songId, noteText]) => ({
      note_id: Math.floor(Math.random() * 1000), // Just for demo
      song_id: parseInt(songId),
      user_id: 1, // Assuming logged in user has ID 1
      note_text: noteText,
      note_date: new Date()
    }));

    console.log('Saving playlist:', playlist);
    console.log('Saving notes:', notes);
    alert('Playlist saved successfully!');
    
    // Reset form
    setPlaylistName('');
    setPlaylistDescription('');
    setPlaylistImage(null);
    setSelectedSongs([]);
    setSongNotes({});
  };

  // Helper function to format date
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Navbar activePage="create" />
      <div className="create-playlist-container">
        <header className="create-playlist-header">
          <h1 className="create-playlist-title">Create New Playlist</h1>
          <p className="create-playlist-subtitle">Add songs and personal notes to your playlist</p>
        </header>

      <div className="create-playlist-grid">
        {/* Playlist Details */}
        <div className="playlist-details-section">
          <div className="card playlist-details-card">
            <div className="card-header">
              <h2 className="card-title">Playlist Details</h2>
            </div>
            <div className="card-content">
              <div className="form-group">
                <label className="form-label">Playlist Name</label>
                <input
                  type="text"
                  placeholder="My Awesome Playlist"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  className="input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  placeholder="What's this playlist about?"
                  value={playlistDescription}
                  onChange={(e) => setPlaylistDescription(e.target.value)}
                  rows={3}
                  className="textarea"
                />
              </div>
            </div>
            <div className="card-footer">
              <button 
                onClick={savePlaylist} 
                className="btn-primary" 
                style={{ width: '100%' }}
                type="button"
              >
                Save Playlist
              </button>
            </div>
          </div>
        </div>

        {/* Search and Add Songs */}
        <div className="songs-section">
          <div className="card mb-4">
            <div className="card-header">
              <h2 className="card-title">Add Songs</h2>
              <p className="search-description">Search for songs to add to your playlist</p>
            </div>
            <div className="card-content">
              <div className="search-container">
                <div className="search-input-wrapper">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search by song title, artist, or genre"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {searchResults.length > 0 && (
                <div className="search-results">
                  <table className="songs-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Genre</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map(song => (
                        <tr key={song.song_id}>
                          <td>{song.title}</td>
                          <td>{song.artist?.name}</td>
                          <td>{song.genre}</td>
                          <td style={{ textAlign: 'right' }}>
                            <button 
                              onClick={() => addSongToPlaylist(song)} 
                              className="song-action-btn"
                              title="Add to playlist"
                              type="button"
                            >
                              +
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {searchQuery && searchResults.length === 0 && (
                <div className="search-results-empty">
                  No songs found matching your search.
                </div>
              )}
            </div>
          </div>

          {/* Selected Songs */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Playlist Songs</h2>
              <p className="playlist-songs-count">
                {selectedSongs.length === 0 
                  ? "No songs added yet" 
                  : `${selectedSongs.length} song${selectedSongs.length === 1 ? '' : 's'} in playlist`}
              </p>
            </div>
            <div className="card-content">
              {selectedSongs.length > 0 ? (
                <div className="search-results">
                  <table className="songs-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSongs.map(song => (
                        <tr key={song.song_id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              {song.title}
                              {songNotes[song.song_id] && (
                                <span className="note-indicator">
                                  🗨️
                                </span>
                              )}
                            </div>
                          </td>
                          <td>{song.artist?.name}</td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
                              <button 
                                onClick={() => openNoteDialog(song)} 
                                className={`song-action-btn note-btn ${songNotes[song.song_id] ? 'has-note' : ''}`}
                                title="Add note"
                                type="button"
                              >
                                📝
                              </button>
                              <button 
                                onClick={() => removeSongFromPlaylist(song.song_id)} 
                                className="song-action-btn remove-btn"
                                title="Remove song"
                                type="button"
                              >
                                ✕
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="playlist-songs-empty">
                  <div className="playlist-songs-empty-icon">🎵</div>
                  <p className="playlist-songs-empty-text">Search and add songs to your playlist</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Note Dialog */}
      {noteDialogOpen && (
        <div className="note-dialog-overlay">
          <div className="note-dialog">
            <h3 className="note-dialog-title">
              Add Note to "{currentSongForNote?.title}"
            </h3>
            <p className="note-dialog-subtitle">
              by {currentSongForNote?.artist?.name}
            </p>
            
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="What do you want to remember about this song?"
              className="note-dialog-textarea"
            />
            
            <div className="note-dialog-buttons">
              <button 
                className="note-dialog-cancel"
                onClick={() => setNoteDialogOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button 
                className="note-dialog-save"
                onClick={saveNote}
                type="button"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default CreatePlaylistPage;