import { TAuthCredentials } from 'core/repositories/auth/types/auth.entity';
import { EntitySchemaTyped, TypeormLib } from 'infrastructure/libs/typeorm/typeorm.libs';

export const AuthDB = new EntitySchemaTyped<TAuthCredentials>({
    name: 'Auth',
    tableName: 'auth',
    columns: {
        id: {
            type: 'varchar',
            primary: true,
            generated: 'uuid',

            nullable: false,
        },
        userId: {
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        username: {
            type: 'varchar',
            length: 255,
            unique: true,
            nullable: false,
        },
        password: {
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        createdAt: {
            type: 'bigint',
            nullable: false,
            transformer: new TypeormLib.BigIntConverter(),
        },

        avail: {
            type: 'boolean',
            nullable: false,
            default: true,
        },
    },
});
