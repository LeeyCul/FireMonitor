import { extend } from 'umi-request';
import { message, Modal } from 'antd';
import { history } from 'umi';

const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户密码错误',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
  const { response } = error;
  if (response && response.status) {
    const errorText: any = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    if (status === 401) {
      const urlAddress = url.split('/').pop();
      if (urlAddress === 'login') {
        message.error(errorText);
      } else {
        function error() {
          Modal.error({
            title: '提示',
            content: '当前登录已过期，请重新登陆！',
            okText: '确定',
            onOk() {
              // history.push('/login');
            },
          });
        }
        error();
      }
    } else {
      message.error(errorText);
    }
  }

  return response;
};

const request = extend({
  errorHandler,
  // prefix: 'https://restapi.amap.com/v3',
  // credentials: 'include', // 默认请求是否带上cookie
});
/**
 * request拦截器, 改变url 或 options.
 */
request.interceptors.request.use((url: string, options: any) => {
  let token = sessionStorage.getItem('token');
  if (!token) {
    // history.push('/login');
  }
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Authorization': `Bearer ${token}`,
    Authorization:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9jcmVhdGVfdGltZSI6MTYzNzQ5OTQwNTgxMiwic3ViIjoiYWRtaW4iLCJ0b2tlbl91c2VyX25hbWUiOiJhZG1pbiIsImV4cCI6MTYzNzUwMTIwNSwidG9rZW5fdXNlcl9wYXNzd29yZCI6IiQyYSQxMCRHMFhkZGZrVzNlRGNpZWZLU0dGTm1lZDBNN0dWemgwLnA0ajQ0N2dMc3k2Uy83TEZobjV4ZSJ9.cwyINGil2UleEli3KLOQoWne_QhkOgCvf2H6ayUPm49GOkQVTWR-rG93OAaZCnUMpSpGt5GTRtOKBK5nDWVPeQ',
  };
  return {
    url: encodeURI(url),
    options: {
      ...options,
      headers,
    },
  };
});

/**
 * response拦截器, 处理response
 */
request.interceptors.response.use(async (response) => response.json());

export default request;
