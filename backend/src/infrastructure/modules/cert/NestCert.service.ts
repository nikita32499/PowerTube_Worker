import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { TCertRepo } from 'core/repositories/cert/CertRepo.types'
import { CertService } from 'core/service/CertService'
import { Config } from 'infrastructure/libs/config'
import { DI_TOKENS } from 'infrastructure/libs/constants'



@Injectable()
export class NestCertService extends CertService implements OnApplicationBootstrap {


	constructor(@Inject(DI_TOKENS.CertRepo) certRepo: TCertRepo) {
		super(certRepo)
	}

	async onApplicationBootstrap() {
		// Здесь вызывайте нужный метод
		await this.initCert(Config.HOST)
	}
}