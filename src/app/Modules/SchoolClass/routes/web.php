<?php

use App\Modules\SchoolClass\Http\Controllers\ClassSubjectsController;
use App\Modules\SchoolClass\Http\Controllers\SchoolClassController;
use Illuminate\Support\Facades\Route;

Route::resource('/admin/classes', SchoolClassController::class)
    ->middleware('role:admin');

Route::post('/admin/classes/{class}/subjects', [ClassSubjectsController::class, 'attachSubjects'])
    ->name('classes.attach.subjects')
    ->middleware('role:admin');
