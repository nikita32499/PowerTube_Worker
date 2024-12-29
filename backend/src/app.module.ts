import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Config } from 'infrastructure/config/config'
import { CertModule } from 'infrastructure/modules/cert/cert.module'
import { ProxyDB } from 'infrastructure/modules/proxy/db/proxy.db'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: Config.POSTGRES_HOST,
            port: Config.POSTGRES_PORT,
            username: Config.POSTGRES_USER,
            password: Config.POSTGRES_PASSWORD,
            database: Config.POSTGRES_DATABASE,
            entities: [ProxyDB],
            autoLoadEntities: true,
            synchronize: true,
            migrationsRun: Config.NODE_MODE === 'dev',
        }),
        CertModule
    ],
    providers: [],
})
export class AppModule { }
