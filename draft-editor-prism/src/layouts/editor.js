import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import CodeEditor from '../components/CodeEditor';
import FileNav from '../components/FileNav';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = { filename: this.props.filename };

    this.printCodes = this.printCodes.bind(this);
    this.saveToFile = this.saveToFile.bind(this);
    this.onChangeFilename = (e) => this.setState({ filename: e.target.value });
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
          <button>Run</button>
          <input
            onClick={this.saveToFile}
            type="button"
            value="Save to file"
          />
        </div>
        <FileNav filename={this.state.filename} onChangeFilename={this.onChangeFilename} />
        <div className="editor">
          <CodeEditor
            ref={(editorProps) => { this.editorProps = editorProps }}
            contentState={this.props.contentState}
            filename={this.state.filename}
          />
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  onClickGoHome: PropTypes.func.isRequired,
  contentState: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
}

export default Editor;
