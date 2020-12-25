import React, {useState}  from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import '../../Pages/Pages.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/*function validateForm() {
  return email.length > 0 && password.length > 0;
}*/

export default class LoginUser extends React.Component {
  state = {
    Email: '',
    Password: ''

  }

  handleChange = event => {
    this.setState({ Email: event.target.value });
  }
  handleChange2 = event => {
    this.setState({ Password: event.target.value });
  }

 
  handleSubmit = event => {
    event.preventDefault();
    const user = {
        Email: this.state.Email,
        Password: this.state.Password
    };
    JSON.stringify(user);
    axios({
      method: 'post',
      url: "https://localhost:44327/api/Account/Login",
      data: JSON.stringify(user),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {'Content-Type': 'application/json'}
  })
      .then(res => {
        console.log("RESPONSE ", res);
        console.log(res.data);
      })
  }

  render() {
    return (     
      <div className="Login">
      <Form onSubmit={this.handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={this.handleChange2}
          />
        </Form.Group>
        <Button block size="lg" type="submit">
          Login
        </Button>
      </Form>
    </div>
    )
  }
}