import type { AxiosResponse } from 'axios';

import { axiosInstance } from './instance';

import {
  LoginRequest,
  LoginResponse,
  MigrationRequest,
  ProfileResponse,
  RefreshRequest,
  RefreshResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/models';
import { TokenStorage } from '@/utils/storages';

const login = async (
  data: LoginRequest,
): Promise<AxiosResponse<LoginResponse>> => {
  return axiosInstance.post('/auth/login', data);
};

const register = async (
  data: RegisterRequest,
): Promise<AxiosResponse<RegisterResponse>> => {
  return axiosInstance.post('/users', data);
};

const refresh = async (
  data: RefreshRequest,
): Promise<AxiosResponse<RefreshResponse>> => {
  const response = await axiosInstance.patch('/auth/refresh', data);

  if (response.status === 200) {
    TokenStorage.accessToken.set(response.data.accessToken);
  }

  return response;
};

const profile = async (): Promise<AxiosResponse<ProfileResponse>> =>
  axiosInstance.get('/auth/profile');

const migration = async (
  data: MigrationRequest,
): Promise<AxiosResponse<ProfileResponse>> =>
  axiosInstance.post('/users/migration', data);

export default {
  login,
  register,
  refresh,
  profile,
  migration,
};
