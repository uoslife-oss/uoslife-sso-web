import { get } from 'radash';
import * as React from 'react';
import { useCallback } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { AuthAPI, ErrorResponse } from '@/api';
import ActionButton from '@/components/buttons/ActionButton';
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
  const { handleSubmit, control, setError } = useForm<MigrationForm>({
    resolver: useYupValidationResolver<MigrationForm>(migrationSchema),
  });

  const onSubmit: SubmitHandler<MigrationForm> = useCallback(async (form) => {
    const { status, data } = await AuthAPI.migration(form);
    if (status === 201) {
      toast.success('계정 통합이 완료되었습니다.');
      return navigate('/login');
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
          </Col>

          <ActionButton color="primary" design="solid" type="submit">
            통합계정 전환하기
          </ActionButton>
        </Col>
      </form>
    </Col>
  );
};

export default MigrationPage;
