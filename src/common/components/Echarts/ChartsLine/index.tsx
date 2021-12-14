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
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      }}
      // option={{
      //   tooltip: {
      //     trigger: 'axis',
      //   },
      //   legend: {
      //     icon: 'rect',
      //   },
      //   grid: {
      //     left: '3%',
      //     right: '4%',
      //     bottom: '3%',
      //     containLabel: true,
      //   },
      //   xAxis: {
      //     type: 'category',
      //     boundaryGap: false,
      //     data: categoryData || [],
      //   },
      //   yAxis: {
      //     type: 'value',
      //   },
      //   series: clearData || [],
      // }}
    />
  );
};

export default ChartsLine;
