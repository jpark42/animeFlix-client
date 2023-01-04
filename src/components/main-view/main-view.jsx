import React from 'react';

import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Your Name",
      image:
        <img src="images/your_name.jpg" />,
      description: "High-schoolers Mitsuha and Taki are complete Strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki's body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.",
      genre: "Romance",
      director: "Makoto Shinkai",
      featured: false,
    },
    {
      id: 2,
      title: "Spirited Away",
      image:
        <img src="images/spirited_away.jpg" />,
      description: "The movie tells the story of Chihiro, a young girl on a mission to rescue her family from the evil witch Yubaba, who turned them into pigs.",
      genre: "Adventure",
      director: "Hayao Miyazaki",
      featured: false,
    },
    {
      id: 3,
      title: "A Silent Voice",
      image:
        <img src="images/a_silent_voice.jpg" />,
      description: "This follows a moving story of Shoya Ishida, a school bully, and Shoko Nishimiya, a young girl with a hearing disability. Their story begins in sixth grade when Shoko transfer's to Shoya's elemnetary school and quickly finds herself bullied and isolated due to her hearing disability.",
      genre: "Romance",
      director: "Maoko Yamada",
      featured: false,
    },
  ]);

  /*Need to create a new state to identify whether there was a user click or not*/
  const [selectedMovie, setSelectedMovie] = useState(null); //Initial value of selectedMovie is null to tell the app that no movies were clicked, but it's state would be updated when a user clicks on a movie to render it's details

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
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
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