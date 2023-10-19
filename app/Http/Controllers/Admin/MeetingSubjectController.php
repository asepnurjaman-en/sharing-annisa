<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Models\MeetingSubject;
use App\Http\Controllers\Controller;

class MeetingSubjectController extends Controller
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
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'meeting' => 'required'
        ]);
        MeetingSubject::create([
            'meeting_id' => $request->meeting,
            'title' => $request->title,
            'content' => $request->content
        ]);

        return redirect()->route('meetings.show', $request->meeting)->with('success', 'New subject has been added.');
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
        $meeting_subject = MeetingSubject::find($id);
        $meeting_subject->delete();

        return redirect()->route('meetings.show', $meeting_subject->meeting_id)->with('success', 'Subject has been deleted.');
    }
}
