import * as yup from 'yup';

export type RegisterForm = {
  username: string;
  password: string;
  passwordCheck: string;
  name: string;
  email: string;
  phoneNumber: string;
  checkPrivacy: string;
  checkTos: string;
};

export const registerSchema: yup.SchemaOf<RegisterForm> = yup.object({
  username: yup
    .string()
    .min(6, '아이디는 6자 이상이어야 합니다.')
    .matches(/^[A-z]+$/i, '아이디는 영문자만 사용할 수 있습니다.')
    .required('아이디를 입력해주세요.'),
  password: yup
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .required('비밀번호를 입력해주세요.'),
  passwordCheck: yup.string().required('비밀번호 확인을 입력해주세요.'),
  name: yup.string().required('이름을 입력해주세요.'),
  email: yup.string().email().required('이메일을 입력해주세요.'),
  phoneNumber: yup.string().required('전화번호를 입력해주세요.'),
  checkPrivacy: yup.string().required('개인정보처리방침에 동의해주세요.'),
  checkTos: yup.string().required('서비스 이용약관에 동의해주세요.'),
});
