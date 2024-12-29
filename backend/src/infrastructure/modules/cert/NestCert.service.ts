import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { TCertFileRepo, TCertService } from 'core/entities/cert/cert.repository'
import { Config } from 'infrastructure/config/config'
import { DI_TOKENS } from 'infrastructure/config/constants'



@Injectable()
export class NestCertService implements OnApplicationBootstrap, TCertService {


	constructor(@Inject(DI_TOKENS.CertRepo) private readonly certRepo: TCertFileRepo) {
	}

	async onApplicationBootstrap() {
		// Здесь вызывайте нужный метод
		await this.initCert(Config.HOST)
	}

	async initCert(host: string) {
		const certFileExist = await this.certRepo.certFileExist()

		if (!certFileExist) {
			await this.certRepo.createCertFile(host)
		}

		return true
	}
}