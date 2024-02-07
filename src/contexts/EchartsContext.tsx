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

const option2Data = [
  {
    value: 9.9,
    itemStyle: {
      color: '#404040',
    },
  },
  {
    value: -9.2,
    itemStyle: {
      color: '#C9A2FF',
    },
  },
  {
    value: 7.3,
    itemStyle: {
      color: '#404040',
    },
  },
  {
    value: 5.1,
    itemStyle: {
      color: '#404040',
    },
  },
  {
    value: 4.1,
    itemStyle: {
      color: '#7A7A7A',
    },
  },
  {
    value: 3.7,
    itemStyle: {
      color: '#E2E2E2',
    },
  },
  {
    value: -3.7,
    itemStyle: {
      color: '#B5B5B5',
    },
  },
  {
    value: 3.7,
    itemStyle: {
      color: '#E2E2E2',
    },
  },
  {
    value: 3.7,
    itemStyle: {
      color: '#7A7A7A',
    },
  },
  {
    value: 3.7,
    itemStyle: {
      color: '#E2E2E2',
    },
  },
  {
    value: 3.7,
    itemStyle: {
      color: '#B5B5B5',
    },
  },
]

const option3Data = [
  {
    value: 9.9,
    itemStyle: {
      color: '#404040',
    },
  },
  {
    value: -9.2,
    itemStyle: {
      color: '#C9A2FF',
    },
  },
  {
    value: 7.3,
    itemStyle: {
      color: '#404040',
    },
  },
  {
    value: 5.1,
    itemStyle: {
      color: '#404040',
    },
  },
  {
    value: 4.1,
    itemStyle: {
      color: '#7A7A7A',
    },
  },
  {
    value: 3.7,
    itemStyle: {
      color: '#E2E2E2',
    },
  },
  {
    value: -3.7,
    itemStyle: {
      color: '#B5B5B5',
    },
  },
  {
    value: 3.7,
    itemStyle: {
      color: '#E2E2E2',
    },
  },
  {
    value: 3.7,
    itemStyle: {
      color: '#7A7A7A',
    },
  },
  {
    value: 3.7,
    itemStyle: {
      color: '#E2E2E2',
    },
  },
  {
    value: 3.7,
    itemStyle: {
      color: '#B5B5B5',
    },
  },
]

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
          data: option2Data.map(item => ({
            value: item.value,
            itemStyle: {
              ...(item.itemStyle || {}),
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
      series: [
        {
          color: '#ABCAAE',
          data:  option3Data.map(item => ({
            value: item.value,
            itemStyle: {
              ...(item.itemStyle || {}),
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
