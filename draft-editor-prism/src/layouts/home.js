import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Editor from './editor';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { filetype: 'none' };

    this.onClickNew = () => this.setState({ filetype: 'new' });
    this.onClickOpen = () => this.setState({ filetype: 'open' });
    this.onClickGoHome = () => this.setState({ filetype: 'none' });
  }

  render() {
    return (
      <div className="App-main">
        {
          (this.state.filetype === 'none')
          ? <div>
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to Rasowide</h2>
            </div>
            <div className="File-selector">
              <button className="Btn-home" onClick={this.onClickNew}>Create New</button>
              <button className="Btn-home">Open and Load</button>
            </div>
          </div>
          : <Editor onClickGoHome={this.onClickGoHome}/>
        }
      </div>
    );
  }
}

export default Home;
