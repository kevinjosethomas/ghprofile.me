// Modules
import { Link } from "react-router-dom";

export default function Navbar(props) {

  return (
    <div className="flex flex-row items-center justify-between w-screen py-3 px-5 md:px-20 bg-gray-300">
      <div className="flex flex-row items-center justify-center">
        <Link to="/" className="text-2xl md:text-3xl text-gray-800 font-semibold font-inter">ghprofile.me</Link>
      </div>
      <div className="flex flex-row items-center justify-center">
        <a href="https://docs.ghprofile.me" rel="noreferrer" target="_blank" className="mr-2"><i className="fas fa-book text-3xl md:text-4xl text-gray-800"></i></a>
        <a href="https://github.com/TrustedMercury/ghprofile.me" rel="noreferrer" target="_blank" className="ml-2"><i className="fab fa-github text-3xl md:text-4xl text-gray-800"></i></a>
      </div>
    </div>
  )

}
