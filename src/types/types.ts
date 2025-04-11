
export interface User {
    user_id: number;
    name: string;
    password: string;
    DOB: string;
    location: string;
  }
  
  export interface Label {
    label_id: number;
    label_name: string;
  }
  
  export interface Artist {
    artist_id: number;
    name: string;
    label_id: number;
    label?: Label;
  }
  
  export interface Song {
    song_id: number;
    song_name: string;
    date_released: string;
    artists?: Artist[];
    genres?: string[];
  }
  
  export interface Genre {
    genre_id: number;
    genre_name: string;
  }
  
  export interface SongGenre {
    song_id: number;
    genre_id: number;
  }
  
  export interface SongArtist {
    song_id: number;
    artist_id: number;
  }
  
  export interface Playlist {
    playlist_id: number;
    name: string;
    users_id: number;
    user?: User;
    songs?: Song[];
    songCount?: number;
    likeCount?: number;
    imageUrl?: string;
  }
  
  export interface PlaylistSong {
    playlist_id: number;
    song_id: number;
  }
  
  export interface Note {
    note_id: number;
    song_id: number;
    playlist_id: number;
    note_text: string;
    note_date: string;
    song?: Song;
    playlist?: Playlist;
  }
  
  export interface LikedSong {
    track_id: string;
    track_name: string;
    album_name: string;
    artist_names: string;
    release_date: string;
    duration_ms: number;
    popularity: number;
    added_by: string | null;
    added_at: string;
    genres: string | null;
    record_label: string;
    danceability: number;
    energy: number;
    key_value: number;
    loudness: number;
    mode: number;
    speechiness: number;
    acousticness: number;
    instrumentalness: number;
    liveness: number;
    valence: number;
    tempo: number;
    time_signature: number;
  }
  
  // Activity type for user activity feed
  export interface Activity {
    id: number;
    type: 'played' | 'created' | 'liked' | 'added_note';
    user_id: number;
    entity_id: number;
    entity_type: 'song' | 'playlist' | 'note';
    timestamp: Date;
    user?: User;
    details?: any;
  }
  
  // Types for analytics
  export interface DemographicData {
    age_group: string;
    song_id: number;
    count: number;
    song?: Song;
  }
  
  export interface GenreCommentData {
    genre: string;
    comment_count: number;
    song_count: number;
    avg_per_song: number;
  }
  
  export interface CommentedSong {
    song_id: number;
    title: string;
    artist_id: number | null;
    artist_name: string;
    genre: string;
    comment_count: number;
    last_week_count: number;
  }