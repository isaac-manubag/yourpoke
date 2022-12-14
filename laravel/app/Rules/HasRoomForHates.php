<?php

namespace App\Rules;

use App\Models\PokemonCollection;
use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\InvokableRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class HasRoomForHates implements InvokableRule
{
    /**
     * Run the validation rule.
     *
     * @param string $attribute
     * @param mixed $value
     * @param Closure(string): PotentiallyTranslatedString $fail
     * @return void
     */
    public function __invoke($attribute, $value, $fail)
    {
        /** @var User $user */
        $user = auth()->user();

        if ($user->pokemonHates->count() >= 3) {
            $fail('You already hated 3 Pokemons.. hater');
        }

        $exists = PokemonCollection::where('user_id', '=', auth()->user()->id)
            ->where('pokemon_id', '=', $value)
            ->where('type', '=', 'hate')
            ->exists();

        if ($exists) {
            $fail('You already hate this Pokemon, hater');
        }
    }
}
