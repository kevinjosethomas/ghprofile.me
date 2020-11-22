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
      data: response.data.payload
    });

  }

  render() {

    return (
      <div className="bg-gray-200 w-full h-full">
        <Navbar />
        {this.state.data &&
          <Landing data={this.state.data} />
        }
      </div>
    )
  }

}
