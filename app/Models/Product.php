<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $with=["category"];
    public function owner(){
        return $this->belongsTo(User::class,"user_id");
    }
    public function category(){
        return $this->belongsTo(Category::class);
    }
    public function reviews(){
        return $this->hasMany(Review::class);
    }
    // protected $with=["owner","category","reviews"];
}
