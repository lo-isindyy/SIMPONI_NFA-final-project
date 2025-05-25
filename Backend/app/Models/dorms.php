<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class dorms extends Model
{
    protected $table = 'dorms';

    protected $fillable = [
        'name', 'capacity', 'mudaris_id'
    ];
}
