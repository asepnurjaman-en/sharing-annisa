<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MeetingActor extends Model
{
    use HasFactory, SoftDeletes;

    protected $date = ['deleted_at'];
    protected $guarded = ['id'];
    protected static function booted()
    {
        static::creating(function ($request) {
            $request->user_id = Auth::user()->id;
        });
    }

    public function meeting() : BelongsTo
    {
        return $this->belongsTo(Meeting::class, 'meeting_id');
    }

    public function student() : BelongsTo
    {
        return $this->belongsTo(Student::class, 'student_id');
    }
}
