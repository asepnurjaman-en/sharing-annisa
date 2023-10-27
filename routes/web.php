<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\User\ProfileController AS UserProfile;
use App\Http\Controllers\User\MeetingController AS UserMeeting;
use App\Http\Controllers\User\MeetingParticipantController AS UserMeetingPart;
use App\Http\Controllers\Admin\SchoolController AS AdminSchool;
use App\Http\Controllers\Admin\MeetingController AS AdminMeeting;
use App\Http\Controllers\Admin\StudentController AS AdminStudent;
use App\Http\Controllers\Admin\MeetingActorController AS AdminMeetingActor;
use App\Http\Controllers\Admin\MeetingSubjectController AS AdminMeetingSubject;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', [LoginController::class, 'index'])->name('login')->middleware('guest');
Route::post('/login', [LoginController::class, 'store'])->middleware('guest');
Route::post('/logout', [LoginController::class, 'destroy'])->middleware('auth');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index')->middleware('auth');
Route::prefix('admin')->middleware('auth')->group(function() {
    Route::resource('meetings', AdminMeeting::class)->middleware('role:developer,admin,user');
    Route::resource('meeting-actors', AdminMeetingActor::class)->except('index', 'show', 'create')->middleware('role:developer,admin');
    Route::resource('meeting-subjects', AdminMeetingSubject::class)->except('index', 'show', 'create')->middleware('role:developer,admin');
    Route::resource('students', AdminStudent::class)->except('show')->middleware('role:developer,admin');
    Route::get('students/{id}/create-account', [AdminStudent::class, 'create_account'])->name('students.create_account')->middleware('role:developer,admin');
    Route::post('students/{id}/create-account', [AdminStudent::class, 'store_account'])->name('students.store_account')->middleware('role:developer,admin');
    Route::get('students/{id}/edit-account', [AdminStudent::class, 'edit_account'])->name('students.edit_account')->middleware('role:developer,admin');
    Route::put('students/{id}/edit-account', [AdminStudent::class, 'update_account'])->name('students.update_account')->middleware('role:developer,admin');
    Route::delete('students/{id}/delete-account', [AdminStudent::class, 'delete_account'])->name('students.deleteupdate_account')->middleware('role:developer,admin');
    Route::resource('schools', AdminSchool::class)->except('create')->middleware('role:developer,admin');
});

Route::prefix('u')->middleware('auth')->group(function() {
    Route::get('profile', [UserProfile::class, 'me'])->name('user.profile.me')->middleware('role:user');
    Route::get('profile/edit', [UserProfile::class, 'edit'])->name('user.profile.edit')->middleware('role:user');
    Route::post('profile/update', [UserProfile::class, 'update'])->name('user.profile.update')->middleware('role:user');
    Route::get('meetings', [UserMeeting::class, 'index'])->name('user.meetings.index')->middleware('role:user');
    Route::get('my-meetings', [UserMeeting::class, 'my_index'])->name('user.meetings.myindex')->middleware('role:user');
    Route::get('engaged-meetings', [UserMeeting::class, 'engaged'])->name('user.meetings.engaged')->middleware('role:user');
    Route::get('meetings/{id}', [UserMeeting::class, 'show'])->name('user.meetings.show')->middleware('role:user');
    Route::post('meetings/{id}/join', [UserMeetingPart::class, 'store'])->name('user.meetings.join')->middleware('role:user');
    Route::put('meetings/{id}/attendance', [UserMeetingPart::class, 'update'])->name('user.meetings.attendance')->middleware('role:user');
    Route::delete('meetings/{id}/leave', [UserMeetingPart::class, 'destroy'])->name('user.meetings.leave')->middleware('role:user');
});
