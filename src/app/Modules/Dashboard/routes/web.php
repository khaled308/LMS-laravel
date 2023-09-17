<?php

use App\Modules\Dashboard\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])
    ->get('/admin/dashboard', [DashboardController::class, 'adminDashboard'])
    ->name('admin.dashboard');

Route::middleware(['auth', 'role:student'])
    ->get('/student/dashboard/', [DashboardController::class, 'studentDashboard'])
    ->name('student.dashboard');

Route::middleware(['auth', 'role:teacher'])
    ->get('/teacher/dashboard/', [DashboardController::class, 'teacherDashboard'])
    ->name('teacher.dashboard');

Route::middleware(['auth', 'role:parent'])
    ->get('/parent/dashboard/', [DashboardController::class, 'parentDashboard'])
    ->name('parent.dashboard');
