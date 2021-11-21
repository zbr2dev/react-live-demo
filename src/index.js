import React from "react";
import ReactDOM from "react-dom";
import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";
import { transform } from "@babel/core";

const test = `
class TransformExample extends React.Component {

  boop = () => {
    console.log('boop')
  }

  render() {
    return (
      <center>
        <button onClick={this.boop}><h3>Boop!</h3></button>
      </center>
    )
  }
}
`;

function App() {
  return (
    <LiveProvider
      code={test}
      transformCode={code => {
        const transformed = transform(code, {
          plugins: [
            require("@babel/plugin-syntax-jsx"),
            [
              require("@babel/plugin-proposal-class-properties"),
              { loose: true }
            ]
          ]
        }).code;

        return transformed;
      }}
    >
      <LiveEditor />
      <LivePreview />
      <LiveError />
    </LiveProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
