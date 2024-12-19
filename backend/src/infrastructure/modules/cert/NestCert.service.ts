import { Inject, Injectable } from '@nestjs/common'
import { TCertRepo } from 'core/repositories/cert/CertRepo'
import { CertService } from 'core/service/CertService'
import { DI_TOKENS } from 'infrastructure/libs/constants'



@Injectable()
export class NestCertService extends CertService {


	constructor(@Inject(DI_TOKENS.CertRepo) certRepo: TCertRepo) {
		super(certRepo)
	}
}