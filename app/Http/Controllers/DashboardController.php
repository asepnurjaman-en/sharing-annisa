<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Meeting;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class DashboardController extends Controller
{
    public function index()
    {
        $dashboard = [
            'meetings' => Meeting::count(),
            'students' => Student::count()
        ];
        $meetings = [
            'scheduled' => Meeting::upComing()->withCount('participants')->get(),
            'ongoing' => Meeting::ongoing()->withCount('participants')->get(),
        ];
        $meetings['scheduled']->map(function ($scheduled) {
            $scheduled->formatted_start = Carbon::parse($scheduled->start)->diffForHumans();
            unset($scheduled->start);
        });
        if (in_array(Auth::user()->role, ['developer', 'admin'])) :
            return inertia('Admin/Dashboard', [
                'data' => $dashboard,
                'meetings' => $meetings,
                'current_route' => Route::currentRouteName()
            ]);
        elseif (in_array(Auth::user()->role, ['user'])) :
            return inertia('User/Dashboard', [
                'data' => $dashboard,
                'meetings' => $meetings,
                'current_route' => Route::currentRouteName()
            ]);
        endif;
    }
}
