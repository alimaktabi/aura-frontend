import { createContext, useState } from 'react';

export const EchartsContext = createContext<{
  options: any;
}>({
  options: {},
});

interface ProviderProps {
  children: React.ReactNode;
}

export const EchartsContextProvider = ({ children }: ProviderProps) => {
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
      top: 15,
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

  return (
    <EchartsContext.Provider value={{ options }}>
      {children}
    </EchartsContext.Provider>
  );
};
