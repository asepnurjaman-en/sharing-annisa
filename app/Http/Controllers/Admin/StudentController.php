<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\School;
use App\Models\Student;
use Illuminate\Support\Str;
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

		return inertia('Admin/Student/Index', [
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
		
		return inertia('Admin/Student/Create', [
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
			'name' => 'required|max:150',
			'gender' => 'required',
			'school' => 'required',
			'periods' => 'required',
			'email' => 'required|string|unique:users',
			'password' => 'required|string|min:8|confirmed'
		]);
		$user = User::create([
			'name' => $request->name,
			'email' => $request->email,
			'password' => bcrypt($request->password),
			'role' => 'user'
		]);
		if ($user) :
			$student = Student::create([
				'name' => $request->name,
				'gender' => $request->gender,
				'school_id' => $request->school,
				'account_id' => $user->id
			]);
			$date = explode(' to ', $request->periods);
			$date_start = date('Y-m-d', strtotime($date[0]));
			if (count($date)>1) :
				$date_departure = date('Y-m-d', strtotime($date[1]));
			else :
				$date_departure = date('Y-m-d', strtotime($date[0]));
			endif;
			if ($student) :
				StudentPeriod::create([
					'start' => $date_start,
					'departure' => $date_departure,
					'student_id' => $student->id
				]);
			endif;
		endif;

		return redirect()->route('students.index')->with('success', 'New student added.');
	}

	/**
	 * Display the specified resource.
	 */
	public function show(int $id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(int $id)
	{
		$student = Student::find($id);
		$student->formatted_date = $student->created_at->isoFormat('dddd, D MMMM Y');
		$schools = School::latest()->get();

		return inertia('Admin/Student/Edit', [
			'student' => $student,
			'schools' => $schools,
			'current_route' => Route::currentRouteName()
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, int $id)
	{
		$student = Student::find($id);
		$request->validate([
			'name' => 'required|max:150',
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
	public function destroy(int $id)
	{
		$student = Student::find($id);
		$student->delete();

		return redirect()->route('students.index')->with('success', $student->name.' has been deleted.');
	}

	public function create_account(int $id)
	{
		$student = Student::find($id);

		return inertia('Admin/Student/CreateAccount', [
			'student' => $student,
			'current_route' => Route::currentRouteName()
		]);
	}

	public function store_account(Request $request, int $id)
	{
		$student = Student::find($id);
		$request->validate([
			'email' => 'required|string|unique:users',
			'password' => 'required|string|min:8|confirmed'
		]);
		$account = User::create([
			'name' => $student->name,
			'email' => $request->email,
			'password' => bcrypt($request->password),
			'role' => 'user'
		]);
		if ($account) :
			$student->update([
				'account_id' => $account->id
			]);
		endif;

		return redirect()->route('students.edit_account', $account->id)->with('success', $student->name.'` account has been created.');
	}

	public function edit_account(int $id)
	{
		$account = User::find($id);
		$account->formatted_date = $account->created_at->isoFormat('dddd, D MMMM Y');

		return inertia('Admin/Student/EditAccount', [
			'account' => $account,
			'current_route' => Route::currentRouteName()
		]);
	}

	public function update_account(Request $request, int $id)
	{
		$account = User::find($id);
		$validation = [
			'email' => 'required|string|unique:users,email,'.$account->id,
		];
		$column = [
			'email' => $request->email,
		];
		if ($request->filled('password')) :
			$validation['password'] = 'required|string|min:8|confirmed';
			$column['password'] = bcrypt($request->password);
		endif;
		$request->validate($validation);
		$account->update($column);

		return redirect()->route('students.edit_account', $id)->with('success', $account->name.' has been edited.');
	}

	public function delete_account(int $id)
	{
		$account = User::find($id);
		$account->delete();

		return redirect()->route('students.index')->with('success', $account->name.'`s account has been deleted.');
	}
}
