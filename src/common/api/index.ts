import request from '@/common/utils/request';

const baseUrl = 'http://iot.feelbang.com:8081';

/** 获取图表维度指标 */
export async function getIndicator(params?: any) {
  return request(`${baseUrl}/api/v3/views/4`, {
    method: 'get',
    params,
  });
}
