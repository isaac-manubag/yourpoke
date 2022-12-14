<?php

use App\Models\PokemonCollection;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $user1 = User::create([
            'name' => 'Ash Kechum',
            'email' => 'ass@yourpoke.com',
            'password' => bcrypt('dummypassword'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        PokemonCollection::create([
            'user_id' => $user1->id,
            'pokemon_id' => 1,
            'name' => 'Bulbasaur',
            'type' => 'like',
        ]);

        PokemonCollection::create([
            'user_id' => $user1->id,
            'pokemon_id' => 1,
            'name' => 'Bulbasaur',
            'type' => 'like',
        ]);

        PokemonCollection::create([
            'user_id' => $user1->id,
            'pokemon_id' => 4,
            'name' => 'Charmander',
            'type' => 'like',
        ]);

        PokemonCollection::create([
            'user_id' => $user1->id,
            'pokemon_id' => 7,
            'name' => 'Squirtle',
            'type' => 'hate',
        ]);

        PokemonCollection::create([
            'user_id' => $user1->id,
            'pokemon_id' => 42,
            'name' => 'Golbat',
            'type' => 'hate',
        ]);

        PokemonCollection::create([
            'user_id' => $user1->id,
            'pokemon_id' => 92,
            'name' => 'Gastly',
            'type' => 'hate',
        ]);

        $user2 = User::create([
            'name' => 'Brock Kakang',
            'email' => 'brock@yourpoke.com',
            'password' => bcrypt('dummypassword'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        PokemonCollection::create([
            'user_id' => $user2->id,
            'pokemon_id' => 67,
            'name' => 'Machoke',
            'type' => 'like',
        ]);

        PokemonCollection::create([
            'user_id' => $user2->id,
            'pokemon_id' => 84,
            'name' => 'Doduo',
            'type' => 'like',
        ]);


        PokemonCollection::create([
            'user_id' => $user2->id,
            'pokemon_id' => 117,
            'name' => 'Seadra',
            'type' => 'hate',
        ]);

        PokemonCollection::create([
            'user_id' => $user2->id,
            'pokemon_id' => 92,
            'name' => 'Gastly',
            'type' => 'hate',
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
