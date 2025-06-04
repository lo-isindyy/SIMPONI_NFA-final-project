<?php

namespace Database\Seeders;

use App\Models\subjects;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        subjects::create([
            'name' => 'Tauhid',
            'day' => 'Senin',
            'year' => 2025,
            'jenjang' => 'Aliyah',
            'classroom_id' => 1,
            'mudaris_id' => 1,
        ]);

        subjects::create([
            'name' => 'Fiqih',
            'day' => 'Selasa',
            'year' => 2025,
            'jenjang' => 'Aliyah',
            'classroom_id' => 2,
            'mudaris_id' => 2,
        ]);

        subjects::create([
            'name' => 'Nahwu',
            'day' => 'Rabu',
            'year' => 2025,
            'jenjang' => 'Tsanawiyah',
            'classroom_id' => 3,
            'mudaris_id' => 3,
        ]);
    }
}
