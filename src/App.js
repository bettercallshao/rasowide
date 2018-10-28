import React, { Component } from 'react';

import HomePage from './layouts/HomePage.js';
import EditorPage from './layouts/EditorPage.js';
import Console from './components/Console.js';

// Entry point
class App extends Component {
  constructor(props) {
    super(props);

    // We only keep track of page and the argument to EditorPage
    this.state = {
      page: 'home'
    }

    this.onGoEditor = () => {
      this.setState({page: 'editor'});
    }

    this.onGoHome = () => {
      this.setState({page: 'home'});
    }

    // Route data sending to console
    this.sendData = (data) => {
      this.console.sendData(data);
    }

    this.getTop = () => {
      var page = this.state.page;
      if (page === 'home') {
        return (
          <HomePage
            // Handle page switch
            onGoEditor={this.onGoEditor}
          />)
      } else if (page === 'editor') {
        return (
          <EditorPage
            // Handle page switch
            onGoHome={this.onGoHome}
            sendData={this.sendData}
          />)
      }
    }
  }

  render() {
    const style = {
      box: {
        padding: '25px',
        backgroundColor: '#399A4F',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      top: {
        overflow: 'auto',
        position: 'relative',
        minHeight: '200px',
      },
      bottom: {
        overflow: 'auto',
        position: 'relative',
        minHeight: '600px',
        marginTop: '20px'
      }
    }
    return (
      <div style={style.box}>
        <div style={style.top}>
          {this.getTop()}
        </div>
        <div style={style.bottom}>
          <Console
            ref={ o => { this.console = o; }}
          />
        </div>
      </div>
    );
  }
}

export default App;
