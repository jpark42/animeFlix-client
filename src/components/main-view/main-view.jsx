import React, { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null); //When you reload the page, the user and token will be initialized with what is in localStorage. If it’s empty, both will be initialized with null
  const [token, setToken] = useState(storedToken ? storedToken : null); //null represents the state when no user is logged in for both token and user
  const [movies, setMovies] = useState([]);
  /*Need to create a new state to identify whether there was a user click or not*/
  const [selectedMovie, setSelectedMovie] = useState(null); //Initial value of selectedMovie is null to tell the app that no movies were clicked, but it's state would be updated when a user clicks on a movie to render it's details

  //Token state is initally blank, meaning no movies are loaded. This will set it to the token you get back from the login API. At that moment, the UI will update and load the list of movies using the token
  useEffect(() => {
    if (!token) {
      //if statement added to check for token, as there’s no reason to execute the fetch call if there’s no token yet.
      return;
    }

    fetch("https://myanimeflix.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }, //Passing bearer authorization in the header of your HTTP requests allows you to make authenticated requests to your API
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: {
            Name: movie.Genre.Name,
            Description: movie.Genre.Description,
          },
          Director: {
            Name: movie.Director.Name,
            Bio: movie.Director.Bio,
            Birth: movie.Director.Birth,
            Death: movie.Director.Death,
          },
          ImagePath: movie.ImagePath,
          Featured: movie.Featured || false, //logical operator. Show true OR false
        }));
        console.log(data);
        //setMovies callback from useState() Hook updates the state of the component, updating the UI
        setMovies(moviesFromApi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]); //2nd arugment of useEffect() is token as a dependency array. It ensures fetch is called every time token changes

  if (!user) {
    //Pass a prop from MainView with a callback function that will update the current user.
    return (
      <>
        <LoginView //When  no one is logged in, LoginView is displayed
          onLoggedIn={(user, token) => {
            setUser(user); //storing user as a state variable for setUser
            setToken(token); //storing token as a state variable for setToken
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  /*if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      /> //Assigning "null" to the selectedMovie state will allow MainView to stop rendering <MovieView ... /> The conditional if(selectedMovie) will return false, thus skip returning <MovieView ... />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  */

  return (
    <div>
      {movies.map(
        (
          movie //Map() method creates a new array populated with the results of calling a provided function on every element in the calling array
        ) => (
          <MovieCard
            key={movie.id} // Key attribute must be unique and is used so that React can easily find elements in your list to be changed or removed from the DOM
            movie={movie} //this is how you pass data to a child component. This is attribute is referred to as "props"
            onMovieClick={(newSelectedMovie) => {
              //Pass a function as a prop through onMovieClick. It has a function with one paramater that represents the book to be set to selectedMovie state
              setSelectedMovie(newSelectedMovie); //this is the setter function that was created earlier in useState()
            }}
          />
        )
      )}
      <button
        onClick={() => {
          setUser(null); //nullify user once user logs out
          setToken(null); //nullify token once user logs out
          localStorage.clear(); //clear localStorage once user logs out. If you refresh, user will have to login again
        }}
      >
        Logout
      </button>
    </div>
  );
};
