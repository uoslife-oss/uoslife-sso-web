import Auth from './Auth';
import Device from './Device';

import User from '@/api/User';

export const AuthAPI = Auth;
export const DeviceAPI = Device;
export const UserAPI = User;

export type ErrorResponse = {
  error: string;
  message: string;
  statusCode: number;
};
