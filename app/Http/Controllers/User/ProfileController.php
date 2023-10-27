<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function me()
    {
        return inertia('User/Profile/Me', [
            'profile' => Student::whereHas('account', function($query) {
                $query->whereId(Auth::user()->id);
            })->first(),
            'current_route' => Route::currentRouteName()
        ]);
    }

    public function edit()
    {
        return inertia('User/Profile/Edit', [
            'profile' => Student::whereHas('account', function($query) {
                $query->whereId(Auth::user()->id);
            })->first(),
            'current_route' => Route::currentRouteName()
        ]);
    }

    public function update(Request $request)
    {
		$account = User::find(Auth::user()->id);
        $validation = [
			'name' => 'required|string',
			'email' => 'required|string|unique:users,email,'.$account->id,
		];
		$column = [
			'name' => $request->name,
			'email' => $request->email,
		];
		if ($request->filled('password')) :
			$validation['password'] = 'required|string|min:8|confirmed';
			$column['password'] = bcrypt($request->password);
		endif;
        if ($request->hasFile('avatar')) :
			$validation['avatar'] = 'required|mimes:jpg,jpeg,png';
            $avatar_name = $request->file('avatar')->hashName();
            Storage::disk('public')->put($avatar_name, file_get_contents($request->file('avatar')));
            // image_reducer(file_get_contents($request->file('avatar')), $image_name);
            // StrBox::create(['title' => $request->title, 'file' => $image_name, 'file_type' => 'image', 'user_id' => Auth::user()->id, 'ip_addr' => $_SERVER['REMOTE_ADDR']]);
            Student::where('account_id', Auth::user()->id)->update(['profile_picture' => $avatar_name]);
		endif;
        if ($request->hasFile('background')) :
			$validation['background'] = 'required|mimes:jpg,jpeg,png';
            $background_name = $request->file('background')->hashName();
            Storage::disk('public')->put($background_name, file_get_contents($request->file('background')));
            // image_reducer(file_get_contents($request->file('avatar')), $image_name);
            // StrBox::create(['title' => $request->title, 'file' => $image_name, 'file_type' => 'image', 'user_id' => Auth::user()->id, 'ip_addr' => $_SERVER['REMOTE_ADDR']]);
            Student::where('account_id', Auth::user()->id)->update(['background_picture' => $background_name]);
		endif;
		$request->validate($validation);
        $account->update($column);

        return redirect()->route('user.profile.me')->with('success', 'Your profile has been updated.');
    }
}
