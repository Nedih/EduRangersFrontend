import React, {useState,  useEffect}  from 'react';
import axios from 'axios';
import './Profile.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Profile(props){

    const [user, setUser] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    function GetUser() {
      axios({method: 'get',
      url: `https://edurangers.azurewebsites.net/api/Account/Profile/?email=${props.match.params.email}`,
      headers: {'Content-Type': 'application/json'}})
        .then(
          (result) => {
            console.log(result)
            setUser(result.data);
            setIsLoading(false);
          }
        ).catch(error => {setError(error);
                          setIsLoading(false);}) 
    }

    function handleSubmit(event) {
        event.preventDefault();
        const userModel = {
                UserAvatar: avatar,
                Email: email,
                Password: password,
                Name: name
            };
        JSON.stringify(userModel);
        axios({
          method: 'put',
          url: `https://edurangers.azurewebsites.net/api/Account/?email=${user.Id}`,
          data: JSON.stringify(userModel),
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: {'Content-Type': 'application/json'}
        })
          .then(res => {
            console.log("RESPONSE ", res);
            console.log(res.data);
            /*history.push(`/profile/${props.match.params.email}`);*/
            if(res.data.Succedeed){
              alert("You`ve been succesfully logged in");
            }  
            else alert("Wrong email or password");
          }) 
      }

      useEffect(() => {
        GetUser();
      }, []);

      if(isLoading){
          return(
          <p>Loading...</p>
          )
      }
      else if(error){
          return(<p>Error</p>)
      }
      
    return (
    <div className="Course">
    <Form onSubmit={handleSubmit}>
      <div style = {{display : "flex"}}>
        <div>
        <img src={user.UserAvatar} width="128px" height="128px"/>
        <Form.Group size="lg" controlId="avatar">
        <Form.Label>Avatar</Form.Label>
        <Form.Control
            type="text"
            defaultValue={user.UserAvatar}
        onChange={(e) => setAvatar(e.target.value)}
        />
        </Form.Group>
        </div>
        <div style = {{margin: "auto"}}>
        <Form.Group size="lg" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
            type="text"
            defaultValue={user.Name}
        onChange={(e) => setName(e.target.value)}
        />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
            autoFocus
            type="email"
            defaultValue={user.Email}
        onChange={(e) => setEmail(e.target.value)}
        />
        </Form.Group></div></div>
      
        <Button block size="lg" type="submit">
        Save
        </Button>
    </Form>
    </div>
    )
}