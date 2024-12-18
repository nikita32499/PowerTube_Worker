import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from 'infrastructure/libs/config';
import { AuthDB } from 'infrastructure/modules/auth/db/auth.db';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: Config.POSTGRES_HOST,
            port: Config.POSTGRES_PORT,
            username: Config.POSTGRES_USER,
            password: Config.POSTGRES_PASSWORD,
            database: Config.POSTGRES_DATABASE,
            entities: [AuthDB],
            autoLoadEntities: true,
            synchronize: false,
            migrationsRun: Config.NODE_MODE === 'dev',
        }),
    ],
    providers: [],
})
export class AppModule {}
