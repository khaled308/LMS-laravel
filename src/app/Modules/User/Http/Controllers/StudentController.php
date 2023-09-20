<?php

namespace App\Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SchoolClass\Models\SchoolClass;
use App\Modules\User\Http\Requests\CreateStudentRequest;
use App\Modules\User\Http\Requests\UpdateStudentRequest;
use App\Modules\User\Http\Traits\StudentTrait;
use App\Modules\User\Models\Student;
use App\Modules\User\Models\User;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    use StudentTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = User::where('role', 'student')->with('student_info')->get();

        return view('user::student.index', compact('students'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $classes = SchoolClass::all();
        return view('user::student.create', compact('classes'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateStudentRequest $request)
    {
        // create user
        $user = User::create([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'role' => 'student',
            'password' => bcrypt('password'),
        ]);

        // create student
        Student::create($this->student_info($request, $user->id));

        return redirect()->route('students.index')->with('success', 'Student created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $student)
    {
        $classes = SchoolClass::all();
        return view('user::student.edit', compact('student', 'classes'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, User $student)
    {
        $student->update([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
        ]);

        $data = Student::where('user_id', $student->id)->first();
        $data->update($this->student_info($request, $student->id));


        return redirect()->route('students.index')->with('success', 'Student updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $student)
    {
        $student->delete();

        return redirect()->route('students.index')->with('success', 'Student deleted successfully');
    }
}
