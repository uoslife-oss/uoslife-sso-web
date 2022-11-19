import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/api/instance';
import { ProfileResponse } from '@/models';
import { EditProfileRequest } from '@/models/User';

const editProfile = async (
  userId: string,
  data: EditProfileRequest,
): Promise<AxiosResponse<ProfileResponse>> => {
  return axiosInstance.patch(`/users/${userId}`, data);
};

export default {
  editProfile,
};
