<?php

namespace Database\Seeders;

use App\Models\dorms;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DormsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        dorms::create([
            'name' => 'Asrama Putra 1',
            'capacity' => 3,
            'mudaris_id' => 1,
        ]);
        dorms::create([
            'name' => 'Asrama Putra 2',
            'capacity' => 15,
            'mudaris_id' => 2,
        ]);
        dorms::create([
            'name' => 'Asrama Putra 3',
            'capacity' => 25,
            'mudaris_id' => 3,
        ]);
    }
}
