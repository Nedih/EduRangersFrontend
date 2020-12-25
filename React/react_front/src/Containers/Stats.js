import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import './Courses.css';
import Button from "react-bootstrap/Button";
import history from "../GlobalHistory/GlobalHistory"

export default function Stats(props){
    const [attempts, setAttempts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState();

    function GetCourses() {
        axios({method: 'get',
        url: `https://edurangers.azurewebsites.net/api/Attempt/Marks/?email=${props.match.params.email}`,
        headers: {'Content-Type': 'application/json'}})
          .then(
            (result) => {
              console.log(result.data)
              setAttempts(result.data)
              setIsLoading(false);
            }
          ).catch(error => {setError(error);
                            setIsLoading(false);}) 
      }
       
      useEffect(() => {
        GetCourses();
   }, []);

  
   
   if(isLoading){
       return(
       <p>Loading...</p>
       )
   }
   else if(error){
       return(<p>Error</p>)
   }

      //const Acha = courses.map((item => <ul key = {item.Id}><li>{item.CourseName}<LinkContainer to="/course">Edit</LinkContainer></li><li>{item.CourseDescription}</li></ul>));

      return(
        <div className="Course">
          {attempts.map((item => <ul key = {item.Test.Course.Id}><li>Course: {item.Test.Course.CourseName}</li><li>Test: {item.Test.TestName}</li><li>Student: {item.Student.UserName}</li><li>Mark: {item.Mark}</li></ul>))}
        </div>
      )

}