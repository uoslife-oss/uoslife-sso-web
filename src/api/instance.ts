import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios, { AxiosError } from 'axios';

import { AuthAPI } from './index';

import { TokenStorage } from '@/utils/storages';

type RetryConfig = { remainingRetry?: number };
type RequestWithRetry = AxiosRequestConfig & RetryConfig;
type ErrorWithRetry = AxiosError & { config: RequestWithRetry };

const RETRY_COUNT = 3;
const TIMEOUT = 2000;

export const axiosInstance = axios.create({
  baseURL: 'https://sso-api.uoslife.team',
  validateStatus: (status: number) => status !== 401,
});

const onFulfilled = (response: AxiosResponse): AxiosResponse => response;

const onRejected = async (error: ErrorWithRetry): Promise<AxiosResponse> => {
  if (!error.config.remainingRetry) error.config.remainingRetry = RETRY_COUNT;
  if (error.config.remainingRetry < 0) return Promise.reject(error);

  error.config.remainingRetry = error.config.remainingRetry - 1;

  const { status, data } = await AuthAPI.Refresh({
    refreshToken: TokenStorage.refreshToken.get() || '',
  });
  if (status === 401) return Promise.reject(error);

  TokenStorage.accessToken.set(data.accessToken);
  return axiosInstance.request(error.config);
};

axiosInstance.interceptors.request.use((request: RequestWithRetry) => ({
  timeout: TIMEOUT,
  ...request,
  headers: {
    ...request.headers,
    Authorization: `Bearer ${TokenStorage.accessToken.get()}`,
  },
}));

axiosInstance.interceptors.response.use(onFulfilled, onRejected);
