<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    use HasFactory;
    function category_parent(){
        return $this->belongsTo(Category::class,"category_id");
    }
    protected $with=['category_parent'];
}
