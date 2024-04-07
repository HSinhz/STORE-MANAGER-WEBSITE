import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
const ChartSales = ({ data }) => {
    if (!data) return null;

    const labels = data.map(item => `Tuần ${item.week}`);
    const totalSales = data.map(item => parseInt(item.totalSales));
    console.log("Labels: ", labels);
    console.log("TotalSales:", totalSales)
    return (
        <>
            <Bar
                data={{
                    labels: labels,
                    datasets: [{
                        label: 'Doanh thu',
                        data: totalSales,
                        backgroundColor: 'rgba(0, 179, 255, 0.5)',
                        borderColor: 'rgba(0, 179, 255, 0.5)',
                        borderWidth: 1
                    }]
                }}
                options={{
                    scales: {
                        xAxes: [{ // Thay vì yAxes, sử dụng xAxes cho trục x
                            ticks: {
                                beginAtZero: true,
                                callback: function(value) {
                                    return value; // Trả về giá trị như đã chuyển đổi từ số sang chuỗi
                                }
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />
        </>
    );
}

export default ChartSales;
