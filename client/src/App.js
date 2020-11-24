// Modules
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Home from "./pages/Home.js";
import Modal from "./pages/components/Modal.js";

// Other
import custom from "./styles/custom.css";
import tailwind from "./styles/tailwind.css";


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  };

  updateModal = (value) => {
    this.setState({
      showModal: value
    })
  }

  render() {
    return (
      <Router>
        {
          this.state.showModal &&
          <Modal showModal={this.state.showModal} updateModal={this.updateModal} />
        }
        <Route path="/" exact>
          <Home updateModal={this.updateModal} />
        </Route>
      </Router>
    );
  }
}
