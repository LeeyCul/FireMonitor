import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

interface Props {
  seriesData?: any[];
  direction?: 'level' | 'vertical';
  categoryData?: Array<string | number>;
}

function index({ seriesData, direction = 'level', categoryData }: Props) {
  const clearData = useMemo(
    () =>
      seriesData?.map((item) => ({
        ...item,
        data: item?.value,
        type: 'bar',
      })),
    [seriesData],
  );

  return (
    <ReactECharts
      notMerge
      style={{ width: '100%' }}
      option={{
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {},
        barWidth: 20,
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: direction === 'level' ? 'category' : 'value',
          data: direction === 'level' ? categoryData : [],
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: direction === 'vertical' ? 'category' : 'value',
          data: direction === 'vertical' ? categoryData : [],
        },
        series: clearData || [],
      }}
    />
  );
}

export default index;
