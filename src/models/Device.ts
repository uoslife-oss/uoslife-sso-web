export type DeviceProfile = {
  id: string;
  type: 'ios' | 'android';
  model: string;
  buildNumber: number;
};
