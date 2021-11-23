import { Reducer, Effect } from 'umi';
import * as apis from '@/common/api';

export interface IState {
  resultList: any[];
  columns: any[];
}

interface IDetection {
  namespace: 'detection';
  state: IState;
  subscriptions: {};
  effects: {
    getChartsFetchData: Effect;
  };
  reducers: {
    setCharsData: Reducer;
  };
}
const Detection: IDetection = {
  namespace: 'detection',
  state: {
    resultList: [],
    columns: [],
  },
  subscriptions: {},
  effects: {
    *getChartsFetchData({ payload }, { call, put }) {
      const { payload: data } = yield call(apis.getChartsData, payload);
      const { resultList, columns } = data || {};
      yield put({ type: 'setCharsData', payload: { resultList, columns } });
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
  },
};

export default Detection;
