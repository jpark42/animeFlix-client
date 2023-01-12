import React from 'react';
import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.ImagePath} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div><div>
          <span>Genre: </span>
          <span>{movie.Genre}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director}</span>
        </div>
        <div>
          <span>Featured: </span>
          <span>{movie.Featured}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };

// Here is where we define all the props constraints for the BookCard
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired
    }).isRequired,
    Featured: PropTypes.boolean,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
