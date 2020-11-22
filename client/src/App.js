import React from "react";
import { Line } from 'react-chartjs-2';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Home from "./pages/Home.js";

import Tailwind from "./styles/tailwind.css";

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Home />
      </Route>
    </Router>
  );
}

export default App;
