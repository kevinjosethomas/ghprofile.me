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

  get_data = async (username) => {

    let response = await axios.get(`${process.env.NODE_ENV === "development" ? "" : process.env.REACT_APP_API_URL}/historic/view?username=${username}`)
    this.setState({
      data: response.data.payload,
      username: username.toLowerCase()
    });
  }

  async componentDidMount() {
    this.get_data("TrustedMercury")
  }

  render() {

    return (
      <div className="bg-gray-200 w-full h-full">
        <Navbar />
        {this.state.data &&
          <Landing data={this.state.data} username={this.state.username} get_data={this.get_data} />
        }
      </div>
    )
  }

}
