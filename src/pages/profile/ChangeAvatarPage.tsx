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
  ChangeAvatarForm,
  changeAvatarSchema,
} from '@/utils/schemas/change-avatar.schema';

const ChangeAvatarPage: React.FC = () => {
  const { profile, setProfile } = useAuthorizationContext();

  const { handleSubmit, control, setError, formState } =
    useForm<ChangeAvatarForm>({
      resolver: useYupValidationResolver<ChangeAvatarForm>(changeAvatarSchema),
    });

  const onSubmit: SubmitHandler<ChangeAvatarForm> = useCallback(
    async (form) => {
      if (!profile) return;

      const { status, data } = await UserAPI.editProfile(profile.id, {
        profileImage: form.profileImage,
      });

      if (status === 200) {
        setProfile(data);
        return toast.success('프로필 사진이 변경되었습니다.');
      }

      const error = data as unknown as ErrorResponse;
      const { field, message } = getErrorInfo<ChangeAvatarForm>(error.message);

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
            <Emoji size={20}> 📸</Emoji>
            <h5>프로필 사진 변경</h5>
          </Row>
          <p>시대생 서비스에서 사용할 프로필 사진을 변경할 수 있습니다.</p>
        </Col>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Col gap={32}>
            <Controller
              name="profileImage"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field, formState: { errors } }) => (
                <TextInput
                  {...field}
                  type="file"
                  placeholder="변경할 프로필 사진"
                  label="변경할 프로필 사진"
                  autoComplete="off"
                  autoFocus={true}
                  error={
                    get(errors, 'profileImage.message') ||
                    get(errors, 'server.message')
                  }
                />
              )}
            />
            <ActionButton
              onClick={handleSubmit(onSubmit)}
              color={formState.isValid ? 'primary' : 'secondary'}
              disabled={!formState.isValid}
            >
              프로필 사진 변경하기
            </ActionButton>
          </Col>
        </form>
      </Col>
    </BaseCard>
  );
};

export default ChangeAvatarPage;
