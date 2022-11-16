import type { AxiosResponse } from 'axios';

import { axiosInstance } from './instance';

import {
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  RefreshRequest,
  RefreshResponse,
} from '@/models';
import { TokenStorage } from '@/utils/storages';

const Login = async (
  data: LoginRequest,
): Promise<AxiosResponse<LoginResponse>> => {
  const response = await axiosInstance.post('/auth/login', data);

  if (response.status === 201) {
    TokenStorage.accessToken.set(response.data.accessToken);
    TokenStorage.refreshToken.set(response.data.refreshToken);
  }

  return response;
};

const Refresh = async (
  data: RefreshRequest,
): Promise<AxiosResponse<RefreshResponse>> => {
  const response = await axiosInstance.patch('/auth/refresh', data);

  if (response.status === 200) {
    TokenStorage.accessToken.set(response.data.accessToken);
  }

  return response;
};

const Profile = async (): Promise<AxiosResponse<ProfileResponse>> =>
  axiosInstance.get('/auth/profile');

export default {
  Login,
  Refresh,
  Profile,
};
