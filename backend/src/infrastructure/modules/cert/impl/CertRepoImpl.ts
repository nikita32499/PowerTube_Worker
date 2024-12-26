import { TCertRepo } from 'core/repositories/cert/CertRepo.types'
import { CERT_FILE_PATH } from 'infrastructure/libs/constants'

import { Injectable } from '@nestjs/common'
import { exec } from 'child_process'
import fs from 'fs'


@Injectable()
export class CertRepoImpl implements TCertRepo {


	async certFileExist(): Promise<boolean> {
		return await fs.existsSync(CERT_FILE_PATH)
	}

	createCertFile = async (host: string) => {
		try {
			const execResult = await exec(`certbot certonly --standalone -d ${host} -n`)
			console.log(execResult.stderr)

			const privKeyPath = `/etc/letsencrypt/live/${host}/privkey.pem`
			const fullchainPath = `/etc/letsencrypt/live/${host}/fullchain.pem`

			// Check if files exist before reading
			if (!fs.existsSync(privKeyPath) || !fs.existsSync(fullchainPath)) {
				throw new Error('Certificate files not found')
			}

			const privKey = fs.readFileSync(privKeyPath, 'utf8')
			const fullchain = fs.readFileSync(fullchainPath, 'utf8')
			const combined = privKey + fullchain

			fs.writeFileSync(CERT_FILE_PATH, combined, 'utf8')
			console.log(`Certificate successfully created and combined at ${CERT_FILE_PATH}`)
			return true
		} catch (error) {
			console.error('Error creating certificate:', error)
			throw error
		}
	}

	deleteCertFile(): boolean {
		fs.unlinkSync(CERT_FILE_PATH)
		return true
	}
}