export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
};

export type RegisterRequest = {
  username: string;
  password: string;
  email: string;
  name: string;
  phoneNumber: string;
};

export type RegisterResponse = Omit<
  ProfileResponse,
  'studentNumber' | 'major' | 'department'
>;

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

export type MigrationRequest = {
  username: string;
  password: string;
  email: string;
};
