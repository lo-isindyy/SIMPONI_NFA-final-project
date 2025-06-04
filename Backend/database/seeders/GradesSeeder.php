<?php

namespace Database\Seeders;

use App\Models\grades;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GradesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        grades::create([
            'santri_id' => 1,
            'subject_id' => 1,
            'grade' => 85,
        ]);

        grades::create([
            'santri_id' => 2,
            'subject_id' => 2,
            'grade' => 90,
        ]);

        grades::create([
            'santri_id' => 3,
            'subject_id' => 3,
            'grade' => 88,
        ]);
    }
}
