import React, { useState } from "react";
import {
  Button,
  Card,
  CardGroup,
  Form,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { API_URL } from "../../constants";
import { EntranceGreeting } from "../entrance-greeting/entrance-greeting";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`${API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful!");
      } else {
        response.json().then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert("Signup Failed");
          }
        });
      }
    });
  };

  return (
    <Container>
      <EntranceGreeting />
      <Row>
        <Col>
          <CardGroup>
            <Card className="border-0 login-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername" className="mt-2">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength="5"
                      placeholder="Enter your desired username"
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword mt-3">
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
                  <Form.Group controlId="formEmail mt-3">
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
                  <Form.Group controlId="formBirthday mt-3">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Row>
                    <Col className="text-center">
                      <Button className="secondary mt-3" type="submit">
                        Register
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};
