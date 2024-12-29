import { Module } from '@nestjs/common'
import { DI_TOKENS } from 'infrastructure/config/constants'
import { NestCertService } from './NestCert.service'
import { CertRepoImpl } from './impl/CertRepoImpl'



@Module({
	providers: [
		NestCertService,
		{ provide: DI_TOKENS.CertRepo, useClass: CertRepoImpl },

	]
})
export class CertModule { }