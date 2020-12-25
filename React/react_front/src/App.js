import React, {Fragment, useState } from 'react';
import './App.css';
import Routes from "./Routes";
import NavigationBar from "./Components/NavigationBar";
import { AppContext } from "./Libs/ContextLib";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import history from "./GlobalHistory/GlobalHistory"
import { Redirect } from "react-router-dom";
import { Divider } from '@material-ui/core';


function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  function handleLogout() {
    userHasAuthenticated(false);
    setUserEmail("");
    history.push("/")
    return (<Redirect push to="/" />)
  }
/*{userEmail, setUserEmail}*/
  return (
    <>
    <div className="Body">
      <Navbar collapseOnSelect expand="md" className="mb-3 navik" >
        <LinkContainer to="/">
          <Navbar.Brand>
           <div className="logotype">EduRangers</div>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        {isAuthenticated ? (
            <> 
          <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
          <LinkContainer to={`/courses/${userEmail}`}>
            <Nav.Link><div className="mybtn">My Courses</div></Nav.Link>
            </LinkContainer>
            <LinkContainer to={`/profile/${userEmail}`}>
            <Nav.Link><div className="mybtn">Profile</div></Nav.Link>
            </LinkContainer>
            <LinkContainer to={`/stats/${userEmail}`}>
            <Nav.Link><div className="mybtn">Statistics</div></Nav.Link>
            </LinkContainer>
            <Nav.Link onClick={handleLogout}><div className="mybtn">Logout</div></Nav.Link>
            </Nav>
          </Navbar.Collapse>
            </>
            ) : (
            <>
            <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
                <LinkContainer to="/signup">
                <Nav.Link><div className="mybtn">Signup</div></Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                <Nav.Link><div className="mybtn">Login</div></Nav.Link>
                </LinkContainer>
                </Nav>
        </Navbar.Collapse>
            </>
        )}

      </Navbar>
      
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated,  userEmail, setUserEmail}}> 
      <Routes />
      </AppContext.Provider>
      </div>
    </>
  );
}

export default App;
