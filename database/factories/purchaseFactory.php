<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\purchase>
 */
class purchaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "buyer_id"=>fake()->numberBetween(1,5),
            "seller_id"=>'["1"]',
            "cart_id"=>fake()->numberBetween(1,5),
            "cost"=>fake()->numberBetween(1.00,100.00),
        ];
    }
}
