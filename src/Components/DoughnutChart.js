import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

const DoughnutChart = ({ data, options }) => {
    return (
        <>
            <Doughnut data={data} options={options} />
        </>
    );
};

export default DoughnutChart;
