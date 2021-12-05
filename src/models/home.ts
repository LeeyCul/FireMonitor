import { Reducer, Effect } from 'umi';
import * as apis from '@/common/api';

interface DataQueryRespon {
  list?: any[];
  totalPage?: number;
  totalRow?: number;
}

export interface IState {
  resultList: any[];
  columns: any[];
  fireList: any[];
  dataQuery: DataQueryRespon;
  caseList: any[];
}

interface IDetection {
  namespace: 'detection';
  state: IState;
  subscriptions: {};
  effects: {
    getChartsFetchData: Effect;
    getQueryDayData: Effect;
    getDataQuery: Effect;
    getCaseList: Effect;
  };
  reducers: {
    setCharsData: Reducer;
    setFireList: Reducer;
    setDataQueryPageData: Reducer;
    setCaseList: Reducer;
  };
}
const Detection: IDetection = {
  namespace: 'detection',
  state: {
    resultList: [],
    columns: [],
    fireList: [],
    dataQuery: {},
    caseList: [],
  },
  subscriptions: {},
  effects: {
    *getChartsFetchData({ payload }, { call, put }) {
      const { payload: data } = yield call(apis.getChartsData, payload);
      const { resultList, columns } = data || {};
      yield put({ type: 'setCharsData', payload: { resultList, columns } });
    },
    *getQueryDayData({ payload: query }, { call, put }) {
      const { data } = yield call(apis.getQueryDay, query);
      yield put({ type: 'setFireList', payload: data });
    },
    *getDataQuery({ payload: query }, { call, put }) {
      const { data } = yield call(apis.getQueryDayFilter, query);
      yield put({ type: 'setDataQueryPageData', payload: data });
    },
    *getCaseList({ payload: query }, { call, put }) {
      const { data } = yield call(apis.getCaseList, query);
      yield put({ type: 'setCaseList', payload: data?.list || [] });
    },
  },
  reducers: {
    setCharsData(state, { payload: { resultList, columns } }) {
      return {
        ...state,
        resultList: resultList?.length ? resultList : [],
        columns: columns?.length ? columns : [],
      };
    },
    setFireList(state, { payload }) {
      return {
        ...state,
        fireList: payload,
      };
    },
    setDataQueryPageData(state, { payload }) {
      return {
        ...state,
        dataQuery: payload,
      };
    },
    setCaseList(state, { payload }) {
      return {
        ...state,
        caseList: payload,
      };
    },
  },
};

export default Detection;
