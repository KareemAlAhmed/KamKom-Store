<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use PhpOption\None;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("brand_name");
            $table->string("description",4000);
            $table->float("price",15,2);
            $table->integer("quantity");
            $table->integer("sold_number")->default(0);
            $table->integer("reviews_number")->default(0);
            $table->float("star_number")->default(0.00);
            $table->float("rating")->default(0.00);
            $table->json("images_url");
            $table->string("thumbnail_url",500)->default("images.png");
            $table->foreignId("category_id")->constrained("categories")->cascadeOnDelete();
            $table->foreignId("subcategory_id")->nullable()->constrained("subcategories")->cascadeOnDelete();
            $table->foreignId("user_id")->constrained("users")->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
