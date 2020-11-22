// Modules
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex flex-row items-center justify-between w-screen py-3 px-5 md:px-20 bg-gray-400">
      <div className="flex flex-row items-center justify-center">
        <Link to="/" className="text-2xl md:text-3xl text-gray-800 font-semibold font-inter">ghprofile.me</Link>
      </div>
      <div className="flex flex-row items-center justify-center">
        <a href="https://docs.ghprofile.me" target="_blank" className="fas fa-book mr-2 text-3xl md:text-4xl text-gray-800"></a>
        <a href="https://github.com/TrustedMercury/ghprofile.me" target="_blank" className="fab fa-github ml-2 text-3xl md:text-4xl text-gray-800"></a>
      </div>
    </div>
  )
}
