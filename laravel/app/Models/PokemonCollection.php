<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PokemonCollection extends Model
{
    use HasFactory;

    protected $table = 'pokemon_collection';

    protected $fillable = [
        'pokemon_id',
        'name',
        'type',
        'user_id',
    ];


}
