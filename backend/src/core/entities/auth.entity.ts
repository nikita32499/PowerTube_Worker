import { TAuthCredentials } from 'core/repositories/auth/types/auth.entity';

export class AuthEntity implements TAuthCredentials {
    id: string;
    userId: string;
    username: string;
    password: string;
    createdAt: number;
    avail: boolean;

    constructor(data: TAuthCredentials) {
        this.id = data.id;
        this.userId = data.userId;
        this.username = data.username;
        this.password = data.password;
        this.createdAt = data.createdAt;
        this.avail = data.avail;
    }
}
