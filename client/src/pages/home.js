import { URLSearchParams } from "url";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../api.js";
import Navbar from "./components/navbar.js";
import Landing from "./components/landing.js";

export default withRouter(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  };

  async getData(username) {
    const response = await api.get(`/historic/view?username=${username}`)
    this.setState({
      data: response.data.payload,
      username: username.toLowerCase()
    });

    if (this.state.data.period._all_time === "0") {
      this.props.updateModal(true);
    };

  }

  async componentDidMount() {
    const parameters = new URLSearchParams(this.props.location.search.replace("?", ""));
    this.getData(parameters.username ? parameters.username : "TrustedMercury");
  }

  render() {
    return (
      <div className="bg-gray-200 w-full h-full">
        <Navbar />
        {
          this.state.data &&
          <Landing data={this.state.data} username={this.state.username} get_data={this.getData} />
        }
      </div>
    )
  }
});
