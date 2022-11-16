export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
};

export type RefreshRequest = {
  refreshToken: string;
};

export type RefreshResponse = {
  accessToken: string;
  userId: string;
};

export type ProfileResponse = {
  id: string;
  email: string;
  username: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  profileImage: string;
  state: 'unverified' | 'newbie' | 'verified';
  type: 'normal' | 'organization' | 'company' | 'university' | 'admin';
  studentNumber: string;
  major: string;
  department: string;
};
