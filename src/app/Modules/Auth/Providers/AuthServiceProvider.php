<?php

namespace App\Modules\Auth\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    public function register()
    {

    }

    public function boot()
    {
        Route::middleware('web')
                ->group(__DIR__ . '/../routes/web.php');

        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'auth');
    }

}
