import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Draft, {
  Editor,
  convertFromRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import CodeUtils from 'draft-js-code';
import FileSaver from 'file-saver';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';

import PrismDecorator from './PrismDecorator.js';

import './SingleEditor.css';

class SingleEditor extends Component {
  constructor(props) {
    super(props);

    // Make some text if none is given
    let text = this.props.text;
    if (!text) {
      text = `# created at ${new Date()}\n\n`;
    }
    // Make content state from text
    let contentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: text,
        },
      ]
    })
    // Make editor state from content state and decorator
    this.state = {
      editorState: Draft.EditorState.createWithContent(contentState,
        new PrismDecorator(Prism.languages.python)),
    };

    // Handle editor state change
    this.onChange = (editorState) => this.setState({editorState});

    // Log my state
    this.logState = () => {
      console.log(this.state.editorState.getCurrentContent().getPlainText());
    };

    // Handke key
    this.handleKeyCommand = (command) => {
      let newState;
      // Use CodeUtils first
      if (CodeUtils.hasSelectionInBlock(this.state.editorState)) {
        newState = CodeUtils.handleKeyCommand(this.state.editorState, command);
      }
      // Use Draft.RichUtils if last step failed
      if (!newState) {
        newState = Draft.RichUtils.handleKeyCommand(this.state.editorState, command);
      }
      // Update state and return true if successful
      if (newState) {
        this.onChange(newState);
        return true;
      }
      // Failure
      return false;
    }

    // Handle key binding
    this.keyBindgFn = (e) => {
      // Look for binding in CodeUtils
      if (CodeUtils.hasSelectionInBlock(this.state.editorState)) {
        let command = CodeUtils.getKeyBinding(e);
        if (command) {
          return command;
        }
      }
      // Return default from Draft
      return Draft.getDefaultKeyBinding(e);
    }

    // Handle tab
    this.handleTab = (e) => {
      let editorState = this.state.editorState
      if (CodeUtils.hasSelectionInBlock(editorState)) {
        this.onChange(
          CodeUtils.handleTab(e, editorState)
        );
      }
    }

    // Return text to parent
    this.onSave = () => {
      let text = this.state.editorState.getCurrentContent().getPlainText();
      if (this.props.filename !== '') {
        let blob = new Blob([text], { type: 'text/plain; charset=utf-8' });
        FileSaver.saveAs(blob, this.props.filename);
      } else {
        alert('Invalid file name');
      }
    }

    // Return text to parent
    this.onUpload = (cb) => {
      let text = this.state.editorState.getCurrentContent().getPlainText();
      if (this.props.filename !== '') {
        fetch('/upload/' + this.props.filename, {
          method: 'post',
          body: text
         })
         // Call callback only after we are done
         .then(cb);
      } else {
        alert('Invalid file name');
      }
    }
  }

  render() {
    const styleMap = {
      CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
      },
    };

    return (
      <div className={'RichEditor-root'}>
        <div className={'RichEditor-editor'}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            keyBindgFn={this.keyBindgFn}
            handleKeyCommand={this.handleKeyCommand}
            onTab={this.handleTab}
            customStyleMap={styleMap}
          />
        </div>
      </div>
    );
  }
}

SingleEditor.propTypes = {
  filename: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default SingleEditor;
