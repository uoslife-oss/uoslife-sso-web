import { get } from 'radash';
import * as React from 'react';
import { useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { ErrorResponse, UserAPI } from '@/api';
import ActionButton from '@/components/buttons/ActionButton';
import BaseCard from '@/components/cards/BaseCard';
import Emoji from '@/components/common/Emoji';
import TextInput from '@/components/forms/TextInput';
import Col from '@/components/utils/Col';
import Row from '@/components/utils/Row';
import { useAuthorizationContext, useYupValidationResolver } from '@/hooks';
import { getErrorInfo } from '@/utils/configs/error.config';
import {
  ChangePasswordForm,
  changePasswordSchema,
} from '@/utils/schemas/change-password.schema';

const ChangePasswordPage: React.FC = () => {
  const { profile } = useAuthorizationContext();

  const { handleSubmit, control, setError, formState } =
    useForm<ChangePasswordForm>({
      resolver:
        useYupValidationResolver<ChangePasswordForm>(changePasswordSchema),
    });

  const onSubmit: SubmitHandler<ChangePasswordForm> = useCallback(
    async (form) => {
      if (!profile) return;

      if (form.password !== form.passwordCheck) {
        return setError('passwordCheck', {
          message: '비밀번호 확인이 일치하지 않습니다.',
        });
      }

      const { status, data } = await UserAPI.editProfile(profile.id, {
        password: form.password,
      });

      if (status === 200) return toast.success('비밀번호가 변경되었습니다.');

      const error = data as unknown as ErrorResponse;
      const { field, message } = getErrorInfo<ChangePasswordForm>(
        error.message,
      );

      toast.error('입력 내용을 확인해주세요.');
      return setError(field, { message });
    },
    [profile],
  );

  return (
    <BaseCard>
      <Col gap={32}>
        <Col gap={4}>
          <Row gap={4} align="center">
            <Emoji size={20}>🔐</Emoji>
            <h5>비밀번호 재설정</h5>
          </Row>
          <p>시대생 통합계정 비밀번호를 재설정할 수 있습니다.</p>
        </Col>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Col gap={32}>
            <Col gap={16}>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field, formState: { errors } }) => (
                  <TextInput
                    {...field}
                    type="password"
                    placeholder="변경할 비밀번호"
                    label="변경할 비밀번호"
                    autoComplete="new-password"
                    autoFocus={true}
                    error={
                      get(errors, 'password.message') ||
                      get(errors, 'server.message')
                    }
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
                    placeholder="변경할 비밀번호 확인"
                    label="변경할 비밀번호 확인"
                    autoComplete="new-password"
                    error={get(errors, 'passwordCheck.message')}
                  />
                )}
              />
            </Col>
            <ActionButton
              onClick={handleSubmit(onSubmit)}
              color={formState.isValid ? 'primary' : 'secondary'}
              disabled={!formState.isValid}
            >
              비밀번호 재설정하기
            </ActionButton>
          </Col>
        </form>
      </Col>
    </BaseCard>
  );
};

export default ChangePasswordPage;
