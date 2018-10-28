import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

class EditorMenu extends Component {
  constructor(props) {
    super(props);

    // Handle drop and open file
    this.onDrop = (acceptedFiles, rejectedFiles) => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          // Callback to open each file
          this.props.onOpen(file.name, reader.result);
        };
        // Ignore non-text
        const filetype = /text.*/;
        if (file.type.match(filetype)) {
          reader.readAsText(file);
        }
      });
    }

    // New is just opening an empty file
    this.onNew = () => { this.props.onOpen('', '') }
  }

  render() {
    const style = {
      display: 'inline-block',
      borderColor: '#262',
      borderStyle: 'dashed',
      position: 'relative',
    }
    return (
      <div>
        <Dropzone style={style} onDrop={this.onDrop}>
          <button> Open </button>
        </Dropzone>
        <button onClick={() => this.props.onOpen('', '')}> New </button>
        <button onClick={this.props.onRun}> Run </button>
        <button onClick={this.props.onSave}> Save </button>
        <button onClick={this.props.onGoHome}> Home </button>
      </div>
    )
  }
}

EditorMenu.propTypes = {
  onGoHome: PropTypes.func.isRequired,
  onRun: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default EditorMenu
