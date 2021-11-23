import React, { useMemo } from 'react';
import { ChartsType, columnsType } from '@/common/constant';
import Bar from '../ChartsBar';
import Line from '../ChartsLine';
import Pie from '../ChartsPie';
import { getBracketStr } from '@/common/utils';

interface props {
  activeChaets: string;
  resultList: any[];
  columns: any[];
}

function RenderCharts({ activeChaets, resultList, columns }: props) {
  const displayValueNameList = useMemo(
    () =>
      columns
        ?.filter((item) => item?.type === columnsType.DECIMAL)
        ?.map((sub) => sub?.name),
    [columns],
  );

  const categoryList = useMemo(
    () =>
      columns
        ?.filter((item) => item?.type === columnsType.BIGINT)
        ?.map((sub) => sub?.name),
    [columns],
  );

  const data = displayValueNameList?.map((item: any) =>
    resultList.reduce((pre: any, cur: any) => {
      pre.name = getBracketStr(item);
      if (pre.value) {
        pre.value.push(cur[item]);
      } else {
        pre.value = [cur[item]];
      }
      return pre;
    }, {}),
  );

  const categoryData = resultList?.reduce((pre: any, cur: any) => {
    const item = categoryList[0];
    item && pre.push(cur[item]);
    return pre;
  }, []);

  const renderEcharts = () => {
    switch (activeChaets) {
      case ChartsType.Bar1:
        return <Bar seriesData={data} categoryData={categoryData} />;
      case ChartsType.Bar2:
        return (
          <Bar
            direction="vertical"
            seriesData={data}
            categoryData={categoryData}
          />
        );
      case ChartsType.Line1:
        return <Line seriesData={data} categoryData={categoryData} />;
      case ChartsType.Line2:
        return <Line seriesData={data} categoryData={categoryData} isCover />;
      case ChartsType.Pie1:
        return <Pie seriesData={data} />;
      case ChartsType.Pie2:
        return <Pie seriesData={data} isEmpty />;
      default:
        return <Bar />;
    }
  };
  return <div style={{ width: '100%' }}>{renderEcharts()}</div>;
}

export default RenderCharts;
