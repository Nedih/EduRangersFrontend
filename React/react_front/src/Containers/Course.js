import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import './Course.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import history from "../GlobalHistory/GlobalHistory";
import edit from '../Res/Images/edit.png';
import del from '../Res/Images/delete.png';
import MultiSelect from "react-multi-select-component";

export default function Course(props){

        const [course, setCourse] = useState();  
        const [name, setName] = useState(); 
        const [desc, setDesc] = useState(); 
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState();
        const [user, setUser] = useState();
        const [optionsss, setOptionsss] = useState([{
          label: "",
          value: null
      }]);
      const [selected, setSelected] = useState([]);
        
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

        function GetAbs() {
          axios({method: 'get',
          url: `https://edurangers.azurewebsites.net/api/Ability/Abs/`,
          headers: {'Content-Type': 'application/json'}})
            .then(
              (result) => {
                console.log("RESULT: ", result.data)
                //setAbs(result.data)
                setOptionsss(result.data)
                
              })
        }

        function GetCourse() {
            axios({method: 'get',
            url: `https://edurangers.azurewebsites.net/api/Course/?id=${props.match.params.id}`,
            headers: {'Content-Type': 'application/json'}})
              .then(
                (result) => {
                  console.log(result.data)
                  setCourse(result.data)
                  setSelected(result.data.Abilities);
                  setIsLoading(false);
                }
              ).catch(error => {setError(error);
                                setIsLoading(false);}) 
          }

          function handleSubmit(event) {
            event.preventDefault();
            const courseModel = {
                    CourseDescription: name,
                    CourseName: desc
                };
            JSON.stringify(courseModel);
            axios({
              method: 'put',
              url: `https://edurangers.azurewebsites.net/api/Course/?id=${props.match.params.id}`,
              data: JSON.stringify(courseModel),
              maxContentLength: Infinity,
              maxBodyLength: Infinity,
              headers: {'Content-Type': 'application/json'}
            })
              .then(res => {
                console.log("RESPONSE ", res);
                console.log(res.data);
                if(res.data.Succedeed){
                  alert("The course was changed succesfully");
                }  
                else alert("The course wasn`t changed");
              }) 
          }


        useEffect(() => {
          GetUser();
          GetAbs();
          GetCourse();
        }, []);

        if(isLoading){
            return(
            <p>Loading...</p>
            )
        }
        else if(error){
            return(<p>Error</p>)
        }
        
        

        const Tests = course.Tests.map((item => <div className="info" key = {item.Id}>
          <div style = {{display: "flex"}}>
          <h1>{item.TestName}</h1>
          <div className="mybutton2" ><Button  onClick={() => history.push(`/test/${item.Id}/${props.match.params.email}`)}><img src={edit}/></Button><Button  onClick={() => 
          {axios.delete(`https://edurangers.azurewebsites.net/api/Test/?id=${item.Id}`)
          .then(res => {
            console.log(res);
            console.log(res.data);
          })}}>
        <img src={del}/></Button></div></div>
        <p>{item.TestDescription}</p>
        <li>Average Mark: {item.AvgMark}</li>
        </div>));
        console.log({Tests});

        return(
        <div className="Course">
           
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="name">
        <Form.Label><h3>Course</h3></Form.Label>
        <Form.Control
            type="text"
            defaultValue={course.CourseName}
        onChange={(e) => setName(e.target.value)}
        />
        </Form.Group>
        <Form.Group size="lg" controlId="desc">
        <Form.Label><h6>Description</h6></Form.Label>
        <Form.Control
            type="text"
            defaultValue={course.CourseDescription}
        onChange={(e) => setDesc(e.target.value)}
        />
        </Form.Group>
        <div>
      <h1>Select Abilities</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={optionsss}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
      />
    </div>
        <li>Average Mark: {course.AvgMark}</li>
        <Button block size="lg" type="submit">
        Save
        </Button>
    </Form>
        <h1>{course.CourseName} - Tests</h1><div className="mycontainer">
      <p>Prof. {user.Name}</p>
          <Button onClick={() => history.push(`/addtest/${course.Id}`)}><div className="mybtn">Add a test</div></Button></div>
        <h1>Tests:</h1>
        <br />
        <br />
        {Tests}
        </div>
        )
    
}