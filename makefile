COMPOSER = docker-compose run --rm

start:
	docker-compose up -d

stop:
	docker-compose down

artisan:
	$(COMPOSER) artisan $(filter-out $@,$(MAKECMDGOALS))

composer:
	$(COMPOSER) composer $(filter-out $@,$(MAKECMDGOALS))

npm:
	$(COMPOSER) npm $(filter-out $@,$(MAKECMDGOALS))

migrate:
	$(COMPOSER) artisan migrate

seed:
	$(COMPOSER) artisan db:seed --class="App\Modules\User\database\seeders\UserSeeder"
