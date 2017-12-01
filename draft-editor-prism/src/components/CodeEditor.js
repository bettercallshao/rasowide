import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draft from 'draft-js';
import {
  Editor,
  EditorState,
  convertFromRaw,
} from 'draft-js';
// import { Map, List } from 'immutable';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import PrismDecorator from './PrismDecorator';
import './styles.css';
import FileSaver from 'file-saver';
import CodeUtils from 'draft-js-code';

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

class CodeEditor extends Component {
  constructor(props) {
    super(props);

    let decorator = new PrismDecorator(Prism.languages.python);
    let text = '';
    if (this.props.contentState === '') {
      text = `# created at ${new Date()}\n\n`;
    } else {
      text = this.props.contentState;
    }
    const textBlocks = text.split('\n');
    const blocks = textBlocks.map(block => (
      { type: 'code-block', text: block }
    ));
    let contentState = convertFromRaw({
      entityMap: {},
      blocks: blocks,
    })

    this.state = {
      editorState: EditorState.createWithContent(contentState, decorator),
    };
    this.getEditorState = () => this.state.editorState;
    this.onChange = (editorState) => this.setState({editorState});
    this.focus = () => this.refs.editor.focus();
    // this.logState = () => console.log(this.state.editorState.toJS());
    this.logState = () => {
      // console.log(convertToRaw(this.state.editorState.getCurrentContent()));
      console.log(this.state.editorState.getCurrentContent().getPlainText());
    };
    this.saveToFile = this.saveToFile.bind(this);

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.keyBindgFn = this.keyBindgFn.bind(this);
    this.handleTab = this.handleTab.bind(this);
  }

  saveToFile() {
    let text = this.state.editorState.getCurrentContent().getPlainText();
    if (this.props.filename !== '') {
      let blob = new Blob([text], { type: "text/plain; charset=utf-8" });
      FileSaver.saveAs(blob, this.props.filename + ".py");
    } else {
      alert('Invalid file name');
    }
  }

  handleKeyCommand(command) {
    let newState;
    if (CodeUtils.hasSelectionInBlock(this.state.editorState)) {
      newState = CodeUtils.handleKeyCommand(this.state.editorState, command);
    }

    if (!newState) {
      newState = Draft.RichUtils.handleKeyCommand(this.state.editorState, command);
    }

    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  keyBindgFn(e) {
    let editorState = this.state.editorState;
    let command;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      command = CodeUtils.getKeyBinding(e);
    }
    if (command) {
      return command;
    }

    return Draft.getDefaultKeyBinding(e);
  }

  handleTab(e) {
    let editorState = this.state.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(
      CodeUtils.handleTab(e, editorState)
    );
  }

  render() {
    return (
      <div className={'RichEditor-root'}>
        <div className={'RichEditor-editor'} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            ref="editor"
            spellCheck={true}
            customStyleMap={styleMap}
            keyBindgFn={this.keyBindgFn}
            handleKeyCommand={this.handleKeyCommand}
            onTab={this.handleTab}
          />
        </div>
      </div>
    );
  }
}

CodeEditor.propTypes = {
  contentState: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
}

export default CodeEditor;
