<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Meeting;
use App\Models\Student;
use Illuminate\Http\Request;
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
            'scheduled' => Meeting::whereDate('start', '>', now())->get(),
            'ongoing' => Meeting::whereDate('start', '<=', now())->whereDate('until', '>=', now())->get(),
        ];
        $meetings['scheduled']->map(function ($scheduled) {
            $scheduled->formatted_start = Carbon::parse($scheduled->start)->diffForHumans();
            unset($scheduled->start);
        });

        return inertia('Dashboard/Index', [
            'data' => $dashboard,
            'meetings' => $meetings,
            'current_route' => Route::currentRouteName()
        ]);
    }
}
