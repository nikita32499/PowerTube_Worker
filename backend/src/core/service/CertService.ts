import { TCertRepo } from 'core/repositories/cert/CertRepo'
import { TCertService } from 'core/repositories/cert/CertService.types'




export class CertService implements TCertService {


	constructor( certRepo: TCertRepo) {}


	async createCert(host:string){
		const certFileExist = await this.certRepo.certFileExist()

		if(!certFileExist){
			await this.certRepo.createCertFile(host)
		}

		return true
	}
}