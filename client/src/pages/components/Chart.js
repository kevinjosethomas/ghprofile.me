// Modules
import { Line } from "react-chartjs-2";

export default function Chart(props) {

  const labels = []
  const datapoints = []

  props.data.forEach((item, index) => {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];


    let date_obj = new Date(Date.parse(item.reporting_date));

    labels.push(`${date_obj.getDate()} ${monthNames[date_obj.getMonth()]}`);
    datapoints.push(item.no_of_views);

  })

  return (
    <Line
      options={{
        responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          xPadding: 20,
          yPadding: 15,
          displayColors: false,
          titleFontFamily: "Inter",
          titleFontSize: 14,
          bodyFontFamily: "Inter",
          bodyFontSize: 16
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false,
              drawBorder: false,
              borderDash: [8, 4]
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20
            }
          }],
          yAxes: [{
            gridLines: {
              borderDash: [8, 4]
            },
            ticks: {
              precision: 0,
              autoSkip: true,
              maxTicksLimit: 10
            }
          }]
        }
      }}
      data={{
        labels: labels,
        datasets: [{
          label: "Views",
          data: datapoints,
          backgroundColor: null,
          borderColor: "#4F46E5",
          backgroundColor: "#8C85ED",
          pointBackgroundColor: "#4F46E5"
        }]
      }}
    />
  )

}
