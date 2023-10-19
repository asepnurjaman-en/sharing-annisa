<?php

namespace App\Http\Controllers\Admin;

use App\Models\School;
use App\Models\Student;
use Illuminate\Http\Request;
use App\Models\StudentPeriod;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::has('school')->with('school')->latest()->get();

        return inertia('Student/Index', [
            'students' => $students,
            'current_route' => Route::currentRouteName()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $schools = School::latest()->get();
        
        return inertia('Student/Create', [
            'schools' => $schools,
            'current_route' => Route::currentRouteName()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'gender' => 'required',
            'school' => 'required',
            'periods' => 'required',
        ]);
        $student = Student::create([
            'name' => $request->name,
            'gender' => $request->gender,
            'school_id' => $request->school
        ]);
        $date = explode(' to ', $request->periods);
        $date_start = date('Y-m-d', strtotime($date[0]));
        if (count($date)>1) :
            $date_departure = date('Y-m-d', strtotime($date[1]));
        else :
            $date_departure = date('Y-m-d', strtotime($date[0]));
        endif;
        StudentPeriod::create([
            'start' => $date_start,
            'departure' => $date_departure,
            'student_id' => $student->id
        ]);

        return redirect()->route('students.index')->with('success', 'New student added.');
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
        $student = Student::find($id);
        $student->formatted_date = $student->created_at->isoFormat('dddd, D MMMM Y');
        $schools = School::latest()->get();

        return inertia('Student/Edit', [
            'student' => $student,
            'schools' => $schools,
            'current_route' => Route::currentRouteName()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $student = Student::find($id);
        $request->validate([
            'name' => 'required',
            'gender' => 'required',
            'school' => 'required'
        ]);
        $student->update([
            'name' => $request->name,
            'gender' => $request->gender,
            'school_id' => $request->school
        ]);

        return redirect()->route('students.index')->with('success', $request->name.' has been edited.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $student = Student::find($id);
        $student->delete();

        return redirect()->route('students.index')->with('success', $student->name.' has been deleted.');
    }
}
