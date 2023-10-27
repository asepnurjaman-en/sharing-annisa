<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
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

    public function school() : BelongsTo
    {
        return $this->belongsTo(School::class, 'school_id');
    }

    public function meeting() : HasMany
    {
        return $this->hasMany(MeetingParticipant::class, 'student_id');
    }

    public function account() : BelongsTo
    {
        return $this->belongsTo(User::class, 'account_id');
    }
}
