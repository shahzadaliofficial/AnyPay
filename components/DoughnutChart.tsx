'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const data = {
        datasets: [
            {
                label: 'banks',
                data: [1250, 2500, 1223, 3000, 1500],
                backgroundColor: [
                    '#0747b6', '#2265d8', '#2f91fa', '#4da0ff', '#7ab6ff'
                ]
            }
        ],
        labels: ['Bank A', 'Bank B', 'Bank C', 'Bank D', 'Bank E']
    };

    return (
        <Doughnut 
        data={data}
        options={{
            cutout:'60%',
            plugins: {
                legend: {
                    display: false,
                },
            }
        }}
        // className='w-[100px] h-[100px]'
        />
    )
}

export default DoughnutChart