<?php

namespace App\Modules\Dashboard\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class DashboardServiceProvider extends ServiceProvider{
    public function register(){

    }

    public function boot(){
        Route::middleware('web')
                ->group(__DIR__ . '/../routes/web.php');
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'dashboard');
    }

}