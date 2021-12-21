// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** Logs user into the system POST /user/login */
export async function loginUser(body: API.Login, options?: { [key: string]: any }) {
  return request<API.LoginResponse>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Logs out current logged in user session POST /user/logout */
export async function logoutUser(options?: { [key: string]: any }) {
  return request<any>('/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}
