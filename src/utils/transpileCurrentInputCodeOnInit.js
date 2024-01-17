import * as Babel from "@babel/standalone";
import babelConfig from './babelConfig'

const transplieCurrentInputCodeOnInit = (currentInputCode) => {
    let currentTranspiledCode = "";
    try {
        currentTranspiledCode = Babel.transform(currentInputCode, babelConfig).code;
        return [
            currentTranspiledCode, {
                show: false,
                errorMessage: null
            }
        ];
    } catch (error) {
        return [
            currentTranspiledCode, {
                show: true,
                errorMessage: error.message
            }
        ];
    }
}

export default transplieCurrentInputCodeOnInit;