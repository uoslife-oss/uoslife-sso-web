import { get } from 'radash';
import * as React from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { AuthAPI, ErrorResponse } from '@/api';
import ActionButton from '@/components/buttons/ActionButton';
import CheckInput from '@/components/forms/CheckInput';
import TextInput from '@/components/forms/TextInput';
import Col from '@/components/utils/Col';
import { getErrorInfo } from '@/utils/errorConfigs';

type RegisterForm = {
  username: string;
  password: string;
  passwordCheck: string;
  name: string;
  email: string;
  phoneNumber: string;
  checkPrivacy: string;
  checkTos: string;
};

const RegisterPage: React.FC = () => {
  const { handleSubmit, control, setError, formState } =
    useForm<RegisterForm>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterForm> = async (form) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, checkPrivacy, checkTos, ...requestForm } = form;

    if (requestForm.password !== passwordCheck) {
      const { field, message } =
        getErrorInfo<RegisterForm>('PASSWORD_NOT_MATCH');
      return setError(field, { message });
    }

    const { status, data } = await AuthAPI.Register(requestForm);
    if (status === 201) return navigate('/login');

    const error = data as unknown as ErrorResponse;
    const { field, message } = getErrorInfo<RegisterForm>(error.message);

    toast.error('입력 내용을 확인해주세요.');
    return setError(field, { message });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Col gap={32}>
        <Col gap={16}>
          <Controller
            name="username"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <TextInput
                {...field}
                type="text"
                placeholder="아이디"
                label="아이디"
                autoComplete="off"
                autoFocus={true}
                error={get(errors, 'username.message')}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <TextInput
                {...field}
                type="password"
                placeholder="비밀번호"
                autoComplete="off"
                label="비밀번호"
                error={get(errors, 'password.message')}
              />
            )}
          />
          <Controller
            name="passwordCheck"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <TextInput
                {...field}
                type="password"
                placeholder="비밀번호 재입력"
                autoComplete="off"
                label="비밀번호 재입력"
                error={get(errors, 'passwordCheck.message')}
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <TextInput
                {...field}
                type="text"
                placeholder="이름"
                autoComplete="off"
                label="이름"
                error={get(errors, 'name.message')}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <TextInput
                {...field}
                type="text"
                placeholder="전화번호"
                autoComplete="off"
                label="전화번호"
                error={get(errors, 'phoneNumber.message')}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <TextInput
                {...field}
                type="email"
                placeholder="서울시립대학교 웹메일"
                autoComplete="off"
                label="서울시립대학교 웹메일"
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
