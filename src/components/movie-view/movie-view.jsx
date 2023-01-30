import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    //Make it so that the img goes on top of the movie text when screen is smaller
    <Row className="d-flex flex-row-reverse p-3">
      <Col md={5} sm={12} className="mb-4 text-center text-md-end">
        <img
          src={movie.ImagePath}
          className="img-fluid h-100 w-auto movie-view-img"
        />
      </Col>
      <Col md={7} className="d-flex flex-column">
        <Row className="d-flex flex-row justify-content-between">
          <Col className="d-flex flex-column">
            <h3 className="my-0 fw-bolder">
              <span>Title: </span>
              <span>{movie.Title}</span>
            </h3>
            <h5 className="mt-1 text-lef">
              <span>Director: </span>
              <span>{movie.Director.Name}</span>
            </h5>
          </Col>
        </Row>
        <Row className="my-0">
          <Col md={6} className="mb-2 text-start text-left movie-header-font">
            <span>Genre: </span>
            <span>{movie.Genre.Name}</span>
          </Col>
          <Col md={6} className="mb-2 text-middle movie-header-font">
            <span>Featured: </span>
            <span>{movie.Featured ? "Yes" : "No"}</span>
          </Col>
        </Row>
        <div className="mt-2 mb-4">
          <div className="text-decoration-underline mb-2">Description: </div>
          <span>{movie.Description}</span>
        </div>
        <div className="mt-auto text-start mb-md-4">
          <Button className="secondary" onClick={onBackClick} size="lg">
            Back
          </Button>
        </div>
      </Col>
    </Row>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieView.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
