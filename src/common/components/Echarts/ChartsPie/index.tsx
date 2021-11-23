import ReactECharts from 'echarts-for-react';

interface Props {
  seriesData: any[];
  isEmpty?: boolean;
}

const ChartsPie = ({ seriesData, isEmpty }: Props) => {
  const clearData = seriesData?.map((item) => ({
    value: item?.value?.[0],
    name: item?.name,
  }));

  return (
    <ReactECharts
      style={{ width: '100%' }}
      notMerge
      option={{
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            type: 'pie',
            radius: !isEmpty ? ['45%', '60%'] : '50%',
            data: clearData || [],
          },
        ],
      }}
    />
  );
};

export default ChartsPie;
