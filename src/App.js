import React, { Component } from 'react';

import HomePage from './layouts/HomePage.js';
import EditorPage from './layouts/EditorPage.js';

// Entry point
class App extends Component {
  constructor(props) {
    super(props);

    // We only keep track of page and the argument to EditorPage
    this.state = {
      page: 'home'
    }

    this.onGoEditor = () => {
      this.setState({page: 'editor'})
    }

    this.onGoHome = () => {
      this.setState({page: 'home'})
    }
  }

  render() {
    var page = this.state.page;
    if (page === 'home') {
      return (
        // Home page
        <HomePage
          // Handle page switch
          onGoEditor={this.onGoEditor}
        />
      );
    } else if (page === 'editor') {
      return (
        // Editor page
        <EditorPage
          // Handle page switch
          onGoHome={this.onGoHome}
        />
      );
    }
  }
}

export default App;
