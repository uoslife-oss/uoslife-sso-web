import * as yup from 'yup';

export type ChangeAvatarForm = {
  profileImage: string;
};

export const changeAvatarSchema: yup.SchemaOf<ChangeAvatarForm> = yup.object({
  profileImage: yup.string().required('변경할 프로필 사진을 선택하세요.'),
});
