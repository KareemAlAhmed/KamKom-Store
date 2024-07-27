<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::factory()->create(["name"=>"Laptops"]);
        Category::factory()->create(["name"=>"Computer-Parts"]);
        Category::factory()->create(["name"=>"Desktops"]);
        Category::factory()->create(["name"=>"Gaming"]);
        Category::factory()->create(["name"=>"Mobile"]);
        Category::factory()->create(["name"=>"Tablet"]);
        Category::factory()->create(["name"=>"Networking"]);
        Category::factory()->create(["name"=>"Fashion"]);
        Category::factory()->create(["name"=>"Furniture"]);
        Category::factory()->create(["name"=>"Pet"]);
        Category::factory()->create(["name"=>"Property"]);
        Category::factory()->create(["name"=>"Vehicle"]);
    }
}
