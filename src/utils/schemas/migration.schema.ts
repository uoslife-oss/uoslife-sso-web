import * as yup from 'yup';

export type MigrationForm = {
  username: string;
  password: string;
  email: string;
};

export const migrationSchema: yup.SchemaOf<MigrationForm> = yup.object({
  username: yup.string().required('아이디를 입력하세요'),
  password: yup.string().required('비밀번호를 입력하세요'),
  email: yup
    .string()
    .email('이메일 형식이 아닙니다')
    .required('이메일을 입력하세요'),
});
