import { get } from 'radash';
import * as React from 'react';
import { useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ActionButton from '@/components/buttons/ActionButton';
import TextInput from '@/components/forms/TextInput';
import Col from '@/components/utils/Col';
import { useYupValidationResolver } from '@/hooks';
import { RecoveryForm, recoverySchema } from '@/utils/schemas/recovery.schema';

const RecoveryPage: React.FC = () => {
  const navigate = useNavigate();

  const { handleSubmit, control, formState } = useForm<RecoveryForm>({
    resolver: useYupValidationResolver<RecoveryForm>(recoverySchema),
  });

  const onSubmit: SubmitHandler<RecoveryForm> = useCallback(async (form) => {
    // TODO: Handle Recovery Email Action
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Col gap={16}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          defaultValue=""
          render={({ field, formState: { errors } }) => (
            <TextInput
              {...field}
              type="email"
              placeholder="이메일"
              label="이메일"
              autoComplete="email"
              autoFocus={true}
              error={get(errors, 'email.message')}
            />
          )}
        />

        <ActionButton
          type="submit"
          size="md"
          color={formState.isValid ? 'primary' : 'secondary'}
          disabled={!formState.isValid}
        >
          인증메일 전송
        </ActionButton>
      </Col>
    </form>
  );
};

export default RecoveryPage;
