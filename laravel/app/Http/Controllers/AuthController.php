<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function register(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => \Hash::make($validatedData['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

//        event(new Registered($user));

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

//    public function setPassword(Request $request): JsonResponse
//    {
//        $validatedData = $request->validate([
//            'email' => 'required|string|email|max:255|exists:users',
//            'password' => 'required|string|min:8',
//        ]);
//
//        $user = User::query()->where('email', $validatedData['email'])->firstOrFail();
//        $user->password = \Hash::make($validatedData['password']);
//        $user->email_verified_at = Carbon::now();
//        $user->save();
//
//        $token = $user->createToken('auth_token')->plainTextToken;
//
//        return response()->json([
//            'access_token' => $token,
//            'token_type' => 'Bearer',
//        ]);
//    }


}
