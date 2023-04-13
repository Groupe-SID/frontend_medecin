import React from 'react'
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js'
import {Bar} from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const BarChart = () => {
    var data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      }
    var options = {
        responsive: true,
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
        <Bar
            data={data}
            height={120}
            options={options}
        />
    </div>
  )
}

export default BarChart