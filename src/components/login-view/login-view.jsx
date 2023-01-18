import React, { useState } from 'react';


export const LoginView = ({ onLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    //this prevents default behavior of the form which is to reload the entire page
    event.preventDefault();
  

    const data = {
      access: username,
      secret: password
    };

    fetch('https://myanimeflix.herokuapp.com/login?Username=${username}&Password=${password}', {
      method: "POST",
      headers: {
        "Content-Type": "application.json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json()) //This transforms the response content into a JSON object that your code can use to extract the JWT sent by your API
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user)); //After a successful login, storing the user object in localStorage so the data isn't lost after you refresh the page
        localStorage.setItem("token", data.token); //After a successful login, storing the token in localStorage so the data isn't lost after you refresh the page
        onLoggedIn(data.user, data.token); //This passes the user and token back to MainView so they can be used in all the subsequent API requests
      } else {
        alert("No such user");
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    });
  };


  return (
   <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}//Assigning the value of the form fields to two new state variables so you can use them here. This is known as binding
          minLength="5"
          required
        />
      </label>
      <label>
        Password:
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}//Assigning the value of the form fields to two new state variables so you can use them here. This is known as binding
          minLength="5"
          required
        />
      </label>
      <button type="submit">
        Submit
      </button>
    </form>
  );
};







  