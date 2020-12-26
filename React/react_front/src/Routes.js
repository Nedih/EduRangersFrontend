import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Containers/Home";
import Login from './Containers/Login';
import Register from './Containers/Register';
import Profile from './Containers/Profile';
import Courses from './Containers/Courses';
import Сourse from './Containers/Course';
import Test from './Containers/Test';
import Question from './Containers/Question';
import AddСourse from './Containers/AddCourse';
import AddTest from './Containers/AddTest';
import AddQuestion from './Containers/AddQuestion';
import AddAnswer from './Containers/AddAnswer'
import Stats from './Containers/Stats'

export default function Routes(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Register />
      </Route>
      <Route exact path="/getusers">
        <Register />
      </Route>
      <Route exact path="/deleteuser">
        <Register />
      </Route>
      <Route exact path="/courses/:email" component={Courses}/>
      <Route exact path="/course/:id/:email" component={Сourse} />
      <Route exact path="/addcourse/:email" component={AddСourse} />
      <Route exact path="/test/:id/:email" component={Test} />
      <Route exact path="/addtest/:id/:email" component={AddTest} />
      <Route exact path="/question/:id/:email" component={Question} />
      <Route exact path="/addquestion/:id/:email" component={AddQuestion} />
      <Route exact path="/addanswer/:id/:email" component={AddAnswer} />
      <Route exact path="/profile/:email"component={Profile} />
      <Route exact path="/stats/:email"component={Stats} />
    </Switch>
  );
}