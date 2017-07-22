import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  DraftEditorBlock,
  DefaultDraftBlockRenderMap,
  EditorBlock,
  CompositeDecorator,
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

const blockRenderMap = Map({
  'unstyled': {
    element: 'pre'
  }
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'blockquote') {
    return 'RichEditor-blockquote';
  }
}

// const HANDLE_REGEX = /\@[\w]+/g;
const HANDLE_REGEX = /.+/g;

function codeStrategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

const CodeSpan = (props) => {
  return (
    <span className='highlight' data-offset-key={props.offsetKey}>
      <pre>
        <code className="language-javascript">
          {props.children}
        </code>
      </pre>
    </span>
  );
};

const styles = {
  root: {
    // fontFamily: '\'Helvetica\', sans-serif',
    padding: 20,
    width: 600,
  },
  editor: {
    border: '1px solid #ddd',
    cursor: 'text',
    // fontSize: 16,
    // minHeight: 40,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  handle: {
    color: 'rgba(98, 177, 254, 1.0)',
    direction: 'ltr',
    unicodeBidi: 'bidi-override',
  },
  hashtag: {
    color: 'rgba(95, 184, 138, 1.0)',
  },
  superFancyBlockquote: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
  }
};

class CodeEditorWithDeco extends Component {
  constructor(props) {
    super(props);

    let decorator = new PrismDecorator(Prism.languages.python);
    let contentState = convertFromRaw({
        entityMap: {},
        blocks: [
            // {
            //     type: 'header-one',
            //     text: 'Demo for draft-js-prism'
            // },
            // {
            //     type: 'unstyled',
            //     text: 'Type some JavaScript below:'
            // },
            {
                type: 'code-block',
                text: `# created at ${new Date()}`
            }
        ]
    })

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: codeStrategy,
        component: CodeSpan,
      },
    ]);

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
            blockStyleFn={myBlockStyleFn}
            customStyleMap={styleMap}
            // blockRenderMap={extendedBlockRenderMap}
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

export default CodeEditorWithDeco;
