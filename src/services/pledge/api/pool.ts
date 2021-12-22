// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 此处后端没有提供注释 POST /pool/debt_token_name */
export async function debtTokenName(options?: { [key: string]: any }) {
  return request<API.TokenName>('/pool/debt_token_name', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Get pool by conditions POST /pool/search */
export async function getPoolByConditions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPoolByConditionsParams,
  options?: { [key: string]: any },
) {
  return request<API.SearchResponse>('/pool/search', {
    method: 'POST',
    params: {
      // poolStatus has a default value: match
      poolStatus: 'match',
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 10
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}