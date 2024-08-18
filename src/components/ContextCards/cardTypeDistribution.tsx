'use client'

import { Card, CardBody } from "@nextui-org/card"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useMemo } from "react";
import { Bar } from 'react-chartjs-2';

import ChartDataLabels from "chartjs-plugin-datalabels";

type CardTypeDistributionData = {
  kind: string,
  count: number
}

type CardTypeDistributionProps = {
  data: CardTypeDistributionData[]
}

export const options: any = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
    datalabels: {
      color: 'white',
      align : 'end',
      clamp: true
    },
    tooltip: {
      enabled: false
    }
  },
  scales: {
    x: {
      grid: {
        offset: true,
      },
      ticks: {
        color: 'white',
      },
    },
    y: {
      display: false,
      ticks: {
        sampleSize: 10,
      }
    },
  }
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

const CardTypeDistribution: React.FC<CardTypeDistributionProps> = ({data}: CardTypeDistributionProps) => {

  const chartData = useMemo(() => ({
    labels: data.map(d => d.kind),
    datasets: [
      {
        label: 'Card Type Distribution',
        data: data.map(d => d.count),
        backgroundColor: [
          '#006FEE',
          '#17C964',
          '#F31260',
          '#F5A524',
          '#7828C8',
          '#FF4ECD',
        ],
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  }), [data]);

  return (
    <Card className='h-56'>
      <CardBody>
        <div className="flex flex-col items-start gap-2 justify-center h-full">
          <h4 className="flex-grow">Distribution By Kind</h4>
          <Bar data={chartData} options={options} />
        </div>
      </CardBody>
    </Card>
  )
}

export type { CardTypeDistributionData }

export default CardTypeDistribution