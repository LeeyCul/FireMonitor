import { Reducer, Subscription, Effect } from 'umi';

export interface IState {
  type: number;
}

interface ICommon {
  namespace: 'common';
  state: IState;
  subscriptions: {};
  effects: {};
  reducers: {};
}

const Common: ICommon = {
  namespace: 'common',
  state: {
    type: 0,
  },
  subscriptions: {},
  effects: {},
  reducers: {},
};

export default Common;
