<?php

use App\Modules\Auth\Http\Controllers\LoginController;

Route::get('/login', [LoginController::class, 'create'])->name('login');

Route::post('/login', [LoginController::class, 'store']);
