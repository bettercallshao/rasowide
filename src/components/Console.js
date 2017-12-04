import React, { Component } from 'react';

import './Console.css';
import io from 'socket.io-client';
import $ from 'jquery';
window.jQuery = window.$ = $;
require('jq-console');

class Console extends Component {
  constructor(props) {
    super(props);

    // Keep socket as a member
    this.socket = io();
    this.id = '';

    this.makePrompt = (element) => {
      // init modules
      var banner = '' +
      '####################\n' +
      '# rasowide console #\n' +
      '####################\n';
      var prompt_ = '$ ';
      var jqconsole = element.jqconsole(banner, prompt_);

      // init cli session via socketio
      this.socket.emit('ctrl', { 'act': 'new' });
      this.socket.on('ctrl', (msg) => {
        this.id = msg.id;
      });

      // response printing
      this.socket.on('data', (msg) => {
        if (msg.error === 0) {
          jqconsole.Write(msg.payload, 'jqconsole-output');
        } else {
          jqconsole.Write(JSON.stringify(msg, null, 2), 'jqconsole-error');
        }
      });

      // start jq console
      this.startPrompt = () => {
        // history enabled
        jqconsole.Prompt(true, (input) => {
          this.sendData(input);
          // restart prompt
          this.startPrompt();
        });
      };
      this.startPrompt();
    }

    // Allow parent to call this
    this.sendData = (data) => {
      // Keep here for debugging, console.log doesn't survive optimization
      //alert(this.id + " $" + data + "$");
      this.socket.emit('data', {
        'id': this.id,
        'payload': data + '\n'
      });
    }
  }

  componentDidMount() {
    this.makePrompt($(this.el));
  }

  render() {
    return (
      <div
        className='jsconsole'
        ref={el => this.el = el}
      />
    );
  }
}

export default Console;
