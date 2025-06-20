<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Santri;
use App\Models\Subject;

class Grade extends Model
{
    protected $table = 'grades';

    protected $fillable = [
        'santri_id',
        'subject_id',
        'grade',
    ];

    public function santri()
    {
        return $this->belongsTo(Santri::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
