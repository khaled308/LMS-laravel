<?php

namespace App\Modules\SchoolClass\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SchoolClass\Models\SchoolClass;
use Illuminate\Http\Request;

class ClassSubjectsController extends Controller
{
    public function attachSubjects(Request $request, SchoolClass $class)
    {
        $class->subjects()->sync($request->subjects);

        return redirect()->route('classes.index')->with('success', 'Subjects attached successfully');
    }
}
