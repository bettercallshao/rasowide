import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw
} from 'draft-js';
import { Map, List } from 'immutable';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import PrismDecorator from './PrismDecorator';
import './styles.css';

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
    let contentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: `# created at ${new Date()}`
        }
      ]
    })

    this.state = {
      editorState: EditorState.createWithContent(contentState, decorator),
    };
    this.getEditorState = () => this.state.editorState;
    this.onChange = (editorState) => this.setState({editorState});
    this.focus = () => this.refs.editor.focus();
    this.logState = () => console.log(this.state.editorState.toJS());
  }

  render() {
    return (
      <div className={'RichEditor-root'}>
        <div className={'RichEditor-editor'} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Start coding..."
            ref="editor"
            spellCheck={true}
            customStyleMap={styleMap}
          />
        </div>
        {/* <input
          onClick={this.logState}
          style={styles.button}
          type="button"
          value="Log State"
        /> */}
      </div>
    );
  }
}

export default CodeEditor;
