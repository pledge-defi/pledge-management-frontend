/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { notification } from 'antd';
import { history } from 'umi';
import { extend } from 'umi-request';
import { PLEDGE_TOKEN } from './constants';

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  // errorHandler, // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
  // prefix: 'http://54.67.12.175:7005/api/v2',
  prefix: 'https://v2-backend.pledger.finance/api/v22',
  // prefix: '/api/v2',
});

// request interceptor, change url or options.
request.interceptors.request.use((url, options) => {
  const { headers } = options;
  const authCode = localStorage.getItem(PLEDGE_TOKEN) || undefined;
  const newHeaders = authCode ? { ...headers, authCode } : headers;
  return {
    url: url,
    options: {
      ...options,
      headers: newHeaders,
    },
  };
});

// handling error in response interceptor
request.interceptors.response.use(async (response) => {
  try {
    const data = await response.clone().json();
    if (
      (data && data.code && data.code === 1102) ||
      data.code === 1101 ||
      response.status === 401
    ) {
      localStorage.removeItem(PLEDGE_TOKEN);
      if (window.location.pathname !== '/users/login') {
        history.replace('/user/login');
      }
    } else if (data && data.code !== 0) {
      notification.error({
        message: data?.message,
      });
      return Promise.reject(data);
    }
  } catch (error) {}
  return response;
});

export default request;
