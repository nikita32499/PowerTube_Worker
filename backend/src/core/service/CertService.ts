import { TCertRepo } from 'core/repositories/cert/CertRepo.types'
import { TCertService } from 'core/repositories/cert/CertService.types'




export class CertService implements TCertService {


	constructor(private readonly certRepo: TCertRepo) { }


	async initCert(host: string) {
		const certFileExist = await this.certRepo.certFileExist()

		if (!certFileExist) {
			await this.certRepo.createCertFile(host)
		}

		return true
	}
}