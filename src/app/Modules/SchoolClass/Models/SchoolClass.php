<?php

namespace App\Modules\SchoolClass\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'status',
        'created_by',
        'updated_by'
    ];

    protected $table = 'school_classes';
}
