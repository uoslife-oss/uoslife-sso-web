type ErrorConfig = { field: string; message: string };
type ErrorResult<T> = { field: keyof T; message: string };

const errorConfig: Record<string, ErrorConfig> = {
  PASSWORD_NOT_MATCH: {
    field: 'passwordCheck',
    message: '비밀번호가 일치하지 않습니다.',
  },
  EMAIL_IN_USE: {
    field: 'email',
    message: '이미 사용중인 이메일입니다.',
  },
  NOT_A_UOS_MAIL: {
    field: 'email',
    message: '서울시립대학교 웹메일을 이용해주세요.',
  },
  USERNAME_IN_USE: {
    field: 'username',
    message: '이미 사용중인 아이디입니다.',
  },
  PHONE_NUMBER_IN_USE: {
    field: 'phoneNumber',
    message: '이미 사용중인 전화번호입니다.',
  },
};

export const getErrorInfo = <T>(message: string): ErrorResult<T> => {
  const error = errorConfig[message as string];
  return { field: error.field as keyof T, message: error.message };
};
