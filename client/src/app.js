import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home.js";
import Modal from "./pages/components/modal.js";
import "./styles/custom.css";
import "./styles/tailwind.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  };

  updateModal = (value) => {
    this.setState({
      showModal: value
    });
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
};
