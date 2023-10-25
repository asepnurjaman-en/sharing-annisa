<?php

namespace App\Http\Controllers\Admin;

use App\Models\School;
use App\Models\Meeting;
use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

class MeetingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $meetings = Meeting::latest()->get();
        $meetings->map(function ($meeting) {
            $meeting->formatted_start = $meeting->start->isoFormat('DD/M/Y');
            unset($meeting->start);
        });

        return inertia('Admin/Meeting/Index', [
            'meetings' => $meetings,
            'current_route' => Route::currentRouteName()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'periods' => 'required',
        ]);
        $date = explode(' to ', $request->periods);
        $date_start = date('Y-m-d', strtotime($date[0]));
        if (count($date)>1) :
            $date_departure = date('Y-m-d', strtotime($date[1]));
        else :
            $date_departure = date('Y-m-d', strtotime($date[0]));
        endif;
        $meeting = Meeting::create([
            'name' => $request->name,
            'start' => $date_start,
            'until' => $date_departure,
        ]);

        return redirect()->route('meetings.index')->with('success', 'New meeting added.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $meeting = Meeting::whereId($id)->with('subjects')->with(['actors' => function($query) {
            $query->with('student');
        }])->firstOrFail();
        $meeting->formatted_start = $meeting->start->isoFormat('dddd, D MMMM Y');
        $meeting->formatted_end = $meeting->until->isoFormat('dddd, D MMMM Y');
        $meeting->formatted_date = $meeting->created_at->isoFormat('dddd, D MMMM Y');
        if ($meeting->start > now()) :
            $meeting->status = "soon";
        elseif ($meeting->start <= now() && $meeting->until >= now()) :
            $meeting->status = "ongoing";
        elseif ($meeting->until < now()) :
            $meeting->status = "ended";
        endif;
        $students = School::with('students')->get();

        return inertia('Admin/Meeting/Show', [
            'meeting' => $meeting,
            'students' => $students,
            'current_route' => Route::currentRouteName()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $meeting = Meeting::find($id);
        $meeting->formatted_date = $meeting->created_at->isoFormat('dddd, D MMMM Y');

        return inertia('Admin/Meeting/Edit', [
            'meeting' => $meeting,
            'current_route' => Route::currentRouteName()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $meeting = Meeting::find($id);
        $request->validate([
            'name' => 'required',
            'start' => 'required|date',
            'until' => 'required|date|after_or_equal:'.$request->start
        ]);
        $meeting->update([
            'name' => $request->name,
            'start' => $request->start,
            'until' => $request->until
        ]);

        return redirect()->route('meetings.show', $id)->with('success', $request->name.' has been edited.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $meeting = Meeting::find($id);
        $meeting->delete();

        return redirect()->route('meetings.index')->with('success', $meeting->name.' has been deleted.');
    }
}
