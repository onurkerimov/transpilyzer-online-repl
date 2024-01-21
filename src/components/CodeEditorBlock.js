import React, { useReducer, useState, useEffect, useRef } from 'react';
import CodeInputBlock from './CodeInputBlock';
import CodeOutputBlock from './CodeOutputBlock';
import codeEditorStateReducer from '../utils/codeEditorStateReducer';
import initialCodeEditorState from '../utils/initialCodeEditorState';
import 'codemirror';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/comment/comment';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/moxer.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Footer from './Footer';
import ConsoleHelper from './ConsoleHelper';


const refreshIframe = (iframe, textContent, importmap) => {
    // Refresh the iframe by setting its source to the same value
    // eslint-disable-next-line no-self-assign
    iframe.srcdoc = `
<script type="importmap">
${importmap}
</script>
<script type="module">
window.process = { env: { NODE_ENV: 'development' } }
</script>
<script type="module">
${textContent}
</script>
<div id="root"></div>
`;
}

export const CodeEditorContext = React.createContext();

const { Provider } = CodeEditorContext

const reactCode = (text) => `import React from 'react'
import ReactDom from 'react-dom'
${text}

const rootNode = document.querySelector('#root')
ReactDom.render(React.createElement(Counter), rootNode)
`

const reactImportMap = `{
  "imports": {
    "react":"https://cdn.skypack.dev/react@17",
    "react-dom":"https://cdn.skypack.dev/react-dom@17",
    "doja":"https://cdn.skypack.dev/doja-react"
  }
}`

const vueCode = (text) => `import { createApp } from 'vue';
${text}

createApp(Counter).mount('#root');
`

const vueImportMap = `{
  "imports": {
    "vue":"https://cdn.skypack.dev/vue@3.1",
    "doja":"https://cdn.skypack.dev/doja-vue"
  }
}`

const editorOptions = {
  theme: "moxer",
  mode:  "jsx",
  lineNumbers: true,
}


const CodeEditorBlock = () => {
  const [currentCodeEditorState, dispatch] = useReducer(codeEditorStateReducer, initialCodeEditorState);
  const [showCompiled, setShowCompiled] = useState(false)
  const [showReactImportMap, setShowReactCode] = useState(false)
  const [showVueImportMap, setShowVueCode] = useState(false)
  const reactIframeRef = useRef()
  const vueIframeRef = useRef()
  const { currentTranspiledCode } = currentCodeEditorState

  useEffect(() => {
    refreshIframe(reactIframeRef.current, reactCode(currentTranspiledCode), reactImportMap)
    refreshIframe(vueIframeRef.current, vueCode(currentTranspiledCode), vueImportMap)
  }, [currentTranspiledCode])

  return (
    <Provider value={{currentCodeEditorState, dispatch}}>
      <div className='container col'>
        <div className="row">
          <div className="col flex-1">
            <div className="tagline">
              <div>
                <h1>doja</h1>
                A framework-agnostic <br />
                what!? Framework!?
              </div>
            </div>
            <div className="flex-67">
              <h3>What!?</h3>
              <p>
                <b>Doja</b> is the first <i>headless framework</i> that lets you write
                components <b>ONCE</b>, then use them as real <b>React</b> and <b>Vue</b> components!
              </p>
              <p>
                This is achieved <b>WITHOUT</b> transpilation, plugins, or
                preprocessors (other than the classical JSX transform).
              </p>
            </div>
            <div className="flex-67">
              <h3>How!?</h3>
              <p>Explained <a href="https://github.com/xoidlabs/doja">here</a>.</p>
            </div>
            <div className="flex-67">
              <h3>Examples</h3>
              <ul>
                <li><a href='#counter'>Simple counter</a></li>
                {/* <li><a href='#counter-class'>Simple counter (class component)</a></li> */}
                <li><a href='#dependency-injection'>Dependency injection</a></li>
                <li><a href='#composition'>Composition</a></li>
                <li><a href='#composition-slots'>Composition (slots)</a></li>
              </ul>
            </div>
          </div>
          <div className="row flex-2">
            <div className="col">
              <div className="tabbar flex-8">
                <div className="title">./Counter.js</div>
                <button onClick={() => setShowCompiled(s => !s)}>
                  {showCompiled ? 'Show original' : 'Show compiled'}
                </button>
              </div>
              <div className="panel">
                {showCompiled ? <CodeOutputBlock/> : <CodeInputBlock/>}  
              </div>
            </div>
            <div className='col'>
            <div className="col flex-25">
              <div className="tabbar flex-8">
                <div className="title">React</div>
                <button onClick={() => setShowReactCode(s => !s)}>
                  {showReactImportMap ? 'Show code' : 'Show import map'}
                </button>
              </div>
              <div className="panel">
                <CodeMirror options={editorOptions}  value={showReactImportMap ? reactImportMap : reactCode('import Counter from \'./Counter\'')} style={{ height: '140px' }} />
                <iframe ref={reactIframeRef} title="React Output" />
                <ConsoleHelper iframeRef={reactIframeRef} version={currentTranspiledCode} />
              </div>
            </div>
            <div className="col col2 flex-25">
              <div className="tabbar flex-8">
                <div className="title">Vue</div>
                <button onClick={() => setShowVueCode(s => !s)}>
                  {showVueImportMap ? 'Show code' : 'Show import map'}
                </button>
              </div>
              <div className="panel">
                <CodeMirror options={editorOptions}  value={showVueImportMap ? vueImportMap : vueCode('import Counter from \'./Counter\'')}  />
                <iframe ref={vueIframeRef} title="Vue Output" />
                <ConsoleHelper iframeRef={vueIframeRef} version={currentTranspiledCode} />
              </div>
            </div>
            </div>
          </div>
      </div>
      <Footer/>
      </div>
    </Provider>
  )
}

export default CodeEditorBlock;