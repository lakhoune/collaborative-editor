import logo from "./logo.svg";
import React, { useRef } from "react";
import "./App.css";
import Editor from "@monaco-editor/react";
function App() {
  const monacoRef = useRef(null);
  function handleEditorDidMount(editor, monaco) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = editor;
    console.log(editor);
    console.log(monaco.editor.setTheme("vs-dark"));
  }

  return (
    <div className="App">
      <Editor
        height="100vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
      />
    </div>
  );
}

export default App;
