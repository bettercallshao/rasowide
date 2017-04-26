import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Editor from './editor';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filetype: 'none',
      contentState: '',
    };

    this.onClickNew = () => this.setState({ filetype: 'new' });
    this.onClickOpen = () => {
      this.selectFile.click();
    }
    this.readFile = () => {
      const file = this.selectFile.files[0];
      const filetype = /text.*/;
      if (file.type.match(filetype)) {
        let reader = new FileReader();
        reader.onload = (e) => {
          console.log(reader.result);
          this.setState({ contentState: reader.result });
        };
        reader.onloadend = (e) => {
          this.setState({ filetype: 'open' })
        }
        reader.readAsText(file);
      } else {
        console.log('Invalid file type');
      }
    }
    this.onClickGoHome = () => {
      this.setState({ filetype: 'none', contentState: '' });
    };
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
              <button className="Btn-home" onClick={this.onClickOpen}>Open and Load</button>
              <input
                id="selectFile"
                type="file"
                style={{ "display": "none" }}
                ref={ref => this.selectFile = ref}
                onChange={this.readFile}
              ></input>
            </div>
          </div>
          : <Editor
            onClickGoHome={this.onClickGoHome}
            contentState={this.state.contentState}
          />
        }
      </div>
    );
  }
}

export default Home;
