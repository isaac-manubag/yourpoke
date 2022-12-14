<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddToCollectionRequest;
use App\Http\Requests\RemoveFromCollectionRequest;
use App\Http\Resources\PokemonCollectionResource;
use App\Http\Resources\UserResource;
use App\Models\PokemonCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserController extends Controller
{
    public function userProfile(Request $request): UserResource
    {
        $user = User::where('id', '=', auth()->user()->id)->with(['pokemonLikes', 'pokemonHates'])->first();
        return new UserResource($user);
    }

    public function addPokemonToCollection(AddToCollectionRequest $request): PokemonCollectionResource
    {
        $data = PokemonCollection::create([...$request->validated(), 'user_id' => auth()->user()->id]);
        return new PokemonCollectionResource($data);
    }

    public function removePokemonFromCollection(RemoveFromCollectionRequest $request)
    {
        return PokemonCollection::where('id', '=', $request->input('id'))
            ->where('user_id', '=', auth()->user()->id)
            ->delete();
    }

    public function getAllUsers(): AnonymousResourceCollection
    {
        return UserResource::collection(User::with(['pokemonLikes', 'pokemonHates'])->get());
    }

}
