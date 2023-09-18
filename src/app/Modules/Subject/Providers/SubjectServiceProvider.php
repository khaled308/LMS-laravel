<?php

namespace App\Modules\Subject\Providers;

use App\Modules\Subject\Models\Subject;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class SubjectServiceProvider extends ServiceProvider
{
    public function register()
    {

    }

    public function boot()
    {
        Route::middleware('web')
                ->group(__DIR__ . '/../routes/web.php');
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'subject');
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');

        Subject::creating(function ($subject) {
            $subject->created_by = auth()->user()->id;
            $subject->updated_by = auth()->user()->id;
        });

        Subject::updating(function ($subject) {
            $subject->updated_by = auth()->user()->id;
        });
    }

}
