import { TAuthCredentials } from './types/auth.entity';

export type TAuthRepository = {
    createAuth: (userId: string) => Promise<TAuthCredentials>;
};
