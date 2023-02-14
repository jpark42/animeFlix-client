import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FavoriteIcon } from "../favorite-icon/favorite-icon";

// MovieView receives property from MainView movies
export const MovieView = ({ movies, user, updateUserOnFav }) => {
  console.log("MovieView prop", updateUserOnFav);
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const favoriteMovies = user.FavoriteMovies;
  const isFavorite = favoriteMovies.some((movieId) => movie.id === movieId);

  return (
    <Row className="d-flex flex-row-reverse p-3">
      <Col lg={5} md={12} sm={12} className="mb-4 text-center">
        <img
          src={movie.ImagePath}
          className="img-fluid h-100 w-auto movie-view-img"
        />
      </Col>
      <Col lg={7} className="d-flex flex-column">
        <Row className="d-flex flex-row justify-content-between">
          <Col className="d-flex flex-column">
            <h3 className="my-0 fw-bolder">
              <span>Title: </span>
              <span>{movie.Title}</span>
            </h3>
            <h5 className="mt-1 text-left">
              <span>Director: </span>
              <span>{movie.Director.Name}</span>
            </h5>
          </Col>
        </Row>
        <Row className="my-0">
          <Col className="mb-2 text-start text-left movie-header-font">
            <span>Genre: </span>
            <span>{movie.Genre.Name}</span>
          </Col>
          <Col className="mb-2 text-middle movie-header-font">
            <span>Featured: </span>
            <span>{movie.Featured ? "Yes" : "No"}</span>
          </Col>
        </Row>
        <div className="mt-2 mb-4">
          <div className="text-decoration-underline mb-2">Description: </div>
          <span>{movie.Description}</span>
        </div>
        <Row className="d-flex flex-row justify-content-between mt-auto mb-md-4">
          <Col className="text-start">
            <FavoriteIcon
              user={user}
              movie={movie}
              isFavorite={isFavorite}
              updateUserOnFav={updateUserOnFav}
            />
          </Col>
          <Col className="mt-auto text-end mb-md-4">
            <Link to={`/`}>
              <Button className="secondary" size="lg">
                Back
              </Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      Description: PropTypes.string,
      ImagePath: PropTypes.string,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string.isRequired,
      }).isRequired,
      Featured: PropTypes.bool,
    })
  ).isRequired,
  //onBackClick: PropTypes.func.isRequired,
};
