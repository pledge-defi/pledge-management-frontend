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

/** Set pool multi-sign POST /pool/setMultiSign */
export async function postPoolSetMultiSign(
  body: API.SetMultiSignRequest,
  options?: { [key: string]: any },
) {
  return request<API.SetMultiSignResponse>('/pool/setMultiSign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Set pool multi-sign POST /pool/getMultiSign */
export async function postPoolGetMultiSign(
  body: API.GetMultiSignRequest,
  options?: { [key: string]: any },
) {
  return request<API.GetMultiSignResponse>('/pool/getMultiSign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get pool by conditions POST /pool/search${undefined} */
export async function getPoolByConditions(
  body: API.SearchRequest,
  options?: { [key: string]: any },
) {
  return request<API.SearchResponse>(`/pool/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Notice Server to get pool list POST /pool/poolList */
export async function PoolList(body: API.PoolListRequest, options?: { [key: string]: any }) {
  return request<any>('/pool/poolList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
