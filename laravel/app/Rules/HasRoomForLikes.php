<?php

namespace App\Rules;

use App\Models\PokemonCollection;
use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\InvokableRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class HasRoomForLikes implements InvokableRule
{
    /**
     * Run the validation rule.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  Closure(string): PotentiallyTranslatedString  $fail
     * @return void
     */
    public function __invoke($attribute, $value, $fail)
    {
        /** @var User $user */
        $user = auth()->user();

        if ($user->pokemonLikes->count() >= 3) {
            $fail('You already liked 3 Pokemons');
        }

        $exists = PokemonCollection::where('user_id', '=', auth()->user()->id)
            ->where('pokemon_id', '=', $value)
            ->where('type', '=', 'like')
            ->exists();

        if ($exists) {
            $fail('You already liked this Pokemon');
        }
    }
}
