<?php

namespace App\Modules\Dashboard\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function adminDashboard()
    {
        return view('dashboard::admin');
    }

    public function studentDashboard()
    {
        return view('dashboard::student');
    }

    public function teacherDashboard()
    {
        return view('dashboard::teacher');
    }

    public function parentDashboard()
    {
        return view('dashboard::parent');
    }
}
