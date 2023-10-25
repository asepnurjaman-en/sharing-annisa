<?php

namespace App\Http\Controllers\User;

use App\Models\Meeting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class MeetingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $meetings = Meeting::upComing()->with(['participants' => function($query) {
            $query->where('student_id', Auth::user()->student->id);
        }])->orderBy('start', 'asc')->get();
        $meetings->map(function ($meeting) {
            $meeting->formatted_coming = $meeting->start->diffForHumans();
            $meeting->formatted_start = $meeting->start->isoFormat('DD/MM/Y');
            $meeting->formatted_until = $meeting->until->isoFormat('DD/MM/Y');
            unset($meeting->start);
            unset($meeting->until);
        });

        return inertia('User/Meeting/Index', [
            'meetings' => $meetings,
            'current_route' => Route::currentRouteName()
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function my_index()
    {
        $meetings = Meeting::whereHas('participants', function($query) {
            $query->where('student_id', Auth::user()->student->id);
        })->orderBy('start', 'asc')->get();
        $meetings->map(function ($meeting) {
            $meeting->formatted_coming = $meeting->start->diffForHumans();
            $meeting->formatted_start = $meeting->start->isoFormat('DD/MM/Y');
            $meeting->formatted_until = $meeting->until->isoFormat('DD/MM/Y');
            unset($meeting->start);
            unset($meeting->until);
        });

        return inertia('User/Meeting/MyIndex', [
            'meetings' => $meetings,
            'current_route' => Route::currentRouteName()
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $meeting = Meeting::whereId($id)->with('subjects')->with(['actors' => function($query) {
            $query->with('student');
        }])->with(['participants' => function($query) {
            $query->where('student_id', Auth::user()->student->id);
        }])->withCount('participants')->firstOrFail();
        $meeting->formatted_start = $meeting->start->isoFormat('dddd, D MMMM Y');
        $meeting->formatted_end = $meeting->until->isoFormat('dddd, D MMMM Y');
        $meeting->formatted_coming = $meeting->start->diffForHumans();
        if ($meeting->start > now()) :
            $meeting->status = "soon";
        elseif ($meeting->start <= now() && $meeting->until >= now()) :
            $meeting->status = "ongoing";
        elseif ($meeting->until < now()) :
            $meeting->status = "ended";
        endif;

        return inertia('User/Meeting/Show', [
            'meeting' => $meeting,
            'current_route' => Route::currentRouteName()
        ]);
    }
}
