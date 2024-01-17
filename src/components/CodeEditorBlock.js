import React, { useReducer, useState, useEffect, useRef } from 'react';
import CodeInputBlock from './CodeInputBlock';
import CodeOutputBlock from './CodeOutputBlock';
import codeEditorStateReducer from '../utils/codeEditorStateReducer';
import initialCodeEditorState from '../utils/initialCodeEditorState';
import 'codemirror';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/comment/comment';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import './CodeEditorBlock.css';
import 'codemirror/theme/darcula.css';
import { Controlled as CodeMirror } from 'react-codemirror2';


const refreshIframe = (iframe, textContent) => {
    // Refresh the iframe by setting its source to the same value
    // eslint-disable-next-line no-self-assign
    iframe.src = iframe.src;

    // Wait for the iframe to load (you might need to adjust the time based on your content)
    setTimeout(function () {
        // Inject the JavaScript module into the iframe
        var script = document.createElement('script');
        script.type = 'module';
        script.textContent = textContent

        // Append the script to the iframe's document
        var iframeDocument = iframe.contentWindow.document;
        iframeDocument.head.appendChild(script);
    }, 1000); // Adjust the timeout as needed
}

export const CodeEditorContext = React.createContext();

const { Provider } = CodeEditorContext

const reactCode = (text) => `import React from 'react'
import ReactDom from 'react-dom'
${text}

const rootNode = document.querySelector('#root')
ReactDom.render(React.createElement(Counter), rootNode)
`

const vueCode = (text) => `import { createApp } from 'vue';
${text}

createApp(Counter).mount('#root');
`

const CodeEditorBlock = () => {
  const [currentCodeEditorState, dispatch] = useReducer(codeEditorStateReducer, initialCodeEditorState);
  const [showCompiled, setShowCompiled] = useState(false)
  const reactIframeRef = useRef()
  const vueIframeRef = useRef()
  const { currentTranspiledCode } = currentCodeEditorState
  useEffect(() => {
    refreshIframe(reactIframeRef.current, reactCode(currentTranspiledCode))
    refreshIframe(vueIframeRef.current, vueCode(currentTranspiledCode))
  }, [currentTranspiledCode])

  return (
    <Provider value={{currentCodeEditorState, dispatch}}>
      <div id="editor-block-wrapper" className="d-flex flex-row"  style={{fontSize: "14px"}}>
        <div className="d-flex flex-column">
            <button onClick={() => setShowCompiled(s => !s)}>
                {showCompiled? 'Show original' : 'Show compiled'}
            </button>
            {showCompiled ? <CodeOutputBlock/> : <CodeInputBlock/>}
        </div>
        <div className='out'>
            <CodeMirror value={reactCode('import Counter from \'./Counter\'')} style={{ height: '140px' }} />
            <iframe ref={reactIframeRef} title="React Output" src="index-react.html" />
        </div>
        <div className='out'>
            <CodeMirror value={vueCode('import Counter from \'./Counter\'')}  />
            <iframe ref={vueIframeRef} title="Vue Output" src="index-vue.html" />
        </div>
        {/* <div className='out'>
            <CodeMirror value={vueCode('import Counter from \'./Counter\'')}  />
            <iframe ref={vueIframeRef} title="Vue Output" src="index-vue.html" />
        </div> */}
      </div>
    </Provider>
  )
}

export default CodeEditorBlock;