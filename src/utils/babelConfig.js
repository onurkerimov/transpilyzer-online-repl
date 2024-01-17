import * as Babel from '@babel/standalone'

// function transformer({types: t}) {
//   return {
//     visitor: {
//       ImportDeclaration(path) {
//         const { node } = path;
//         node.source.value = 'https://cdn.skypack.dev/' + node.source.value
//         // if(node.source.value !== 'doja') return
//         // // Check if the import is from the 'react' module
//         //   const a = node.specifiers.map((specifier) => specifier.imported ? t.objectProperty(specifier.local, specifier.imported): null).filter(Boolean)
//         //   const destructuringAssignment = t.variableDeclarator(
//         //       t.objectPattern(a),
//         //       t.identifier('Doja')
//         //     );


//         //   // Replace the import declaration with a variable declaration
//         //   path.replaceWith(t.variableDeclaration('const', [destructuringAssignment]));
//       },
//     },
//   };
// }
// Babel.registerPlugin('transform-imports-cdn', transformer);

export default { 
  presets: [],
  "plugins": [
      // Babel.availablePlugins['transform-imports-cdn'],
      [
        Babel.availablePlugins['transform-react-jsx'],
        {
          "runtime": "classic", // defaults to classic
        }
      ],
  ]
}