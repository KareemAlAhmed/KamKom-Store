<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\product>
 */
class productFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'brand_name' => fake()->word(),
            'price' => fake()->numberBetween(1.00,100.00),
            'quantity' => fake()->numberBetween(1,20),
            'category_id' => 1,
            'subcategory_id' => null,
            'user_id' => 1,
            "images_url"=>'["photo1.png"]',
            "specs"=>'["album:true"]'
        ];
    }
}
