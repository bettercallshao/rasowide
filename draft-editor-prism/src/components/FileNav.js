import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class FileNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="editor-header">
        <input
          className="file-title"
          value={this.props.filename}
          onChange={this.props.onChangeFilename}
        ></input>
        <label>.py</label>
        {/* <div className="tab">
          <button className="tablinks">{this.props.filename}</button>
          <button className="tablinks">+</button>
        </div> */}
      </div>
    )
  }
}

FileNav.propTypes = {
  filename: PropTypes.string.isRequired,
  onChangeFilename: PropTypes.func.isRequired,
}

export default FileNav;
