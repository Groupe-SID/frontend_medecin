import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, LineElement, PointElement} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement
)

const LineChart = () => {
    var data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      }
    var options = {
        maintainAspectRatio: false,
        scales: {
            y: {
              beginAtZero: true
            }
          },
        legend:{
            labels:{
                fontSize: 14
            }
        }
    } 
  return (
    <div style={{
      position:"relative",
      width: "100%",
      height:"300px"
    }}>
        <Line
            data={data}
            options={options}
        />
    </div>
  )
}

export default LineChart