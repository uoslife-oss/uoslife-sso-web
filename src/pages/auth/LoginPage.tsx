import { get } from 'radash';
import * as React from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

import { AuthAPI } from '@/api';
import ActionButton from '@/components/buttons/ActionButton';
import LinkedButton from '@/components/buttons/LinkedButton';
import TextInput from '@/components/forms/TextInput';
import Col from '@/components/utils/Col';
import Row from '@/components/utils/Row';

interface ILoginForm {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { handleSubmit, control, setError } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (form) => {
    const { status, data } = await AuthAPI.Login(form);

    if (status !== 201)
      return setError('username', {
        message: '아이디 또는 비밀번호를 확인하세요.',
      });

    alert(data.userId);
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
              render={({ field }) => (
                <TextInput
                  {...field}
                  type="password"
                  placeholder="비밀번호"
                  autoComplete="off"
                  label="비밀번호"
                />
              )}
            />
          </Col>

          <Col gap={8}>
            <ActionButton color="primary" design="solid">
              로그인
            </ActionButton>
            <Row gap={8}>
              <LinkedButton
                to="/register"
                color="secondary"
                design="text"
                size="sm"
              >
                회원가입
              </LinkedButton>
              <LinkedButton
                to="/recovery"
                color="secondary"
                design="text"
                size="sm"
              >
                계정 찾기
              </LinkedButton>
            </Row>
          </Col>
        </Col>
      </form>
    </Col>
  );
};

export default LoginPage;