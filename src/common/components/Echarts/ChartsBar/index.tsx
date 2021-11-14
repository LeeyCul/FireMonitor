import ReactECharts from 'echarts-for-react';

interface Props {
  seriesData?: any[];
  direction?: 'level' | 'vertical';
  napeData?: Array<string | number>;
}

function index({ seriesData, direction = 'vertical', napeData }: Props) {
  return (
    <ReactECharts
      style={{ width: '100%' }}
      option={{
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['日期', '区域'],
        },
        barWidth: 20,
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: direction === 'vertical' ? 'category' : 'value',
          data: direction === 'vertical' ? ['日期', '区域', '温度'] : [],
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: direction === 'level' ? 'category' : 'value',
          data: direction === 'level' ? ['日期', '区域', '温度'] : [],
        },
        series: [
          {
            name: '日期',
            type: 'bar',
            data: [18203, 23489, 29034],
          },
          {
            name: '区域',
            type: 'bar',
            data: [19325, 23438, 31000],
          },
        ],
      }}
    />
  );
}

export default index;
