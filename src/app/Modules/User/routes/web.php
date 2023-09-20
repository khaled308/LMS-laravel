<?php

use App\Modules\User\Http\Controllers\AdminController;
use App\Modules\User\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::resource('/admin/admins', AdminController::class)
        ->middleware('role:admin');

Route::resource('/admin/students', StudentController::class)
        ->middleware('role:admin');
