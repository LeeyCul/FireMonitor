import request from '@/common/utils/request';

const baseUrl = 'http://iot.feelbang.com:8081';

/** 获取图表维度指标 */
export async function getIndicator(params?: any) {
  return request(`${baseUrl}/api/v3/views/4`, {
    method: 'get',
    params,
  });
}

/* 获取图表数据 */
export async function getChartsData(params?: any) {
  return request(`${baseUrl}/api/v3/views/4/getdata`, {
    method: 'post',
    data: params,
  });
}

/* 登陆 */
export async function getLogin(params: any) {
  return request('v1/user/login', {
    method: 'post',
    data: params,
  });
}

/* 区域列表 */
export async function getCityList(params?: any) {
  return request('v1//app/area/list', {
    method: 'get',
    params: { pid: 510000 },
  });
}
