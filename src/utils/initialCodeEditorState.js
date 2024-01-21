// import setEditorThemeBasedOnTimeOfDay from "./setEditorThemeBasedOnTimeOfDay";
// import getSavedInputCode from "./getSavedInputCode";
import { examples } from "./examples";
import transpileCurrentInputCodeOnInit from "./transpileCurrentInputCodeOnInit";

// getSavedInputCode();

const [currentTranspiledCode, errorState] = transpileCurrentInputCodeOnInit(examples.counter);

const initialCodeEditorState = {
    currentTranspiledCode,
    editorOptions: {
        theme: "moxer",
        lineNumbers: true,
        lineWrapping: false,
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