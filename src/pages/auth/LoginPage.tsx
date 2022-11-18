import { get } from 'radash';
import * as React from 'react';
import { useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import ActionButton from '@/components/buttons/ActionButton';
import LinkedButton from '@/components/buttons/LinkedButton';
import TextInput from '@/components/forms/TextInput';
import Col from '@/components/utils/Col';
import Row from '@/components/utils/Row';
import { useAuthenticationContext, useYupValidationResolver } from '@/hooks';
import { LoginForm, loginSchema } from '@/utils/schemas/login.schema';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, setError } = useForm<LoginForm>({
    resolver: useYupValidationResolver<LoginForm>(loginSchema),
  });

  const { login, isAuthenticating, isAuthenticated } =
    useAuthenticationContext();

  const onSubmit: SubmitHandler<LoginForm> = async (form) => {
    const isAuthenticated = await login(form);

    if (!isAuthenticated)
      return setError('username', {
        message: '아이디 또는 비밀번호를 확인하세요.',
      });

    return navigate('/');
  };

  useEffect(() => {
    if (isAuthenticating) return;
    if (isAuthenticated) {
      toast.error('이미 로그인 되어있습니다.');
      return navigate('/');
    }
  }, [isAuthenticating, navigate]);

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
            <ActionButton color="primary" design="solid" type="submit">
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
