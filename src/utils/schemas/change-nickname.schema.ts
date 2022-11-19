import * as yup from 'yup';

export type ChangeNicknameForm = {
  nickname: string;
};

export const changeNicknameSchema: yup.SchemaOf<ChangeNicknameForm> =
  yup.object({
    nickname: yup.string().required('변경할 닉네임을 입력하세요'),
  });
