<?php

namespace App\Modules\User\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:5',
            'class_id' => 'required|exists:school_classes,id',
            'gender' => 'required',
            'date_of_birth' => 'required|date',
            'address' => 'required|string|max:255',
            'place_of_birth' => 'required|string|max:255',
            'phone_number' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'blood_group' => 'required|string|max:255',
            'weight' => 'required|numeric',
            'height' => 'required|numeric',
            'religion' => 'required|string|max:255',
            'nationality' => 'required|string|max:255',
        ];
    }
}
