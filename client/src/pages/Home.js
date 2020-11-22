// Modules
import React from "react";

// Components
import Navbar from "./components/Navbar.js";


export default class Home extends React.Component {

  render() {
    return (
      <div className="bg-gray-300 w-screen h-screen">
        <Navbar />
      </div>
    )
  }

}
