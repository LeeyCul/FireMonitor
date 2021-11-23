import ReactECharts from 'echarts-for-react';

interface Props {
  seriesData?: any[];
  isCover?: boolean;
  categoryData?: Array<string | number>;
}

const ChartsLine = ({ seriesData, isCover, categoryData }: Props) => {
  const clearData = seriesData?.map((item) => ({
    ...item,
    data: item?.value,
    stack: 'Total',
    type: 'line',
    areaStyle: isCover ? {} : null,
  }));
  return (
    <ReactECharts
      notMerge
      style={{ width: '100%' }}
      option={{
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          icon: 'rect',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: categoryData || [],
        },
        yAxis: {
          type: 'value',
        },
        series: clearData || [],
      }}
    />
  );
};

export default ChartsLine;
