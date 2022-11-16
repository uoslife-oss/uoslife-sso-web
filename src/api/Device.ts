import type { AxiosResponse } from 'axios';

import { axiosInstance } from './instance';

import { DeviceProfile } from '@/models';

const getDeviceList = (): Promise<AxiosResponse<DeviceProfile[]>> =>
  axiosInstance.get('/devices');

const getDevice = (deviceId: string): Promise<AxiosResponse<DeviceProfile>> =>
  axiosInstance.get(`/devices/${deviceId}`);

const deleteDevice = (deviceId: string): Promise<AxiosResponse<boolean>> =>
  axiosInstance.delete(`/devices/${deviceId}`);

export default {
  getDeviceList,
  getDevice,
  deleteDevice,
};
