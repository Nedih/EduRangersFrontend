import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import './Courses.css';
import Button from "react-bootstrap/Button";
import history from "../GlobalHistory/GlobalHistory"

export default function AddTest(props){
    
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    function Add(event){
        event.preventDefault();
        const course = {
            TestName: name,
            TestDescription: desc,
            CourseId: props.match.params.id
        };
        axios({
        method: 'post',
        url: "https://edurangers.azurewebsites.net/api/Test/",
        data: JSON.stringify(course),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            console.log("RESPONSE ", res);
            console.log(res.data);
        })
    }

    return(
        <div className="Course">
          <div>
        <form onSubmit={Add}>
          <h1>
            Test Name:</h1>
            <input type="text" name="Email" onChange={(e) => setName(e.target.value)} />
            <br />
            <h1>Test Description:</h1>
            <input type="text" name="Password" onChange={(e) => setDesc(e.target.value)} />
            
          
          <Button type="submit">Add</Button>
        </form>
      </div>
        </div>
      )
}