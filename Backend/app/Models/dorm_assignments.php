<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Expr\FuncCall;

class dorm_assignments extends Model
{
    protected $table = 'dorm_assignments';

    protected $fillable = [
        'santri_id',
        'dorm_id',
        'entry_date',
        'exit_date'
    ];

    public function santri()
    {
        return $this->belongsTo(santri::class);
    }

    public function dorm()
    {
        return $this->belongsTo(dorms::class);
    }
}
