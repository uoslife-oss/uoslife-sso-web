import Auth from './Auth';
import Device from './Device';

export const AuthAPI = Auth;
export const DeviceAPI = Device;

export type ErrorResponse = {
  error: string;
  message: string;
  statusCode: number;
};
