<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class dorm_assignments extends Model
{
    protected $table = 'dorm_assignments';

    protected $fillable = [
        'santri_id',
        'dorm_id',
        'entry_date',
        'exit_date'
    ];
}
