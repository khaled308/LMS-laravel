<?php

use App\Modules\SchoolClass\Http\Controllers\SchoolClassController;
use Illuminate\Support\Facades\Route;

Route::resource('/admin/classes', SchoolClassController::class)
    ->middleware('role:admin');
