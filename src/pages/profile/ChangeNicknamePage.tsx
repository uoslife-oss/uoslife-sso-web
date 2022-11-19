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
  ChangeNicknameForm,
  changeNicknameSchema,
} from '@/utils/schemas/change-nickname.schema';

const ChangeNicknamePage: React.FC = () => {
  const { profile, setProfile } = useAuthorizationContext();

  const { handleSubmit, control, setError, formState } =
    useForm<ChangeNicknameForm>({
      resolver:
        useYupValidationResolver<ChangeNicknameForm>(changeNicknameSchema),
    });

  const onSubmit: SubmitHandler<ChangeNicknameForm> = useCallback(
    async (form) => {
      if (!profile) return;

      if (profile.nickname === form.nickname) {
        return setError('nickname', {
          message: '동일한 닉네임으로 변경할 수 없습니다.',
        });
      }

      const { status, data } = await UserAPI.editProfile(profile.id, {
        nickname: form.nickname,
      });

      if (status === 200) {
        setProfile(data);
        return toast.success('닉네임이 변경되었습니다.');
      }

      const error = data as unknown as ErrorResponse;
      const { field, message } = getErrorInfo<ChangeNicknameForm>(
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
            <Emoji size={20}> 🆕</Emoji>
            <h5>닉네임 변경</h5>
          </Row>
          <p>시대생 서비스에서 사용할 닉네임을 변경할 수 있습니다.</p>
        </Col>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Col gap={32}>
            <Col gap={16}>
              {profile && (
                <TextInput
                  type="text"
                  placeholder="기존 닉네임"
                  label="기존 닉네임"
                  value={profile.nickname}
                  disabled={true}
                />
              )}
              <Controller
                name="nickname"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field, formState: { errors } }) => (
                  <TextInput
                    {...field}
                    type="text"
                    placeholder="변경할 닉네임"
                    label="변경할 닉네임"
                    autoComplete="off"
                    autoFocus={true}
                    error={
                      get(errors, 'nickname.message') ||
                      get(errors, 'server.message')
                    }
                  />
                )}
              />
            </Col>
            <ActionButton
              onClick={handleSubmit(onSubmit)}
              color={formState.isValid ? 'primary' : 'secondary'}
              disabled={!formState.isValid}
            >
              닉네임 변경하기
            </ActionButton>
          </Col>
        </form>
      </Col>
    </BaseCard>
  );
};

export default ChangeNicknamePage;
