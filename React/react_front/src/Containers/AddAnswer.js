import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import './Courses.css';
import Button from "react-bootstrap/Button";
import history from "../GlobalHistory/GlobalHistory"

export default function AddAnswer(props){
    
    const [name, setName] = useState("");
    const [right, setRight] = useState(false);

    function handleCheck(event){
        event.preventDefault();
        console.log(event.target);
        console.log(event.target.value);
        const target = event.target;
        setRight(target.checked);
    }

    function Add(event){
        event.preventDefault();
        const course = {
            AnswerText: name,
            QuestionId: props.match.params.id,
            IsCorrect: right
        };
        axios({
        method: 'post',
        url: "https://edurangers.azurewebsites.net/api/Answer/",
        data: course,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            console.log("RESPONSE ", res);
            console.log(res.data);
            history.push(`/question/${props.match.params.id}/${props.match.params.email}`);
        })
    }

    return(
        <div className="Course">
          <div>
        <form onSubmit={Add}>
          <h1>
            Answer Text:</h1>
            <input type="text" name="Email" onChange={(e) => setName(e.target.value)} />
            <br />
            <input type="checkbox" name="IsCorrect" onChange={(e) => setRight(e.checked)} />
          
          <Button type="submit">Add</Button>
        </form>
      </div>
        </div>
      )
}