
export type TCertService = {




	initCert: (host: string) => Promise<boolean>

}




export type TCertFileRepo = {


	//проверка на наличие файла сертификата
	certFileExist: () => Promise<boolean>

	//создание файла сертификата
	createCertFile: (host: string) => Promise<boolean>

	//удаление файла сертификата
	deleteCertFile: () => boolean

}



