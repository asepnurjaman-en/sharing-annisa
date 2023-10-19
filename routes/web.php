<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\SchoolController AS AdminSchool;
use App\Http\Controllers\Admin\StudentController AS AdminStudent;
use App\Http\Controllers\Admin\MeetingController AS AdminMeeting;
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

Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'store']);
Route::post('/logout', [LoginController::class, 'destroy'])->middleware('auth');

Route::middleware('auth')->group(function() {
    Route::get('/home', [DashboardController::class, 'index'])->name('dashboard.index');
    Route::resource('meetings', AdminMeeting::class);
    Route::resource('meeting-actors', AdminMeetingActor::class)->except('index', 'show', 'create');
    Route::resource('meeting-subjects', AdminMeetingSubject::class)->except('index', 'show', 'create');
    Route::resource('students', AdminStudent::class)->except('show');
    Route::resource('schools', AdminSchool::class)->except('create');
});