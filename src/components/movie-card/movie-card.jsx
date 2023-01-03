import React from 'react';

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        /*passed a callback function to onClick and then added logic to onMovieClick(movie) that you need to execute once a click event is registered*/
        onClick={() => {
          onMovieClick(movie); //reusing a prop that was used earlier
        }}
      >
        {movie.title}
      </div>
    );
  };
  