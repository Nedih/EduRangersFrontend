import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import './Courses.css';
import Button from "react-bootstrap/Button";
import history from "../GlobalHistory/GlobalHistory"
import edit from '../Res/Images/edit.png';
import del from '../Res/Images/delete.png';

export default function Courses(props){
    const [courses, setCourses] = useState();
    const [user, setUser] = useState();
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
              }
            )
        }

    function GetCourses() {
        axios({method: 'get',
        url: `https://edurangers.azurewebsites.net/api/Course/ProfCourses/?email=${props.match.params.email}`,
        headers: {'Content-Type': 'application/json'}})
          .then(
            (result) => {
              console.log(result.data)
              setCourses(result.data)
              setIsLoading(false);
            }
          ).catch(error => {setError(error);
                            setIsLoading(false);}) 
      }
       
      useEffect(() => {
        GetUser();
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
          <h1>Courses</h1><div className="mycontainer">
      <p>Prof. {user.Name}</p>
          <Button onClick={() => history.push(`/addcourse/${props.match.params.email}`)}><div className="mybtn">Add a course</div></Button></div>
          {courses.map((item => <div className="coursecontainer" key = {item.Id}>
          <div className="books">
          <div className="mybutton"><Button  onClick={() => history.push(`/course/${item.Id}/${props.match.params.email}`)}><img src={edit}/></Button><Button  onClick={() => 
          {axios.delete(`https://edurangers.azurewebsites.net/api/Course/?id=${item.Id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        history.push(`/courses/${props.match.params.email}`);
      })}}>
        <img src={del}/></Button></div></div>
          <div className="info"><h1>{item.CourseName}</h1>
          <p>Description: {item.CourseDescription}</p><br /><p>Average Mark: {item.AvgMark}</p></div></div>))}
        </div>
      )

}