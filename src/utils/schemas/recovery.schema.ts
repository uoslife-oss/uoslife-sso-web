import * as yup from 'yup';

export type RecoveryForm = {
  email: string;
};

export const recoverySchema: yup.SchemaOf<RecoveryForm> = yup.object({
  email: yup.string().email().required('이메일을 입력하세요'),
});
