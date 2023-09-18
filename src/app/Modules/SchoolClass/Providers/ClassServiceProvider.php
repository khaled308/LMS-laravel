<?php

namespace App\Modules\SchoolClass\Providers;

use App\Modules\SchoolClass\Models\SchoolClass;
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

        SchoolClass::creating(function ($class) {
            $class->created_by = auth()->user()->id;
            $class->updated_by = auth()->user()->id;
        });

        SchoolClass::updating(function ($class) {
            $class->updated_by = auth()->user()->id;
        });
    }

}
