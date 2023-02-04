import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movieData }) => {
  return (
    <Card className="h-100 card-color">
      <Row>
        <Col className="h-100 text-center mt-3">
          <Card.Img
            variant="top"
            src={movieData.ImagePath}
            className="img-fluid h-100 w-auto movie-card-img"
          />
        </Col>
      </Row>

      <Card.Body className="d-flex flex-column text-center">
        <Card.Title className="mt-3">
          <h3>{movieData.Title}</h3>
        </Card.Title>
        <Card.Text className="my-0">
          <h5>{movieData.Director.Name}</h5>
        </Card.Text>
        <Link
          to={`/movies/${encodeURIComponent(movieData.id)}`}
          className="mt-auto text-center"
        >
          <Button className="main" variant="link">
            Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the BookCard
MovieCard.propTypes = {
  movieData: PropTypes.shape({
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
  //onMovieClick: PropTypes.func.isRequired,
};
