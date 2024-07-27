<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Purchase extends Model
{
    use HasFactory;

    public function buyers(){
        return $this->belongsTo(User::class,"buyer_id");
    }
    public function sellers(){
        return $this->belongsToMany(User::class,"seller_id");
    }
    // protected $with=["buyers","sellers"];
}
