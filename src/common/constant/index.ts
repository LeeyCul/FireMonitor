/* eslint-disable no-unused-vars */
/**
 * mapKey
 */
export const BasicConstants = {
  MapKey: '40aff7a4ba7ddda12efc54ea75879d66',
};

export enum Links {
  /* 服务专题-报告列表 */
  ServeReportList = '/serveReport/list',
  /* 服务专题-报告新增 */
  ServeReportAdd = '/serveReport/add',
  /* login */
  Login = '/login',
}
export const LevelList = [
  { color: '#43CF7C', text: '一级（低）', level: 1 },
  { color: '#0070c1', text: '二级（较低）', level: 2 },
  { color: '#E8DE1F', text: '三级（较高）', level: 3 },
  { color: '#F87E06', text: '四级（高）', level: 4 },
  { color: '#F60109', text: '五级（极高）', level: 5 },
];

/**
 * 数据绑定类型
 */
export const STATUS_CODE: any = {
  category: '维度',
  value: '指标',
};

/**
 * 数据源
 */
export const DATASOUCE_CODE: any = {
  category: '分类型',
  value: '指标型',
};

export enum ChartsType {
  Bar1 = 'bar1',
  Bar2 = 'bar2',
  Line1 = 'line1',
  Line2 = 'line2',
  Pie1 = 'pie1',
  Pie2 = 'pie2',
}

export enum columnsType {
  BIGINT = 'BIGINT',
  DECIMAL = 'DECIMAL',
}

/* 图形 */
export const figureList = [
  {
    title: '条形图',
    list: [
      { icon: 'iconzhuzhuangtu-jichu', key: 'bar1' },
      { icon: 'icontiaoxingtu-duidie', key: 'bar2' },
    ],
  },
  {
    title: '折线图',
    list: [
      { icon: 'iconzhexiantu-duidie', key: 'line1' },
      { icon: 'iconmianjitu-duidie', key: 'line2' },
    ],
  },
  {
    title: '饼图',
    list: [
      { icon: 'iconbingtu-huanxing', key: 'pie1' },
      { icon: 'iconbingtu-jichu', key: 'pie2' },
    ],
  },
  // { title: '分布图', list: [{ icon: 'iconshijieditu', key: 'map' }] },
];

export const Station = [
  { value: '1', label: '国家站' },
  { value: '2', label: '区域站' },
];

export const Standard = [
  { value: '国标', label: '国标' },
  {
    value: '地标',
    label: '国标',
    children: [
      { value: '算法一', label: '算法一' },
      { value: '算法二', label: '算法二' },
      { value: '算法三', label: '算法三' },
    ],
  },
];
