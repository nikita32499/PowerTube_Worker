#!/bin/bash

echo "Что вы хотите сделать?"
echo "1 - Запуск в режиме разработки"
echo "2 - Клонировать и подготовить проект для разработки"
echo "3 - Сборка в продакт"
echo "4 - Запушить образы в докер регистр"
echo "5 - Деплой проекта"

read -p "Введите соответствующую цифру: " choice

if [ "$choice" -eq 1 ]; then

	docker compose up --build --watch

elif [ "$choice" -eq 2 ]; then
	# Здесь добавьте команды для установки и подготовки проекта

	git clone https://github.com/nikita32499/PowerTube.git

	cd PowerTube

	echo "Установка и подготовка проекта..."
	for dir in backend; do
		echo "Установка зависимостей $dir"
		cd $dir
		npm ci
		cd ..
	done

	echo "Для запуска в режиме разработки выполните $(docker compose up --build --watch) или ./script.sh 1"

elif [ "$choice" -eq 3 ]; then

	docker compose -f docker-compose.prod.yaml build

elif [ "$choice" -eq 4 ]; then
	docker push nikita32499/powertube-master-nginx:latest
	docker push nikita32499/powertube-master-nestjs:latest
	docker push nikita32499/powertube-master-nextjs:latest

elif [ "$choice" -eq 5 ]; then

	if [ "$(id -u)" -ne 0 ]; then

		echo "Требуются права администратора"

		exit 1

	fi

	check_command() {
		if command -v $1 &>/dev/null; then
			return 0 # true в bash
		else
			return 1 # false в bash
		fi
	}

	if ! check_command "openssl"; then
		apt-get install -y openssl
	fi

	if ! check_command "curl"; then
		apt-get install -y curl
	fi

	if ! check_command "docker"; then
		curl -fsSL https://get.docker.com -o get-docker.sh
		chmod +x get-docker.sh
		sh get-docker.sh
	fi

	# Проверяем существование .env.prod
	if [ -f .env.prod ]; then
		echo "Файл .env.prod уже существует. Оставляем его как есть."
	else
		# Генерируем случайные строки для ключей
		JWT_SECRET_KEY=$(openssl rand -base64 48)
		ACCESS_TOKEN=$(openssl rand -base64 48)
		POSTGRES_PASSWORD=$(openssl rand -base64 32)

		# Создаем .env.prod на основе .env.dev с заменой значений
		cat >.env.prod <<EOF
# не указан в script
EOF
	fi

	# curl -o docker-compose.production.yaml https://raw.githubusercontent.com/nikita32499/Smilebaby/master/docker-compose.prod.yaml

	# docker compose -f docker-compose.production.yaml up --pull always -d

else
	echo "Неверный выбор. Пожалуйста, выберите 1, 2, 3, 4 или 5"
fi
