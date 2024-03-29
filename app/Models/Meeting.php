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

    public function participants() : HasMany
    {
        return $this->hasMany(MeetingParticipant::class, 'meeting_id');
    }

    public function scopeParticipate($query)
    {
        $query->whereHas('participants', function ($sub_query) {
            $sub_query->where('student_id', Auth::user()->student->id);
        });
    }

    public function scopeEngaged($query)
    {
        $query->whereHas('actors', function ($sub_query) {
            $sub_query->where('student_id', Auth::user()->student->id);
        })->with(['actors' => function ($sub_query) {
            $sub_query->where('student_id', Auth::user()->student->id);
        }]);
    }

    public function scopeOngoing($query)
    {
        return $query->whereDate('start', '<=', now())->whereDate('until', '>=', now());
    }

    public function scopeUpComing($query)
    {
        return $query->whereDate('start', '>', now());
    }
}
