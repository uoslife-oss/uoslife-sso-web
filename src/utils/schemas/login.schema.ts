import * as yup from 'yup';

export type LoginForm = {
  username: string;
  password: string;
};

export const loginSchema: yup.SchemaOf<LoginForm> = yup.object({
  username: yup.string().required('아이디를 입력하세요'),
  password: yup.string().required('비밀번호를 입력하세요'),
});
