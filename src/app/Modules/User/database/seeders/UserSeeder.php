<?php

namespace App\Modules\User\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->delete();

        DB::table('users')->insert([
            [
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => bcrypt('123456'),
                'role' => 'admin',
            ],
            [
                'name' => 'Student',
                'email' => 'student@example.com',
                'password' => bcrypt('123456'),
                'role' => 'student',
            ],
            [
                'name' => 'Teacher',
                'email' => 'teacher@example.com',
                'password' => bcrypt('123456'),
                'role' => 'teacher',
            ],
            [
                'name' => 'Parent',
                'email' => 'parent@example.com',
                'password' => bcrypt('123456'),
                'role' => 'parent',
            ]
        ]);
    }
}
