<?php

namespace App\Http\Controllers\Admin;

use App\Models\MeetingActor;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MeetingActorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'student' => 'required',
            'meeting' => 'required',
            'stakeholder' => 'required'
        ]);
        MeetingActor::create([
            'meeting_id' => $request->meeting,
            'student_id' => $request->student,
            'stakeholder' => $request->stakeholder
        ]);

        return redirect()->route('meetings.show', $request->meeting)->with('success', 'New actor has been added.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $meeting_actor = MeetingActor::find($id);
        $meeting_actor->delete();

        return redirect()->route('meetings.show', $meeting_actor->meeting_id)->with('success', 'Actor has been deleted.');
    }
}
