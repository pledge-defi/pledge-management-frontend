// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 此处后端没有提供注释 POST /pool/debtTokenList */
export async function debtTokenList(options?: { [key: string]: any }) {
  return request<API.DebtTokenList>('/pool/debtTokenList', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Get pool by conditions POST /pool/search */
export async function getPoolByConditions(
  body: API.SearchRequest,
  options?: { [key: string]: any },
) {
  return request<API.SearchResponse>('/pool/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
