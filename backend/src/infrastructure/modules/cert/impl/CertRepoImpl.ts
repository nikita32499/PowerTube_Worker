import { TCertRepo } from 'core/repositories/cert/CertRepo'
import { CERT_FILE_PATH } from 'infrastructure/libs/constants'

import fs from 'fs'


export class CertRepoImpl implements TCertRepo {


	async certFileExist(certId: string): Promise<boolean> {
		return fs.existsSync(CERT_FILE_PATH)
	}

	createCertFile(certId: string): Promise<void> {
		return Promise.resolve()
	}

	deleteCertFile(certId: string): Promise<void> {
		return Promise.resolve()
	}
}