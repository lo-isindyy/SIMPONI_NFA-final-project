<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    protected $table = 'classrooms';

    protected $fillable = ['name', 'location'];

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }
}
