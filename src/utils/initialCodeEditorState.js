import setEditorThemeBasedOnTimeOfDay from "./setEditorThemeBasedOnTimeOfDay";
// import getSavedInputCode from "./getSavedInputCode";
import transpileCurrentInputCodeOnInit from "./transpileCurrentInputCodeOnInit";

const currentTheme = setEditorThemeBasedOnTimeOfDay(8, 18, {
    sunriseTheme: "default",
    sunsetTheme: "darcula"
})

const currentInputCode = `/** @jsx h */
import Doja, { create, watch, h } from 'doja'

const Counter = Doja(() => {
  const $counter = create(0)
  watch(() => console.log($counter.value))

  return () => (
    <button 
      onClick={() => $counter.value++} 
      style={{ border: '1px solid red' }}
    >
      count: {$counter.value}
    </button>
  )
})`

// getSavedInputCode();

const [currentTranspiledCode, errorState] = transpileCurrentInputCodeOnInit(currentInputCode);

const initialCodeEditorState = {
    currentInputCode,
    currentTranspiledCode,
    editorOptions: {
        theme: currentTheme,
        lineNumbers: true,
        lineWrapping: true,
        spellCheck: true,
        pollInterval: 5000,
        styleActiveLine: { nonEmpty: false },
        extraKeys: { 'Ctrl-/': 'toggleComment' },
        placeholder: "Type code here",
        mode:  "jsx"
    },
    error: errorState
}

export default initialCodeEditorState;