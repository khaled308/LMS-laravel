<?php

namespace App\Modules\User\Http\Traits;

use Illuminate\Http\Request;

trait StudentTrait
{
    public function student_info(Request $request, $user_id)
    {
        $student = [];

        $student['class_id'] = $request->class_id;
        $student['first_name'] = $request->first_name;
        $student['last_name'] = $request->last_name;
        $student['gender'] = $request->gender;
        $student['date_of_birth'] = $request->date_of_birth;
        $student['address'] = $request->address;
        $student['place_of_birth'] = $request->place_of_birth;
        $student['phone_number'] = $request->phone_number;
        $student['blood_group'] = $request->blood_group;
        $student['weight'] = $request->weight;
        $student['height'] = $request->height;
        $student['religion'] = $request->religion;
        $student['nationality'] = $request->nationality;
        $student['user_id'] = $user_id;

        return $student;
    }
}
