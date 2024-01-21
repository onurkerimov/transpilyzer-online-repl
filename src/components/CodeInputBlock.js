import React, { useRef, useEffect, useContext, useState } from 'react';
import _ from 'lodash';
import * as Babel from "@babel/standalone";
import babelConfig from '../utils/babelConfig'

import { Controlled as CodeMirror } from 'react-codemirror2';
import ErrorAlert from './ErrorAlert';

import { CodeEditorContext } from './CodeEditorBlock';
import { examples } from '../utils/examples';

function camelize(str) {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}

const setHash = (hash) => {
  if(window.history.pushState) {
      window.history.pushState(null, null, hash);
  }
  else {
    window.location.hash = hash;
  }
}

function processHash(hash) {
  if (hash.length < 20) {
    return examples[camelize(hash)]
  } 
  return decodeURIComponent(hash)
}

function CodeInputBlock() {
  const [currentInputCode, setCurrentInputCode] = useState(examples.counter)
  useEffect(() => {
    // Function to update state based on the URL hash
    const updateStateFromHash = () => {
      const hash = window.location.hash.substring(1); // Exclude the '#' character
      setCurrentInputCode(hash ? processHash(hash) : examples.counter);
    };

    // Initial update when the component mounts
    updateStateFromHash();

    // Add event listener to update state when the hash changes
    window.addEventListener('hashchange', updateStateFromHash);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('hashchange', updateStateFromHash);
    };
  }, []); // Empty dependency array to run the effect only once on mount


  const debounceRef = useRef();
  const { currentCodeEditorState, dispatch } = useContext(CodeEditorContext);
  const { editorOptions } = currentCodeEditorState;


  const transpileCode = (inputCode) => {
    try {
      
      const transpiledOutputCode = Babel.transform(inputCode, babelConfig).code;
  
      dispatch({type: "SET_OUTPUT_VALUE", payload: {transpiledOutputCode}});
    } catch (error) {
      dispatch({type: "DISPLAY_ERROR", payload: {errorMessage: error.message}});
    }
  }

  const handleOnBeforeChange = (editor, data, value) => {
    const inputCode = value;
    setCurrentInputCode(inputCode)    
  }


  useEffect(() => {
    debounceRef.current?.(currentInputCode);
    const hash = encodeURIComponent(currentInputCode);
    setHash(hash)
  }, [currentInputCode]);

  useEffect(() => {
    debounceRef.current = _.debounce(transpileCode, 1000);
  }, [transpileCode]);


    return (
      <div id="code-input-block" className="d-flex flex-column">
        <CodeMirror
          value={currentInputCode}
          // className="h-100"
          options={editorOptions}
          onBeforeChange={handleOnBeforeChange}
        />
        <ErrorAlert/>
      </div> 
  );
}

export default CodeInputBlock;

