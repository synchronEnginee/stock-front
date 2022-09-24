/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { StocksInfoForChartStore } from '../ComparisonPage';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const randomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
};

type ScatterChartData = Array<{
  name: string;
  per: number;
  dividendYield: number;
}>;

export type ComparisonChartProps = {
  stockDatas: StocksInfoForChartStore;
};

// グラフ用の複数データ生成
export const dataForChart = (stockDatas: ScatterChartData) =>
  stockDatas.map((stockData) => {
    const color = randomColor();
    return {
      label: stockData.name,
      data: [{ x: stockData.per, y: stockData.dividendYield }],
      borderColor: color,
      backgroundColor: color,
      pointRadius: 16,
    };
  });

const ComparisonChart = ({ stockDatas }: ComparisonChartProps) => {
  const scatterDatas = Object.values(stockDatas).map(
    ({ name, per, dividendYield }) => ({ name, per, dividendYield }),
  );
  const data = {
    datasets: dataForChart(scatterDatas),
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '配当利回り',
        },
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'PER(予想)',
        },
      },
    },
  };

  return <Scatter width={730} height={250} data={data} options={options} />;
};

export default ComparisonChart;
