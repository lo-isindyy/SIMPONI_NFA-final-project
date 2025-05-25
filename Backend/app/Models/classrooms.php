<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class classrooms extends Model
{
    protected $table = 'classrooms';

    protected $fillable = ['name','location'];
}
