import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
  const handleSearch = (searchString) => {
    onSearch(searchString);
  };

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="h2 my-auto">
          AnimeFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={{ width: "100%" }}>
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to={`/users/${user.Username}`}>
                    Profile
                  </Nav.Link>
                  <Nav>
                    <Form.Control
                      id="searchbar"
                      type="search"
                      placeholder="Search.."
                      onChange={(event) => handleSearch(event.target.value)}
                    />
                  </Nav>
                </Nav>
                <Nav>
                  <Nav.Link
                    className="justify-content-end"
                    onClick={onLoggedOut}
                    style={{ marginLeft: "auto" }}
                  >
                    Sign out
                  </Nav.Link>
                </Nav>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
