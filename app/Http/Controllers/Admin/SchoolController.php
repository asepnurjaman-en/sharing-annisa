<?php

namespace App\Http\Controllers\Admin;

use App\Models\School;
use Illuminate\Http\Request;
use App\Models\StudentPeriod;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

class SchoolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $schools = School::withCount('students')->latest()->get();

        return inertia('School/Index', [
            'schools' => $schools,
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
            'name' => 'required'
        ]);
        School::create([
            'name' => $request->name
        ]);

        return redirect()->route('schools.index')->with('success', 'New school added.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $school = School::find($id);
        $school->formatted_date = $school->created_at->isoFormat('dddd, D MMMM Y');
        $students_active = StudentPeriod::whereHas(
            'student', function ($query) use ($school) {
                $query->where('school_id', $school->id);
            }
        )->with('student')->whereDate('start', '<=', now())->whereDate('departure', '>=', now())->get();
        $students_active->map(function ($student_active) {
            $student_active->formatted_start = $student_active->start->isoFormat('dddd, D MMMM Y');
            $student_active->formatted_departure = $student_active->departure->isoFormat('dddd, D MMMM Y');
            unset($student_active->start, $student_active->departure);
        });
        $students_passed = StudentPeriod::whereHas(
            'student', function ($query) use ($school) {
                $query->where('school_id', $school->id);
            }
        )->with('student')->whereDate('departure', '<', now())->get();
        $students_passed->map(function ($student_passed) {
            $student_passed->formatted_start = $student_passed->start->isoFormat('dddd, D MMMM Y');
            $student_passed->formatted_departure = $student_passed->departure->isoFormat('dddd, D MMMM Y');
            unset($student_passed->start, $student_passed->departure);
        });
        $students_scheduled = StudentPeriod::whereHas(
            'student', function ($query) use ($school) {
                $query->where('school_id', $school->id);
            }
        )->with('student')->whereDate('start', '>', now())->get();
        $students_scheduled->map(function ($student_scheduled) {
            $student_scheduled->formatted_start = $student_scheduled->start->isoFormat('dddd, D MMMM Y');
            $student_scheduled->formatted_departure = $student_scheduled->departure->isoFormat('dddd, D MMMM Y');
            unset($student_scheduled->start, $student_scheduled->departure);
        });

        return inertia('School/Show', [
            'school' => $school,
            'students' => [
                'active' => $students_active,
                'passed' => $students_passed,
                'scheduled' => $students_scheduled
            ],
            'current_route' => Route::currentRouteName()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $school = School::find($id);
        $school->formatted_date = $school->created_at->isoFormat('dddd, D MMMM Y');

        return inertia('School/Edit', [
            'school' => $school,
            'current_route' => Route::currentRouteName()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $school = School::find($id);
        $request->validate([
            'name' => 'required'
        ]);
        $school->update([
            'name' => $request->name
        ]);

        return redirect()->route('schools.index')->with('success', $request->name.' has been edited.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $school = School::find($id);
        $school->delete();

        return redirect()->route('schools.index')->with('success', $school->name.' has been deleted.');
    }
}
