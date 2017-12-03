import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileNav extends Component {
  render() {
    return (
      <div className="editor-header">
        <input
          value={this.props.filename}
          onChange={this.props.onFilenameChanged}
        ></input>
        <label>.py</label>
      </div>
    )
  }
}

FileNav.propTypes = {
  filename: PropTypes.string.isRequired,
  onFilenameChanged: PropTypes.func.isRequired,
}

export default FileNav;
