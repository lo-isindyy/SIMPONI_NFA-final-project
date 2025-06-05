<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class santri extends Model
{
    protected $table = 'santri';

    protected $fillable = [
        'name',
        // 'gender',
        'tgl_lahir',
        'address',
        'no_hp',
        'pp_santri',
    ];
}
