import request from '@/common/utils/request';

const baseUrl = 'http://iot.feelbang.com:8081';
const baseUrl1 = 'http://qixiang.ttt.feelbang.com';

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
  return request(`${baseUrl1}/user/login`, {
    method: 'post',
    data: params,
  });
}

/* 区域列表 */
export async function getCityList(params?: any) {
  return request(`${baseUrl1}/app/area/list`, {
    method: 'get',
    params,
  });
}

/**
 * 根据区域获取日数据
 */
export async function getQueryDay(params?: any) {
  return request(`${baseUrl1}/app/data/query/day`, {
    method: 'get',
    params,
  });
}

/**
 * 获取单个站点数据
 */
export async function getDayRange(params?: any) {
  return request(`${baseUrl1}/app/data/query/day-range`, {
    method: 'get',
    params,
  });
}

/**
 * 火险监测-数据查询
 */
export async function getQueryDayFilter(params?: any) {
  return request(`${baseUrl1}/app/data/query/day-filter`, {
    method: 'get',
    params,
  });
}

/**
 * 获取案例库列表
 */
export async function getCaseList(params?: any) {
  return request('v1/app/data/query/case-list', {
    method: 'get',
    params,
  });
}

/**
 * 获取案例库详情
 */
export async function getCaseDetail(params?: any) {
  return request('v1/app/data/query/case-info', {
    method: 'get',
    params,
  });
}

/**
 * 删除案例库
 */
export async function deleteCase(data?: { ids: number[] }) {
  return request('v1/app/case', {
    method: 'delete',
    data,
  });
}

/**
 * 创建案例库
 */
export async function postCreateCase(params?: any) {
  return request('v1/app/case', {
    method: 'post',
    params,
  });
}

/**
 * 修改案例库
 */
export async function putUpdateCase(params?: any) {
  return request('v1/app/case', {
    method: 'put',
    params,
  });
}
