<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('FullName');
            $table->string('bio');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->float('balance')->default(100.00);
            $table->string('kamkom_number')->unique();
            $table->string('country');
            $table->string('streetAddress');
            $table->boolean('isAdmin')->default(false);
            $table->string('city');
            $table->string('currency')->nullable()->default('USD');
            $table->string('image_url')->nullable()->default('http://res.cloudinary.com/dgo3fuaxg/image/upload/v1721929948/bhucqryzr7yrlr3lzuh2.jpg');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
