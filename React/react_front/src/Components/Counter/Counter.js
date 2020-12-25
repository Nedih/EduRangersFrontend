import React, {useState} from 'react';



export default function Counter(){
    const [Money, setMoney] = useState(300);
    const [Grivnas, setGrivnas] = useState(6000);
    const Array = [{
        id : 1,
        Name: "Billy",
        Strength: 100
    },
    {
        id : 2,
        Name: "Van",
        Strength: 99
    },
    {
        id : 3,
        Name: "Jabroni",
        Strength: 1
    }] 
    const GachiWarriors = Array.map((item => <ul key = {item.id}><li>{item.Name}</li><li>{item.Strength}</li></ul>));
    return (<div>
                {GachiWarriors}
                <p>Login has ${Money}</p> <p>Login owes Van {Grivnas} grivnas</p>
                <button placeholder = {5} style = {{height : "20px", width : "50px"}} onClick = {() => setMoney(Money + 5)}/>
                <button placeholder = {"♂Fisting♂"} style = {{height : "20px", width : "50px"}} onClick = {() => setGrivnas(Grivnas + 5)}/>
            </div>);
}