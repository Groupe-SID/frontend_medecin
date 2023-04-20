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
        labels: ['2019', '2020', '2021', '2022', '2023'],
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