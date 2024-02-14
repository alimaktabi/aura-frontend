import { createContext, useMemo } from 'react';

export const EchartsContext = createContext<{
  options: any;
  options2: any;
  options3: any;
}>({
  options: {},
  options2: {},
  options3: {},
});

interface ProviderProps {
  children: React.ReactNode;
}

const testData = [
  {
    value: 9.9,
  },
  {
    value: -9.2,
  },
  {
    value: 7.3,
  },
  {
    value: 4,
  },
  {
    value: 3.7,
  },
  {
    value: -3.7,
  },
  {
    value: -2.6,
  },
  {
    value: 2.3,
  },
  {
    value: 1.8,
  },
  {
    value: -1.3,
  },
  {
    value: 0.5,
  },
];

const valueColorMap = {
  '-4': '#924848',
  '-3': '#DA6A6A',
  '-2': '#EE9D9D',
  '-1': '#F5BFBF',
  '1': '#D5ECDA',
  '2': '#B4E6C0',
  '3': '#72BF83',
  '4': '#5B9969',
};

const findNearestColor = (value: any, colorMap: any) => {
  const nearestValue = Object.keys(colorMap).reduce((prev, curr) =>
    Math.abs(Number(curr) - value) < Math.abs(Number(prev) - value)
      ? curr
      : prev,
  );
  return colorMap[nearestValue];
};

export const EchartsContextProvider = ({ children }: ProviderProps) => {
  const options = useMemo(
    () => ({
      xAxis: {
        type: 'category',
        axisLine: {
          show: true,
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          // Setting splitLine to null removes the lines indicating x-axis values
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      grid: {
        top: 15,
        bottom: 0,
        left: 0,
        right: 0,
      },
      series: [
        {
          color: '#ABCAAE',
          data: [
            9.9,
            {
              value: -9.2,
              itemStyle: {
                color: '#BC9191',
              },
            },
            7.3,
            5.1,
            4.1,
            3.7,
            {
              value: -3.7,
              itemStyle: {
                color: '#BC9191',
              },
            },
            3.7,
            3.7,
            3.7,
            3.7,
          ],
          label: {
            show: true,
            position: 'top',
            color: '#000',
            formatter: (params: any) => {
              return `${params.value}k`;
            },
          },
          type: 'bar',
          barGap: '0', // Set barGap to 0 to remove the gap between bars
        },
      ],
    }),
    [],
  );

  const options2 = useMemo(
    () => ({
      xAxis: {
        type: 'category',
        axisLine: {
          show: true,
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          // Setting splitLine to null removes the lines indicating x-axis values
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      grid: {
        top: 15,
        bottom: 0,
        left: 0,
        right: 0,
      },
      series: [
        {
          color: '#ABCAAE',
          data: testData.map((item) => ({
            value: item.value,
            itemStyle: {
              color: findNearestColor(item.value, valueColorMap),
              borderRadius: item.value >= 0 ? [4, 4, 0, 0] : [0, 0, 4, 4],
            },
          })),
          label: {
            show: true,
            position: 'top',
            color: '#000',
            formatter: (params: any) => {
              return `${params.value}k`;
            },
          },
          type: 'bar',
          barGap: '0', // Set barGap to 0 to remove the gap between bars
        },
      ],
    }),
    [],
  );

  const options3 = useMemo(
    () => ({
      ...options2,
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      xAxis: {
        axisTick: {
          // Setting splitLine to null removes the lines indicating x-axis values
          show: false,
        },
      },
      series: [
        {
          color: '#ABCAAE',
          data: testData.map((item) => ({
            value: item.value,
            itemStyle: {
              color: findNearestColor(item.value, valueColorMap),
              borderRadius: item.value >= 0 ? [4, 4, 0, 0] : [0, 0, 4, 4],
            },
          })),
          label: {
            show: false,
          },
          type: 'bar',
        },
      ],
    }),
    [options2],
  );

  return (
    <EchartsContext.Provider value={{ options, options2, options3 }}>
      {children}
    </EchartsContext.Provider>
  );
};
