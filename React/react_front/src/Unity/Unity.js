import React, { Component } from 'react';
import { Unity } from 'react-unity-webgl';


export class App extends Component {
  render() {
    return (<div className="app">
      <Unity src="Build/myGame.json" />
        </div>)
    }
}