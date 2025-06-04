<?php

namespace Database\Seeders;

use App\Models\classrooms;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassroomsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        classrooms::create([
            'name' => 'Kelas A',
            'location' => 'Gedung 1 Lantai 1',
        ]);

        classrooms::create([
            'name' => 'Kelas B',
            'location' => 'Gedung 1 Lantai 2',
        ]);

        classrooms::create([
            'name' => 'Kelas C',
            'location' => 'Gedung 2 Lantai 1',
        ]);

        classrooms::create([
            'name' => 'Kelas D',
            'location' => 'Gedung 2 Lantai 2',
        ]);

        classrooms::create([
            'name' => 'Kelas E',
            'location' => 'Gedung 3 Lantai 1',
        ]);
    }
}
