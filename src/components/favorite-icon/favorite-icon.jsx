import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

// to get right color of Icon we need to refresh the page
export const FavoriteIcon = ({ isFavorite, user, movie, updateUserOnFav }) => {
  const token = localStorage.getItem("token");
  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavorite = () => {
    if (!token) return;

    const url = `https://myanimeflix.herokuapp.com/users/${user.Username}/movies/${movie.id}`;

    let requestOptions = {
      method: "",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let resultAlert = "";

    if (favorite) {
      requestOptions.method = "DELETE";
      resultAlert = `${movie.Title} is deleted from the list of favorites`;
    } else {
      requestOptions.method = "POST";
      resultAlert = `${movie.Title} is added to the list of favorites`;
    }

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        alert(`${resultAlert}`);
        // console.log(updateUserOnFav);
        updateUserOnFav(data);
        setFavorite(!favorite);
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Link
      onClick={() => toggleFavorite()}
      className="favorite-icon"
      id="favMovieButton"
    >
      <FaHeart className={`${favorite ? "favorite-movie" : ""}`} />
    </Link>
  );
};
