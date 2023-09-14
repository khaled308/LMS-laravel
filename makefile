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
	# $(COMPOSER) artisan db:seed --class="App\Modules\User\database\seeders\UserSeeder"
	# $(COMPOSER) artisan db:seed --class="App\Modules\Category\database\seeders\CategorySeeder"
	# $(COMPOSER) artisan db:seed --class="App\Modules\Product\database\seeders\ProductSeeder"
	$(COMPOSER) artisan db:seed --class="App\Modules\Slider\database\seeders\SliderSeeder"
