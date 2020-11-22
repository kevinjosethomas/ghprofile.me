// Modules
import axios from "axios";
import React from "react";

// Components
import Navbar from "./components/Navbar.js";
import Landing from "./components/Landing.js";


export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  async componentDidMount() {

    let response = await axios.get("/historic/view?username=TrustedMercury")
    this.setState({
      data: response.data
    });

  }

  render() {
    let data = "hello"

    return (
      <div className="bg-gray-300 w-screen h-screen">
        <Navbar />
        <Landing data={this.state.data} />
      </div>
    )
  }

}
