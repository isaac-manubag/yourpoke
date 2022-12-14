<?php

namespace App\Http\Requests;

use App\Rules\HasRoomForHates;
use App\Rules\HasRoomForLikes;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddToCollectionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:1|max:255',
            'pokemon_id' => ['required', ($this->input('type') === 'like' ? new HasRoomForLikes : new HasRoomForHates)],
            'type' => ['required', Rule::in(['like', 'hate'])],
        ];
    }
}
