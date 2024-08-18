'use client';

import { Card, CardBody } from "@nextui-org/card"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart,
  ChartData,
  ChartOptions,
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

 ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);


type CardRarityDistributionData = {
  rarity: string,
  count: number
}

type CardRarityDistributionProps = {
  data: CardRarityDistributionData[]
}


const CardRarityDistribution: React.FC<CardRarityDistributionProps>  = ({data}: CardRarityDistributionProps) => {
  
  const convertRarityToSymbol = (rarity: string) => {
    
    if(rarity.includes('Common')) return 'Common'

    if(rarity.includes('Uncommon')) return 'Uncommon'

    if(rarity.includes('Rare Ultra')) return 'U Rare'

    if(rarity.includes('Rare Secret')) return 'S Rare'

    return 'Rare'
  }

  const labels = useMemo(() => {

    const labels = data.map(d => convertRarityToSymbol(d.rarity))

    // make sure label are unique
    return labels.filter((value, index, self) => self.indexOf(value) === index)

  }, [data])

  const options: ChartOptions<'bar'> = useMemo(() => ({
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
        },
      }
    }), []);
  
  const chartData: ChartData<'bar', number[]> = useMemo(() => ({
    labels: data.map(d => d.rarity),
    datasets: [
      {
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
  }), [data, labels]);

  console.log(chartData)

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

export type { CardRarityDistributionData }

export default CardRarityDistribution