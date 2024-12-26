import { TProxyCredentials } from 'core/repositories/proxy/types/proxy.entity'
import { EntitySchemaTyped, TypeormLib } from 'infrastructure/libs/typeorm/typeorm.libs'



export const ProxyDB = new EntitySchemaTyped<TProxyCredentials>({
    name: 'Proxy',
    tableName: 'proxy',
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
})
