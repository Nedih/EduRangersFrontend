import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import './Test.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import history from "../GlobalHistory/GlobalHistory"
import edit from '../Res/Images/edit.png';
import del from '../Res/Images/delete.png';

export default function Test(props){
    const [test, setTest] = useState();  
    const [questions, setQuestions] = useState();  
    const [user, setUser] = useState();
        const [name, setName] = useState(); 
        const [desc, setDesc] = useState(); 
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState();

        function GetTest() {
            axios({method: 'get',
            url: `https://edurangers.azurewebsites.net/api/Test/?id=${props.match.params.id}`,
            headers: {'Content-Type': 'application/json'}})
              .then(
                (result) => {
                  console.log("RESULT: ", result.data)
                  setTest(result.data)
                  setQuestions(result.data.Questions)
                  setIsLoading(false);
                }
              ).catch(error => {setError(error);
                                setIsLoading(false);}) 
          }

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

          function handleSubmit(event) {
            event.preventDefault();
            const testModel = {
                    TestDescription: name,
                    TestName: desc
                };
            JSON.stringify(testModel);
            axios({
              method: 'put',
              url: `https://edurangers.azurewebsites.net/api/Test/?id=${props.match.params.id}`,
              data: JSON.stringify(testModel),
              maxContentLength: Infinity,
              maxBodyLength: Infinity,
              headers: {'Content-Type': 'application/json'}
            })
              .then(res => {
                console.log("RESPONSE ", res);
                console.log(res.data);
                if(res.data.Succedeed){
                  alert("The test was changed succesfully");
                }  
                else alert("The test wasn`t changed");
              }) 
          }


        useEffect(() => {
            GetUser();
             GetTest();
        }, []);

        if(isLoading){
            return(
            <p>Loading...</p>
            )
        }
        else if(error){
            return(<p>Error</p>)
        }
        
        

        const Quest = questions.map((item => <div className="info">
          <div style = {{display: "flex"}}>
          <h1>{item.QuestionText}</h1>
        <div className="mybutton2" ><Button  onClick={() => history.push(`/question/${item.Id}/${props.match.params.email}`)}><img src={edit}/></Button><Button  onClick={() => 
          {axios.delete(`https://edurangers.azurewebsites.net/api/Question/?id=${item.Id}`)
          .then(res => {
            console.log(res);
            console.log(res.data);
            GetTest();
          })}}>
        <img src={del}/></Button></div></div>
        <p>{item.AnswersString}</p></div>));
        console.log({Quest});

        return(
        <div className="Course">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="name">
        <Form.Label><h3>Test</h3></Form.Label>
        <Form.Control
            type="text"
            defaultValue={test.TestName}
        onChange={(e) => setName(e.target.value)}
        />
        </Form.Group>
        <Form.Group size="lg" controlId="desc">
        <Form.Label><h6>Description</h6></Form.Label>
        <Form.Control
            type="text"
            defaultValue={test.TestDescription}
        onChange={(e) => setDesc(e.target.value)}
        />
        </Form.Group>
        <li>Average Mark: {test.AvgMark}</li>
        <Button block size="lg" type="submit">
        Save
        </Button>
    </Form>
    <h1>{test.TestName} - Questions</h1><div className="mycontainer">
      <p>Prof. {user.Name}</p>
          <Button onClick={() => history.push(`/addquestion/${test.Id}/${props.match.params.email}`)}><div className="mybtn">Add a question</div></Button></div>
        <br />
        <br />
        <h1>Questions:</h1>
        {Quest}
        </div>
        )
    
}