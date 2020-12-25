import React, {useState}  from 'react';
import axios from 'axios';
import './Login.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAppContext } from "../Libs/ContextLib";
import history from "../GlobalHistory/GlobalHistory"

export default function LoginUser() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userHasAuthenticated } = useAppContext();
  const { setUserEmail } = useAppContext();

  function handleSubmit(event) {
    event.preventDefault();
    const user = {
        Email: email,
        Password: password
    };
    JSON.stringify(user);
    axios({
      method: 'post',
      url: "https://edurangers.azurewebsites.net/api/Account/Login",
      data: JSON.stringify(user),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        console.log("RESPONSE ", res);
        console.log(res.data);
        if(res.data.Succedeed){
          userHasAuthenticated(true);
          setUserEmail(user.Email);
          alert("You`ve been succesfully logged in");
          history.push("/");
        }  
        else alert("Wrong email or password");
      })
      
  }

    return (     
      <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit">
          Login
        </Button>
      </Form>
    </div>
    )
}