import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form'

function App() {

  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);

  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 5a6cce932b1afeb1ded4436b0adb20050e5ee062'
      }
    })
      .then(resp => resp.json())
      .then(resp => setMovies(resp))
      .catch(error => console.log(error))
  }, [])



  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }
  const editClicked = movie => {
    setSelectedMovie(null);
    setEditedMovie(movie);

  }
  const updatedMovie = movie => {

    const newMovies = movies.map(mov => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    })

    setMovies(newMovies)
  }

  const newMovie = () => {
    setEditedMovie({ title: '', description: '' });
    setSelectedMovie(null);

  }
  const movieCreated = movie => {

    const newMovies = [...movies, movie];
    setMovies(newMovies);


  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Films rater application</h1>

      </header>
      <div className="layout">

        <div>
          <MovieList movies={movies} movieClicked={loadMovie} editClicked={editClicked} />
          <button onClick={newMovie}>New movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
        {editedMovie ? <MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated} /> : null}


      </div>
    </div>
  );
}

export default App;
