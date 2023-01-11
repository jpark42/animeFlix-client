import React, { useState, useEffect } from 'react';

import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  
  /*Need to create a new state to identify whether there was a user click or not*/
  const [selectedMovie, setSelectedMovie] = useState(null); //Initial value of selectedMovie is null to tell the app that no movies were clicked, but it's state would be updated when a user clicks on a movie to render it's details
  useEffect(() => {
    fetch("https://myanimeflix.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
      //console.log("movies from api:", data);
      const moviesFromApi = data.map((movie) => {
        return { 
          id: movie._id,
          Title: movie.Title,
          Description: movie.Description, 
          Genre: movie.Genre,
          Director: movie.Director,
          ImagePath: movie.ImagePath,
          Featured: movie.Featured
        };
      });
      //setMovies callback from useState() Hook updates the state of the component, updating the UI
      setMovies(moviesFromApi);
    })
    .catch(err => {
      console.log(err)
    });
  }, []);

  
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} /> //Assigning "null" to the selectedMovie state will allow MainView to stop rendering <MovieView ... /> The conditional if(selectedMovie) will return false, thus skip returning <MovieView ... />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => ( //Map() method creates a new array populated with the results of calling a provided function on every element in the calling array
        <MovieCard
          key={movie.id} // Key attribute must be unique and is used so that React can easily find elements in your list to be changed or removed from the DOM
          movie={movie} //this is how you pass data to a child component. This is attribute is referred to as "props"
          onMovieClick={(newSelectedMovie) => {
            //Pass a function as a prop through onMovieClick. It has a function with one paramater that represents the book to be set to selectedMovie state
            setSelectedMovie(newSelectedMovie); //this is the setter function that was created earlier in useState()
          }}
        />
      ))}
    </div>
  );
};