<?php

use App\Modules\Subject\Http\Controllers\SubjectController;
use Illuminate\Support\Facades\Route;

Route::resource('/admin/subjects', SubjectController::class)
    ->middleware('role:admin');
