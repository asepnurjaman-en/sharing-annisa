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
            'scheduled' => Meeting::upComing()->withCount('participants'),
            'ongoing' => Meeting::ongoing()->withCount('participants'),
        ];
        if (in_array(Auth::user()->role, ['developer', 'admin'])) :
            $meetings['scheduled'] = $meetings['scheduled']->get();
            $meetings['scheduled']->map(function ($scheduled) {
                $scheduled->formatted_start = Carbon::parse($scheduled->start)->diffForHumans();
                unset($scheduled->start);
            });
            $meetings['ongoing'] = $meetings['ongoing']->get();
            return inertia('Admin/Dashboard', [
                'data' => $dashboard,
                'meetings' => $meetings,
                'current_route' => Route::currentRouteName()
            ]);
        elseif (in_array(Auth::user()->role, ['user'])) :
            $meetings['scheduled'] = $meetings['scheduled']->participate()->get();
            $meetings['scheduled']->map(function ($scheduled) {
                $scheduled->formatted_start = Carbon::parse($scheduled->start)->diffForHumans();
                unset($scheduled->start);
            });
            $meetings['ongoing'] = $meetings['ongoing']->participate()->get();
            return inertia('User/Dashboard', [
                'profile' => Student::whereHas('account', function($query) {
                    $query->whereId(Auth::user()->id);
                })->first(),
                'data' => $dashboard,
                'meetings' => $meetings,
                'current_route' => Route::currentRouteName()
            ]);
        endif;
    }
}
