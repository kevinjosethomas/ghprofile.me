// Components
import Chart from "./Chart.js";


export default function Landing(props) {

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center mt-48 mb-32 px-2 text-center">
        <span className="text-5xl md:text-6xl font-inter font-bold leading-none">Automated <span className="text-indigo-600">Statistics</span></span>
        <span className="mt-2 md:max-w-2xl text-lg md:text-xl font-inter font-light leading-tight">Free GitHub analytics and statistics for personal and professional services. Discover new growth possibilities by efficiently analyzing growth statistics. </span>
      </div>

      <div className="flex flex-row items-center justify-start py-2 px-4 mb-10 w-3/12 bg-gray-300 rounded">
        <i class="fas fa-user text-gray-600 pr-2"></i>
        <input className="w-full bg-gray-300 outline-none text-gray-600 placeholder-gray-500" placeholder="Enter your GitHub username"></input>
      </div>

      <div className="flex flex-col items-center justify-center mb-48 p-2 py-10 w-10/12 max-w-full bg-gray-300 rounded-lg">
        <div className="flex flex-col items-center justify-center w-10/12 mt-10">
          <Chart className="w-full" data={props.data} />
        </div>

      </div>

  </div>
  )

}
