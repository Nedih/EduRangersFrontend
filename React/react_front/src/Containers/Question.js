import React, {useState, useEffect}  from 'react';
    import axios from 'axios';
    import './Question.css';
    import Form from "react-bootstrap/Form";
    import Button from "react-bootstrap/Button";
    import { Formik, Form as Form2, Field } from "formik";
    import history from "../GlobalHistory/GlobalHistory"

    export default function Question(props){
        const [question, setQuestion] = useState();  
        const [answer, setAnswer] = useState(); 
        const [name, setName] = useState(); 
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState();
        const [txt, setTxt] = useState("");
        //let Answers

        function GetQuestion() {
            axios({method: 'get',
            url: `https://edurangers.azurewebsites.net/api/Question/?id=${props.match.params.id}`,
            headers: {'Content-Type': 'application/json'}})
                .then(
                (result) => {
                    console.log("RESULT: ", result.data)
                    setQuestion(result.data)
                    setIsLoading(false);
                }
                ).catch(error => {setError(error);
                                setIsLoading(false);}) 
            }

            function handleSubmit(event) {
            event.preventDefault();
            const questionModel = {
                QuestionText: name
            };
            JSON.stringify(questionModel);
            axios({
                method: 'put',
                url: `https://edurangers.azurewebsites.net/api/Question/?id=${props.match.params.id}`,
                data: JSON.stringify(questionModel),
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
                headers: {'Content-Type': 'application/json'}
            })
                .then(res => {
                console.log("RESPONSE TEST", res);
                console.log(res.data);
                if(res.data.Succedeed){
                    alert("The test was changed succesfully");
                }  
                else alert("The test wasn`t changed");
                }) 
            }

            function handleSubmit2(event) {
                event.preventDefault();
                console.log(event.target);
                console.log(event.target.value);
                const target = event.target;
               /* const value = target.type === 'checkbox' ? target.checked : target.value;
                const name = target.name;
            

                const answerModel = {
                    QuestionText: 
                };
                JSON.stringify(answerModel);
                axios({
                    method: 'put',
                    url: `https://edurangers.azurewebsites.net/api/Answer/?id=${event.Id}`,
                    data: JSON.stringify(answerModel),
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
                    }) */
                }

                function chck(event){
                    return !event.target.checked;
                }

        useEffect(() => {
            GetQuestion();
        }, []);

        if(isLoading){
            return(
            <p>Loading...</p>
            )
        }
        else if(error){
            return(<p>Error</p>)
        }
        

        function Flex(e)
        {
            console.log(e)
           const AnSwer = {
                AnswerText: e.AnswerText,
                IsCorrect: e.IsCorrect,
                QuestionId: question.Id
            }   
      //await new Promise(resolve => setTimeout(resolve, 500));
      //console.log("Dd", e.target.values.Id);
      console.log("FF", AnSwer);
      axios({
        method: 'put',
        url: `https://edurangers.azurewebsites.net/api/Answer/?id=${e.Id}`,
        data: AnSwer,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {'Content-Type': 'application/json'}
    })
        .then(res => {
        console.log("RESPONSE CHANGE", res);
        console.log(res.data);
        if(res.data.Succedeed){
            alert("The test was changed succesfully");
        }  
        else alert("The test wasn`t changed");
        }) 
      alert(JSON.stringify(AnSwer));
      GetQuestion();
    }
        

       const Answers = question.Answers.map((item =>   <Formik key = {item.Id} validateOnChange="false"
        initialValues={{ AnswerText: `${item.AnswerText}`, isCorrect: item.IsCorrect, Id: `${item.Id}` }} 
       onSubmit={(values, setSubmitting) => {
            console.log(values);
            alert(values);
            Flex(values)
            setSubmitting(false)}
            }> 
            <div>
        <Field
            type="checkbox" name="isCorrect" 
            className={`form-check-input`}
            onClick = {(e) => {item.IsCorrect = e.target.checked}
        }
        />
        <Form.Control
            type="text" name="AnswerText" id={`${item.Id}txt`}
            defaultValue={item.AnswerText} 
            className={`form-control`} onChange={(e) => {item.AnswerText = e.target.value}}
        />
        <Button block size="lg" type="submit" onClick={() => {Flex(item)}}>
        Save
        </Button>
        <Button onClick={() => {axios.delete(`https://edurangers.azurewebsites.net/api/Answer/?id=${item.Id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        GetQuestion();
      })}}>Delete</Button>
      </div>
    </Formik>));
        console.log({Answers});

        return(
        <div className="Course">
            <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="name">
        <Form.Label><h3>Question</h3></Form.Label>
        <Form.Control
            type="text"
            defaultValue={question.QuestionText}
        onChange={(e) => setName(e.target.value)}
        />
        </Form.Group>
        <Button block size="lg" type="submit">
        Save
        </Button>
        </Form>

        <h1>{question.QuestionText} - Answers</h1><div className="mycontainer">
      <p>Prof.</p>
          <Button onClick={() => history.push(`/addanswer/${question.Id}/${props.match.params.email}`)}><div className="mybtn">Add an answer</div></Button></div>
        <br />
        <br />
        <h1>Answers:</h1>
        {Answers}
        
        </div>
        )

        /* */
    
}           