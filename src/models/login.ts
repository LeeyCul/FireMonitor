import { Effect, history } from 'umi';
import { notification } from 'antd';
import * as apis from '@/common/api';

interface ILogin {
  namespace: 'login';
  state: {};
  subscriptions: {};
  effects: {
    loginIn: Effect;
  };
  reducers: {};
}

const Login: ILogin = {
  namespace: 'login',
  state: {},
  subscriptions: {},
  effects: {
    *loginIn({ payload: userInfo }, { call, put }) {
      const { msg, data } = yield call(apis.getLogin, userInfo);
      const { tokenValue, isLogin } = data || {};
      if (!isLogin) {
        return notification.error({ message: msg, duration: 1 });
      }
      sessionStorage.setItem('token', tokenValue);
      if (tokenValue) {
        sessionStorage.setItem('user', userInfo.username);
        history.push('/');
      }
    },
  },
  reducers: {},
};

export default Login;
