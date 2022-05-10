import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [res, setRes] = useState<string>();
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL as string)
      .then((res) => setRes(res.data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {res}
      </header>
      <h1>This is newly added</h1>
    </div>
  );
}

export default App;
