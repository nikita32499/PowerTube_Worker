import { TAuthCredentials } from './auth.entity';

export type TAuthCreate = {
    Request: Pick<TAuthCredentials, 'userId'>;
    Entity: Omit<TAuthCredentials, 'id' | 'createdAt' | 'avail'>;
    Response: TAuthCredentials;
};

export type TAuthGet = {
    Request: Pick<TAuthCredentials, 'userId'>;
    Response: TAuthCredentials;
};
