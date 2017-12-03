import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import InlineEdit from 'react-edit-inline'

import EditorMenu from './EditorMenu.js';
import SingleEditor from './SingleEditor.js';

class TabbedEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filename: 'untitiled.py',
      text: '',
      hash: '0', // Todo: replace with proper hash
    }

    // Handle running the script
    this.onRun = () => {
      // Todo
    }

    // Handle opening a uploaded file
    this.onOpen = (fn, text) => {
      this.setState({
        filename: fn ? fn : 'untitiled.py',
        text: text,
        hash: (parseInt(this.state.hash, 10) + 1).toString()
      })
      console.log(this.state.hash);
    }

    // Handle file name changed by user
    this.onFilenameChanged = (d) => {
      this.setState({...d});
    }

    // Call save editor
    this.onSave = () => {
      this.single.onSave();
    }
  }

  render() {
    return (
      <div>
        <EditorMenu
          onGoHome={this.props.onGoHome}
          onRun={this.onRun}
          onOpen={this.onOpen}
          onSave={this.onSave}
        />
        <Tabs>
          <TabList>
            <Tab>
              <InlineEdit
                text={this.state.filename}
                paramName="filename"
                change={this.onFilenameChanged}
              />
            </Tab>
          </TabList>
          <TabPanel>
            <SingleEditor
              // Use content hash as key to force recreation of editor
              key={this.state.hash}
              ref={ (o) => { this.single = o; }}
              filename={this.state.filename}
              text={this.state.text}
            />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

TabbedEditor.propTypes = {
  onGoHome: PropTypes.func.isRequired,
}

export default TabbedEditor
