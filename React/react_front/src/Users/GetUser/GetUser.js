import React, {useState} from 'react';

import axios from 'axios';

export default function GetUser()  {
    let arr = [];
    const [persons, getPersons] = useState(0);
        fetch(`https://localhost:44327/api/Account/`)
        .then(response =>{
          return response.json();
        })
        .then(data =>{
          console.log(data);
          arr = data;
          console.log(arr);
          //console.log("ERROR: " + err);
        })
        .catch(err => {
          console.log("ERROR: " + err);
        });
        //getPersons(persons = res);
        //console.log({persons});
        console.log({arr});
        const Acha = arr.map((item => <ul key = {item.Id}><li>{item.Name}</li><li>{item.Email}</li></ul>));
        console.log({Acha});
    return (
      <ul>
        {arr}; 
        <li><p>Flex</p></li>
      </ul>
    )
}