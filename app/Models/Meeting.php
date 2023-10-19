<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Meeting extends Model
{
    use HasFactory, SoftDeletes;

    protected $date = ['deleted_at'];
    protected $guarded = ['id'];
    protected $casts = [
        'start' => 'date',
        'until' => 'date'
    ];
    protected static function booted()
    {
        static::creating(function ($request) {
            $request->user_id = Auth::user()->id;
        });
    }

    public function actors() : HasMany
    {
        return $this->hasMany(MeetingActor::class, 'meeting_id');
    }

    public function subjects() : HasMany
    {
        return $this->hasMany(MeetingSubject::class, 'meeting_id');
    }
}
