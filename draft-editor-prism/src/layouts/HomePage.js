import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './HomePage.css'
import logo from './logo.png';

class HomePage extends Component {
  render() {
    // Keep styles in JS
    const style = {
      text: {
        textAlign: 'center'
      },
      header: {
        backgroundColor: '#222',
        height: '150px',
        padding: '20px',
        color: 'white',
        marginBottom: '72px'
      },
      logo: {
        animation: 'logo-spin infinite 20s linear',
        height: '80px'
      }
    }

    return (
      <div style={style.text}>
        <div style={style.header}>
          <img style={style.logo} src={logo} alt="logo" />
          <h2>Welcome to Rasowide</h2>
        </div>
        <div>
          <button onClick={this.props.onGoEditor}> Editor </button>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  onGoEditor: PropTypes.func.isRequired,
}

export default HomePage;
