<?php

namespace App\Modules\SchoolClass\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class ClassServiceProvider extends ServiceProvider
{
    public function register()
    {

    }

    public function boot()
    {
        Route::middleware('web')
                ->group(__DIR__ . '/../routes/web.php');
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'class');
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');
    }

}
