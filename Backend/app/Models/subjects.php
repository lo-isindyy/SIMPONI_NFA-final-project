<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class subjects extends Model
{
    protected $table = 'subjects';

    protected $fillable = [
        'name',
        'day',
        'year',
        'jenjang',
        'classroom_id',
        'mudaris_id',
    ];

    public function classroom()
    {
        return $this->belongsTo(classrooms::class);
    }

    public function mudaris()
    {
        return $this->belongsTo(mudaris::class);
    }
}
