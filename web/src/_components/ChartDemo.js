import React from 'react';
import { Chart } from 'primereact/chart';

const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#03A9F4'
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#FFC107'
        }
    ]
};

const pieData = {
    labels: ['A','B','C'],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#FFC107",
                "#03A9F4",
                "#4CAF50"
            ],
            hoverBackgroundColor: [
                "#FFE082",
                "#81D4FA",
                "#A5D6A7"
            ]
        }]
};

const polarData = {
    datasets: [{
        data: [
            11,
            16,
            7,
            3,
            14
        ],
        backgroundColor: [
            "#FFC107",
            "#03A9F4",
            "#4CAF50",
            "#E91E63",
            "#9C27B0"
        ],
        label: 'My dataset'
    }],
    labels: [
        "Yellow",
        "Blue",
        "Green",
        "Pink",
        "Purple"
    ]
};

const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: '#03A9F4',
            borderColor: '#03A9F4',
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'My Second dataset',
            backgroundColor: '#FFC107',
            borderColor: '#FFC107',
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

const doughnutData = {
    labels: ['A','B','C'],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#FFC107",
                "#03A9F4",
                "#4CAF50"
            ],
            hoverBackgroundColor: [
                "#FFE082",
                "#81D4FA",
                "#A5D6A7"
            ]
        }]
};

const radarData = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: 'My Second dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
};

export const ChartDemo = () => {

    return (
        <div className="p-grid p-fluid">
            <div className="p-col-12 p-lg-6">
                <div className="card">
                    <h5 className="centerText">Linear Chart</h5>
                    <Chart type="line" data={lineData} />
                </div>

                <div className="card">
                    <h5 className="centerText">Pie Chart</h5>
                    <Chart type="pie" data={pieData} />
                </div>

                <div className="card">
                    <h5 className="centerText">Polar Area Chart</h5>
                    <Chart type="polarArea" data={polarData} />
                </div>
            </div>
            <div className="p-col-12 p-lg-6">
                <div className="card">
                    <h5 className="centerText">Bar Chart</h5>
                    <Chart type="bar" data={barData} />
                </div>

                <div className="card">
                    <h5 className="centerText">Doughnut Chart</h5>
                    <Chart type="doughnut" data={doughnutData} />
                </div>

                <div className="card">
                    <h5 className="centerText">Radar Chart</h5>
                    <Chart type="radar" data={radarData} />
                </div>
            </div>
        </div>
    )
}
