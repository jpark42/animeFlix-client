import React from "react";

import { UpdateView } from "./update-view";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { DeleteUser } from "./delete-user";

export const ProfileView = ({ movies, user, setUser }) => {
  const storedToken = localStorage.getItem("token");

  return (
    <>
      <UserInfo user={user} />
      <UpdateView storedToken={storedToken} user={user} setUser={setUser} />
      <DeleteUser storedToken={storedToken} user={user} />
      <FavoriteMovies movies={movies} user={user} setUser={setUser} />
    </>
  );
};
