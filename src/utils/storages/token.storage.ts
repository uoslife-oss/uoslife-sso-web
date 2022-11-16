import { TypedStorage } from '@toss/storage/typed';

const accessToken = new TypedStorage<string>('access_token');
const refreshToken = new TypedStorage<string>('refresh_token');

export default { accessToken, refreshToken };
