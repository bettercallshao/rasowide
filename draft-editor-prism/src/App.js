import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CodeEditor from './components/CodeEditor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Rasowide</h2>
        </div>
        <div className="tab">
          <button className="tablinks">untitled*</button>
          <button className="tablinks">+</button>
        </div>
        <div className="editor">
          <CodeEditor />
        </div>
      </div>
    );
  }
}

export default App;
