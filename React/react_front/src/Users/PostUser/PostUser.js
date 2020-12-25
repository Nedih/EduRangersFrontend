import React, {useState}  from 'react';
import {useEffect} from 'react';
import axios from 'axios';

export default class PostUser extends React.Component {
  state = {
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Name: '',
    isprofessor: false
  }

  handleChange = event => {
    this.setState({ Email: event.target.value });
  }
  handleChange2 = event => {
    this.setState({ Password: event.target.value });
  }
  handleChange3 = event => {
    this.setState({ ConfirmPassword: event.target.value });
  }
  handleChange4 = event => {
    this.setState({ Name: event.target.value });
  }
  handleChange5(event) {
    this.setState({isprofessor: !this.state.isprofessor});
  }
 
  handleSubmit = event => {
    event.preventDefault();
    const user = {
        Email: this.state.Email,
        Password: this.state.Password,
        ConfirmPassword: this.state.ConfirmPassword,
        Name: this.state.Name,
        isprofessor: this.state.isprofessor.toString()
    };
    let str = JSON.stringify(user);
    axios({
      method: 'post',
      url: "https://localhost:44327/api/Account/Register",
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="Email" onChange={this.handleChange} />
            <input type="text" name="Password" onChange={this.handleChange2} />
            <input type="text" name="ConfirmPassword" onChange={this.handleChange3} />
            <input type="text" name="Name" onChange={this.handleChange4} />
            <input type="checkbox" id="contactChoice1"
            name="isprofessor" 
            isprofessor={this.state.isprofessor.toString()}
            onChange={this.handleChange5.bind(this)} />
            <label htmlFor="contactChoice1">Professor</label>
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}