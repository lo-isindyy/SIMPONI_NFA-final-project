<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class mudaris extends Model
{
    protected $table = 'mudaris';

    protected $fillable = [
        'name',
        // 'gender',
        'address',
        'no_hp',
        'pp_mudaris',
    ];
    
}
