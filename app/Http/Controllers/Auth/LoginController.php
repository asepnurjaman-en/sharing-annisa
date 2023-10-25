<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index()
	{
		return inertia('Auth/Login');
	}

	public function store(Request $request)
	{
		$request->validate([
			'email'     => 'required|email',
			'password'  => 'required'
		]);
		$credentials = $request->only('email', 'password');
		if (Auth::attempt($credentials)) {
			$request->session()->regenerate();
			return redirect()->route('dashboard.index');
		}
		
		return back()->withErrors([
			'email' => 'The provided credentials do not match our records.',
		]);
	}

	public function destroy()
	{
		auth()->logout();

		return redirect()->route('login');
	}
}
