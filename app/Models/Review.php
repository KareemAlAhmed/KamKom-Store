<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    
    public function product(){
        return $this->belongsTo(Product::class,"product_id");
    }
    public function reviewer(){
        return $this->belongsTo(User::class,"reviewer_id");
    }
    protected $with=["reviewer"];
}
