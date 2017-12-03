import React, { Component } from 'react';

import './Console.css';
import io from 'socket.io-client';
import $ from 'jquery';
window.jQuery = window.$ = $;
require('jq-console');

class Console extends Component {
  constructor(props) {
    super(props);

    this.makePrompt = (element) => {
      // init modules
      var banner = '' +
      '####################\n' +
      '# rasowide console #\n' +
      '####################\n';
      var prompt_ = '$ ';
      var jqconsole = element.jqconsole(banner, prompt_);
      var socket = io();

      // init cli session via socketio
      var id = '';
      socket.emit('ctrl', { 'act': 'new' });
      socket.on('ctrl', function(msg) {
        id = msg.id;
      });

      // response printing
      socket.on('data', function(msg) {
        if (msg.error === 0) {
          jqconsole.Write(msg.payload, 'jqconsole-output');
        } else {
          jqconsole.Write(JSON.stringify(msg, null, 2), 'jqconsole-error');
        }
      });

      // start jq console
      var startPrompt = function () {
        // history enabled
        jqconsole.Prompt(true, function (input) {
          socket.emit('data', {
            'id': id,
            'payload': input + '\n'
          });
          // restart prompt
          startPrompt();
        });
      };
      startPrompt();
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
