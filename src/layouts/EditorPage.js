import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TabbedEditor from '../components/TabbedEditor';

class EditorPage extends Component {
  render() {
    return (
      <div>
        <TabbedEditor
          onGoHome={ this.props.onGoHome }
        />
      </div>
    );
  }
}

EditorPage.propTypes = {
  onGoHome: PropTypes.func.isRequired,
}

export default EditorPage;
