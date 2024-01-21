import React from 'react';
import HomePage from './pages/HomePage';
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>Doja Playground</title>
        <meta name="description" content="Doja Playground is an online tool for showcasing Doja, a headless framework, by creating React and Vue components in real-time" />
        <meta name="keywords" content="transpilyzer,babel,online repl, transpiler, compiler, javascript,ecmascript" />
      </Helmet>
      <HomePage />
    </>
  );
}

export default App;
