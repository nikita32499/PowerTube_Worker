



export type TCertRepo ={


	//проверка на наличие файла сертификата
     certFileExist: () => Promise<boolean>;

	//создание файла сертификата
	 createCertFile: (host:string) => Promise<void>;

	//удаление файла сертификата
	 deleteCertFile: () => Promise<void>;

}



