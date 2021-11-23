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
      const { code, msg, accessToken } = yield call(apis.getLogin, userInfo);
      if (code) {
        return notification.error({ message: msg, duration: 1 });
      }
      sessionStorage.setItem('token', accessToken);
      if (accessToken) {
        sessionStorage.setItem('user', userInfo.username);
        history.push('/');
      }
    },
  },
  reducers: {},
};

export default Login;
