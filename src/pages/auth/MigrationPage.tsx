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
import { useYupValidationResolver } from '@/hooks';
import { getErrorInfo } from '@/utils/configs/error.config';
import {
  MigrationForm,
  migrationSchema,
} from '@/utils/schemas/migration.schema';

const MigrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, setError, formState } = useForm<MigrationForm>(
    {
      resolver: useYupValidationResolver<MigrationForm>(migrationSchema),
    },
  );

  const onSubmit: SubmitHandler<MigrationForm> = useCallback(async (form) => {
    const { status, data } = await AuthAPI.migration({
      username: form.username,
      password: form.password,
      email: form.email,
    });

    if (status === 201) {
      toast.success('계정 통합이 완료되었습니다.');
      return navigate('/login');
    }

    if (status === 409) {
      return toast.error('이미 통합이 완료된 계정입니다.');
    }

    if (status === 400) {
      return setError('username', {
        message: '아이디 또는 비밀번호를 확인하세요.',
      });
    }

    const error = data as unknown as ErrorResponse;
    const { field, message } = getErrorInfo<MigrationForm>(error.message);

    toast.error('입력 내용을 확인해주세요.');
    return setError(field, { message });
  }, []);

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
                  placeholder="시대생 아이디"
                  label="시대생 아이디"
                  autoComplete="username"
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
                  placeholder="시대생 비밀번호"
                  autoComplete="new-password"
                  label="시대생 비밀번호"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <TextInput
                  {...field}
                  type="email"
                  placeholder="서울시립대학교 웹메일"
                  autoComplete="email"
                  label="서울시립대학교 웹메일"
                />
              )}
            />

            <Col gap={4}>
              <Controller
                name="checkMigration"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field, formState: { errors } }) => (
                  <CheckInput
                    {...field}
                    label="계정통합 약관에 동의합니다."
                    error={get(errors, 'checkPrivacy.message')}
                  />
                )}
              />
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
            design="solid"
            type="submit"
          >
            통합계정 전환하기
          </ActionButton>
        </Col>
      </form>
    </Col>
  );
};

export default MigrationPage;
