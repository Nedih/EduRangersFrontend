import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import './Courses.css';
import Button from "react-bootstrap/Button";
import history from "../GlobalHistory/GlobalHistory"
import Select from 'react-select';
import Sel from '@material-ui/core/Select';
import MultiSelect from "react-multi-select-component";

export default function AddCourse(props){
  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
    { label: "Watermelon 🍉", value: "watermelon" },
    { label: "Pear 🍐", value: "pear" },
    { label: "Apple 🍎", value: "apple" },
    { label: "Tangerine 🍊", value: "tangerine" },
    { label: "Pineapple 🍍", value: "pineapple" },
    { label: "Peach 🍑", value: "peach" },
  ];
  const [optionsss, setOptionsss] = useState([{
    label: "",
    value: null
}]);
 
  const [selected, setSelected] = useState([]);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [abilities, setAbilities] = useState("");
    const [abs, setAbs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [names, setNames] = useState();

    function Add(event){
        event.preventDefault();
        console.log("ABSd: ", selected);
        const course = {
            CourseName: name,
            CourseDescription: desc,
            AuthorEmail: props.match.params.email,
            Abilitiess: selected
        };
        axios({
        method: 'post',
        url: "https://edurangers.azurewebsites.net/api/Course/",
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

    function GetTest() {
      axios({method: 'get',
      url: `https://edurangers.azurewebsites.net/api/Ability/Abs/`,
      headers: {'Content-Type': 'application/json'}})
        .then(
          (result) => {
            console.log("RESULT: ", result.data)
            //setAbs(result.data)
            setOptionsss(result.data)
            setIsLoading(false)
            
          }
        ).catch(error => {setError(error);
                          setIsLoading(false);}) 
        
    }

  useEffect(() => {
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

  
  //const temp = abs.map((item) =>  item.AbilityName);
           /* setNames(temp);*/
            /*console.log("ABS: ", names);*/


            /* <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[temp[0]]}
            isMulti
            options={temp}
            />*/
    /*const felix = abs.map((item) => <div key={item.Id}>{item.AbilityName}</div>)
    const fel = JSON.parse(abs);*/
    const fel = abs.map((item) => item);
    const ops = abs.map((item) => <option key={item} value={item}>{item}</option>);
    //const optionsss = JSON.stringify(fel);
    
    return(
       
        <div className="Course">
          <div>
        <form onSubmit={Add}>
          <h1>
            Course Name:</h1>
            <input type="text" name="Email" onChange={(e) => setName(e.target.value)} />
            <br/>
            <h1>Course Description:</h1>
            <input type="text" name="Password" onChange={(e) => setDesc(e.target.value)} />            
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
          <Button type="submit">Add</Button>
        </form>
      </div>
        </div>
      )
}