// Components
import Chart from "./Chart.js";


export default function Landing(props) {

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center mt-48 mb-32 px-2 text-center">
        <span className="text-5xl md:text-6xl font-inter font-bold leading-none">Automated <span className="text-indigo-600">Statistics</span></span>
        <span className="mt-2 md:max-w-2xl text-lg md:text-xl font-inter font-light leading-tight">Free GitHub analytics and statistics for personal and professional services. Discover new growth possibilities by efficiently analyzing growth statistics. </span>
      </div>

      <div className="flex flex-row items-center justify-start py-2 px-4 mb-10 w-5/12 bg-gray-300 rounded">
        <i className="fas fa-user text-gray-600 pr-2"></i>
        <input onKeyPress={(event) => event.key === "Enter" ? props.get_data(event.target.value) : void(0)} className="w-full bg-gray-300 outline-none text-gray-600 placeholder-gray-500" placeholder="Enter your GitHub username or repository (username-repository)"></input>
      </div>

      <div className="flex flex-col items-center justify-center mb-48 p-2 py-10 w-10/12 max-w-full bg-gray-300 rounded-lg text-center">
        <span className="mb-5 text-3xl md:text-4xl font-inter font-semibold">@<span className="font-bold">{props.username}</span>'s GitHub Stats</span>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full md:w-auto py-3 px-5 my-3 md:my-0 md:mx-3 bg-gray-400 rounded-lg">
            <span className="font-inter text-2xl font-semibold"><i className="fab fa-slack-hash"></i> All Time</span>
            <span className="font-inter text-3xl font-semibold text-indigo-600">{ props.data.period._all_time }</span>
          </div>
          <div className="flex flex-col items-center justify-center w-full md:w-auto py-3 px-5 my-3 md:my-0 md:mx-3 bg-gray-400 rounded-lg">
            <span className="font-inter text-2xl font-semibold"><i className="fab fa-slack-hash"></i> 30 days</span>
            <span className="font-inter text-3xl font-semibold text-indigo-600">{ props.data.period._month }</span>
          </div>
          <div className="flex flex-col items-center justify-center w-full md:w-auto py-3 px-5 my-3 md:my-0 md:mx-3 bg-gray-400 rounded-lg">
            <span className="font-inter text-2xl font-semibold"><i className="fab fa-slack-hash"></i> 14 days</span>
            <span className="font-inter text-3xl font-semibold text-indigo-600">{ props.data.period._fortnight }</span>
          </div>
          <div className="flex flex-col items-center justify-center w-full md:w-auto py-3 px-5 my-3 md:my-0 md:mx-3 bg-gray-400 rounded-lg">
            <span className="font-inter text-2xl font-semibold"><i className="fab fa-slack-hash"></i> 7 days</span>
            <span className="font-inter text-3xl font-semibold text-indigo-600">{ props.data.period._week }</span>
          </div>
          <div className="flex flex-col items-center justify-center w-full md:w-auto py-3 px-5 my-3 md:my-0 md:mx-3 bg-gray-400 rounded-lg">
            <span className="font-inter text-2xl font-semibold"><i className="fab fa-slack-hash"></i> 1 day</span>
            <span className="font-inter text-3xl font-semibold text-indigo-600">{ props.data.period._day }</span>
          </div>
          <div className="flex flex-col items-center justify-center w-full md:w-auto py-3 px-5 my-3 md:my-0 md:mx-3 bg-gray-400 rounded-lg">
            <span className="font-inter text-2xl font-semibold"><i className="fab fa-slack-hash"></i> 1 hour</span>
            <span className="font-inter text-3xl font-semibold text-indigo-600">{ props.data.period._hour }</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-10/12 mt-10">
          <Chart className="w-full" data={props.data} />
        </div>
      </div>

    </div>
  )

}
