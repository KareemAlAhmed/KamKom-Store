<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    function owner(){
        return $this->belongsTo(User::class,"owner_id");
    }
    protected $with=["owner"];
}
