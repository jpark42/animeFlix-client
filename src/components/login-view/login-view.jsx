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

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    //this prevents default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json()) //This transforms the response content into a JSON object that your code can use to extract the JWT sent by your API
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user)); //After a successful login, storing the user object in localStorage so the data isn't lost after you refresh the page
          localStorage.setItem("token", data.token); //After a successful login, storing the token in localStorage so the data isn't lost after you refresh the page
          onLoggedIn(data.user, data.token); //This passes the user and token back to MainView so they can be used in all the subsequent API requests
        } else {
          alert("No such user!");
        }
      })
      .catch((e) => {
        alert("Something went wrong!");
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
                      onChange={(e) => setUsername(e.target.value)} //Assigning the value of the form fields to two new state variables so you can use them here. This is known as binding
                      minLength="5"
                      required
                      placeholder="Enter your username"
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} //Assigning the value of the form fields to two new state variables so you can use them here. This is known as binding
                      minLength="5"
                      required
                      placeholder="Enter your password"
                    />
                  </Form.Group>
                  <Row>
                    <Col className="text-center">
                      <Button className="main mt-3" type="submit">
                        Login
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
