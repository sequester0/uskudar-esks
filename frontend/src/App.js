import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState(null);

  useEffect(() => {
    fetch("/hello")
      .then((res) => res.json())
      .then((data) => setState(data.express));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!state ? "Loading..." : state}
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-3xl font-bold text-red-500 underline">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
