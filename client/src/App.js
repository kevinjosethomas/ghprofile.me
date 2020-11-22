// Modules
import React from "react";
import { Line } from 'react-chartjs-2';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Home from "./pages/Home.js";

// Other
import custom from "./styles/custom.css";
import tailwind from "./styles/tailwind.css";


export default function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Home />
      </Route>
    </Router>
  );
}
