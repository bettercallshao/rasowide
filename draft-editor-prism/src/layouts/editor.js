import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../logo.svg';
import '../App.css';
import CodeEditor from '../components/CodeEditor';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.printCodes = this.printCodes.bind(this);
    this.saveToFile = this.saveToFile.bind(this);
  }

  printCodes() {
    this.editorProps.logState();
  }

  saveToFile() {
    this.editorProps.saveToFile();
  }

  render() {
    return (
      <div>
        <div className="editor-menu">
          <button className="menu-back" onClick={this.props.onClickGoHome}>Go back home</button>
          <button className="menu-print" onClick={this.printCodes}>Print to console</button>
          <input
            onClick={this.saveToFile}
            type="button"
            value="Save to file"
          />
        </div>
        <div className="tab">
          <button className="tablinks">untitled*</button>
          <button className="tablinks">+</button>
        </div>
        <div className="editor">
          <CodeEditor
            ref={(editorProps) => { this.editorProps = editorProps }}
            contentState={this.props.contentState}
          />
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  onClickGoHome: PropTypes.func.isRequired,
  contentState: PropTypes.string.isRequired,
}

export default Editor;
