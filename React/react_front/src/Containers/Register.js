import React, {useState}  from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Register.css';
import { useAppContext } from "../Libs/ContextLib";
import history from "../GlobalHistory/GlobalHistory"

export default function PostUser() {
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [name, setName] = useState("");
  const [isprofessor, setIsProfessor] = useState(false);
  const { userHasAuthenticated } = useAppContext();
  const { setUserEmail } = useAppContext();
 
  function handleSubmit (event) {
    event.preventDefault();
    const user = {
        Email: email,
        Password: password,
        ConfirmPassword: confPassword,
        Name: name,
        isprofessor: isprofessor.toString()
    };
    JSON.stringify(user);
    console.log(user);
    axios({
      method: 'post',
      url: "https://edurangers.azurewebsites.net/api/Account/Register",
      data: JSON.stringify(user),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {'Content-Type': 'application/json'}
  })
      .then(res => {
        console.log("RESPONSE ", res);
        console.log(res.data);
        setStatus(res.data.Succedeed)
      })
      console.log(status);
      if(status){
          userHasAuthenticated(true);
          setUserEmail(user.Email);
          alert("You`ve been succesfully registered");
          history.push("/");
        }  
        else alert("You haven`t been registered");
    }

      function handleCheckboxChange(event){
          setIsProfessor(!isprofessor);
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
          <Form.Group size="lg" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
            onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="isprofessor" style={{display: 'flex',
                                                        flexFlow: 'row',
                                                        justifyContent: 'left',}}>
            <Form.Check
              type="checkbox"
              className="form-check-input"
              value={!isprofessor}
              isprofessor={isprofessor.toString()}
              checked={isprofessor}
              onChange={(e) => handleCheckboxChange(e)}
              /*isprofessor={state.isprofessor.toString()}
              onChange={this.handleChange5.bind(this)}*/
            />
            <Form.Label>Professor</Form.Label>
          </Form.Group>
          <Button block size="lg" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
      )
 }