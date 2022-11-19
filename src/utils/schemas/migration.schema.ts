import * as yup from 'yup';

export type MigrationForm = {
  username: string;
  password: string;
  email: string;
  checkMigration: string;
  checkPrivacy: string;
  checkTos: string;
};

export const migrationSchema: yup.SchemaOf<MigrationForm> = yup.object({
  username: yup.string().required('아이디를 입력하세요'),
  password: yup.string().required('비밀번호를 입력하세요'),
  email: yup
    .string()
    .email('이메일 형식이 아닙니다')
    .required('이메일을 입력하세요'),
  checkMigration: yup.string().required('계정통합 약관에 동의해주세요.'),
  checkPrivacy: yup.string().required('개인정보처리방침에 동의해주세요.'),
  checkTos: yup.string().required('서비스 이용 약관에 동의해주세요.'),
});
