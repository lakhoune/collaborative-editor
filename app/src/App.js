import logo from "./logo.svg";
import React, { useRef } from "react";
import "./App.css";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";

const ydoc = new Y.Doc();
const type = ydoc.getText("monaco");

// Sync clients with the y-websocket provider
const websocketProvider = new WebsocketProvider(
  "ws://localhost:1234",
  "count-demo",
  ydoc
);

const stringToColour = function (str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

function App() {
  const monacoRef = useRef(null);
  function handleEditorDidMount(editor, monaco) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = editor;
    console.log(editor);
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      monaco.editor.setTheme("vs-dark"); // dark mode
    }
    

    const monacoBinding = new MonacoBinding(
      type,
      editor.getModel(),
      new Set([editor]),
      websocketProvider.awareness
    );
    console.log(ydoc);
    console.log(monacoBinding);
    websocketProvider.awareness.on("update", (d) => {
      console.log(websocketProvider);
      console.log("update", d);
    });
    console.log(websocketProvider.awareness.clientID);
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
