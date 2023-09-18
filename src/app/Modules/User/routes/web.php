<?php

use App\Modules\User\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

Route::resource('/admin/admins', AdminController::class)
        ->middleware('role:admin');
