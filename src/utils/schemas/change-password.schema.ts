import * as yup from 'yup';

export type ChangePasswordForm = {
  password: string;
  passwordCheck: string;
};

export const changePasswordSchema: yup.SchemaOf<ChangePasswordForm> =
  yup.object({
    password: yup.string().required('변경할 비밀번호를 입력하세요.'),
    passwordCheck: yup.string().required('비밀번호 확인을₩ 입력하세요.'),
  });
