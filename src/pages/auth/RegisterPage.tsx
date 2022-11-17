import { get } from 'radash';
import * as React from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AuthAPI, ErrorResponse } from '@/api';
import ActionButton from '@/components/buttons/ActionButton';
import TextInput from '@/components/forms/TextInput';
import Col from '@/components/utils/Col';

interface IRegisterForm {
  username: string;
  password: string;
  passwordCheck: string;
  name: string;
  email: string;
  phoneNumber: string;
}

const RegisterPage: React.FC = () => {
  const { handleSubmit, control, setError } = useForm<IRegisterForm>();

  const onSubmit: SubmitHandler<IRegisterForm> = async (form) => {
    const { passwordCheck, ...requestForm } = form;

    if (requestForm.password !== passwordCheck) {
      return setError('passwordCheck', {
        message: '비밀번호가 일치하지 않습니다.',
      });
    }

    const { status, data } = await AuthAPI.Register(requestForm);

    if (status !== 201) {
      const error = data as unknown as ErrorResponse;

      if (error.message === 'EMAIL_IN_USE') {
        setError('email', { message: '이미 사용중인 이메일입니다.' });
      }
      if (error.message === 'NOT_A_UOS_MAIL') {
        setError('email', {
          message: '서울시립대학교 웹메일을 이용해주세요.',
        });
      }
      if (error.message === 'USERNAME_IN_USE') {
        setError('username', {
          message: '이미 사용중인 아이디입니다.',
        });
      }
      if (error.message === 'PHONE_NUMBER_IN_USE') {
        setError('phoneNumber', {
          message: '이미 사용중인 전화번호입니다.',
        });
      }

      return toast.error('입력 내용을 확인해주세요.');
    }

    alert(data.id);
  };

  return (
    <Col gap={16}>
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
          </Col>

          <Col gap={8}>
            <ActionButton color="primary" design="solid">
              회원가입
            </ActionButton>
          </Col>
        </Col>
      </form>
    </Col>
  );
};

export default RegisterPage;
