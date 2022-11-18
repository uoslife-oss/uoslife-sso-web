import { get } from 'radash';
import * as React from 'react';
import { useCallback } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { AuthAPI, ErrorResponse } from '@/api';
import ActionButton from '@/components/buttons/ActionButton';
import CheckInput from '@/components/forms/CheckInput';
import TextInput from '@/components/forms/TextInput';
import Col from '@/components/utils/Col';
import { useYupValidationResolver } from '@/hooks/YupValidationResolver';
import { getErrorInfo } from '@/utils/configs/error.config';
import { RegisterForm, registerSchema } from '@/utils/schemas';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const { handleSubmit, control, setError, formState } = useForm<RegisterForm>({
    resolver: useYupValidationResolver<RegisterForm>(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterForm> = useCallback(async (form) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, checkPrivacy, checkTos, ...requestForm } = form;

    if (requestForm.password !== passwordCheck) {
      const { field, message } =
        getErrorInfo<RegisterForm>('PASSWORD_NOT_MATCH');
      return setError(field, { message });
    }

    const { status, data } = await AuthAPI.register(requestForm);
    if (status === 201) return navigate('/login');

    const error = data as unknown as ErrorResponse;
    const { field, message } = getErrorInfo<RegisterForm>(error.message);

    toast.error('입력 내용을 확인해주세요.');
    return setError(field, { message });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Col gap={32}>
        <Col gap={16}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <TextInput
                {...field}
                type="text"
                placeholder="아이디"
                label="아이디"
                autoFocus={true}
                autoComplete="username"
                error={get(errors, 'username.message')}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <TextInput
                {...field}
                type="password"
                placeholder="비밀번호"
                label="비밀번호"
                autoComplete="new-password"
                error={get(errors, 'password.message')}
              />
            )}
          />
          <Controller
            name="passwordCheck"
            control={control}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <TextInput
                {...field}
                type="password"
                placeholder="비밀번호 재입력"
                label="비밀번호 재입력"
                autoComplete="new-password"
                error={get(errors, 'passwordCheck.message')}
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <TextInput
                {...field}
                type="text"
                placeholder="이름"
                label="이름"
                autoComplete="name"
                error={get(errors, 'name.message')}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <TextInput
                {...field}
                type="text"
                placeholder="전화번호"
                label="전화번호"
                autoComplete="tel"
                error={get(errors, 'phoneNumber.message')}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <TextInput
                {...field}
                type="email"
                placeholder="서울시립대학교 웹메일"
                label="서울시립대학교 웹메일"
                autoComplete="email"
                error={get(errors, 'email.message')}
              />
            )}
          />
          <Col gap={4}>
            <Controller
              name="checkPrivacy"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field, formState: { errors } }) => (
                <CheckInput
                  {...field}
                  label="개인정보처리방침에 동의합니다."
                  error={get(errors, 'checkPrivacy.message')}
                />
              )}
            />
            <Controller
              name="checkTos"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field, formState: { errors } }) => (
                <CheckInput
                  {...field}
                  label="시대생 서비스 이용약관에 동의합니다."
                  error={get(errors, 'checkTos.message')}
                />
              )}
            />
          </Col>
        </Col>

        <ActionButton
          type="submit"
          color={formState.isValid ? 'primary' : 'secondary'}
          disabled={!formState.isValid}
          design="solid"
        >
          회원가입
        </ActionButton>
      </Col>
    </form>
  );
};

export default RegisterPage;
