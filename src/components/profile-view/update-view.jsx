import React, { useState } from "react";
import { Button, Form, Row, Col, CardGroup, Card } from "react-bootstrap";
import { API_URL } from "../../constants";

export const UpdateView = ({ storedToken, storedUser }) => {
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [user, setUser] = useState(storedUser ? storedUser : null);

  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const updateUser = (username) => {
    fetch(`${API_URL}/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        if (updatedUser) {
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`${API_URL}/users/${storedUser.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Changes saved");
          updateUser(username);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CardGroup>
      <Card className="border-0 login-card">
        <Card.Body>
          <div className="text-start h2 mb-0">Update user info</div>
          <Form onSubmit={handleSubmit}>
            <Row className="mt-2 d-flex justify-content-between">
              <Col md={6}>
                <Form.Group controlId="formUsername" className="mt-2">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} //Assigning the value of the form fields to two new state variables so you can use them here. This is known as binding
                    minLength="5"
                    required
                    placeholder="Enter your username"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPassword" className="mt-2">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="5"
                    placeholder="Create a password"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formEmail" className="mt-2">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Form.Text>
                  <p className="text-left muted-text-font">
                    We'll never share your email with anyone else.
                  </p>
                </Form.Text>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formBirthday" className="mt-2">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button className="secondary mt-3" type="submit">
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </CardGroup>
  );
};
