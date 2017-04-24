import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';
import { Map, List } from 'immutable';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import PrismDecorator from './PrismDecorator';
import './styles.css';
import FileSaver from 'file-saver';

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
    // this.logState = () => console.log(this.state.editorState.toJS());
    this.logState = () => {
      // console.log(convertToRaw(this.state.editorState.getCurrentContent()));
      console.log(this.state.editorState.getCurrentContent().getPlainText());
    };
    this.saveToFile = this.saveToFile.bind(this);
  }

  saveToFile() {
    let text = this.state.editorState.getCurrentContent().getPlainText();
    const filename = "test";
    let blob = new Blob([text], { type: "text/plain; charset=utf-8" });
    FileSaver.saveAs(blob, filename + ".py");
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
      </div>
    );
  }
}

export default CodeEditor;
