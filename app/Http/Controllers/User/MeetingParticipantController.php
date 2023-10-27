<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\MeetingParticipant;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class MeetingParticipantController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'meeting' => ['required', Rule::unique('meeting_participants', 'meeting_id')->where('student_id', Auth::user()->student->id)->whereNull('deleted_at')],
        ]);
        $meeting_participant = MeetingParticipant::create([
            'meeting_id' => $request->meeting,
            'student_id' => Auth::user()->student->id,
        ]);

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $meeting = MeetingParticipant::where('meeting_id', $id)->where('student_id', Auth::user()->student->id)->where('attendance', 0);
        $request->validate([
            'meeting' => 'required'
        ]);
        $meeting->update(['attendance'=>1]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $meeting = MeetingParticipant::where('meeting_id', $id)->where('student_id', Auth::user()->student->id);
        $meeting->delete();

        return redirect()->back();
    }
}
