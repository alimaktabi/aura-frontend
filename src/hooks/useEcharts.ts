import { BarChart } from 'echarts/charts';
import {
  DatasetComponent,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useState } from 'react';

echarts.use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

const useEcharts = () => {
  const [options, setOptions] = useState({
    xAxis: {
      type: 'category',
      axisLine: {
        show: true,
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    grid: {
      top: 10,
      bottom: 0,
      left: 0,
      right: 0,
    },
    series: [
      {
        color: '#ABCAAE',
        data: [
          280,
          {
            value: -170,
            itemStyle: {
              color: '#BC9191',
            },
          },
          150,
          130,
          120,
          110,
          {
            value: -100,
            itemStyle: {
              color: '#BC9191',
            },
          },
          89,
          80,
          75,
          70,
        ],
        label: {
          show: true,
          position: 'top',
          color: '#000',
        },
        type: 'bar',
      },
    ],
  });

  return {
    echarts,
    options,
  };
};

export default useEcharts;
