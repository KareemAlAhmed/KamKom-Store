<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\SoldItems;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use stdClass;

class SoldItemsController extends Controller
{
    public function create($id){
        $user=User::find($id);
        if(isset($user)){
            $soldList=new SoldItems();
            $soldList->owner_id=$id;
            $soldList->sold_Products=json_encode([]);
            $soldList->save();
            return $soldList;
        }else{
            return response()->json([
                "status"=>404,
                "error"=>"User Not Found!"
            ],404);
        }
    }
    public function addToSoldList($ownerId,$prodId,$item){
        $user=User::find($ownerId);
        if(!isset($user)){
            return response()->json([
                "status"=>404,
                "error"=>"User Not Found!"
            ],404);
        }
        $list=SoldItems::where("owner_id",$ownerId)->first();
        if(!isset($list)){
            return response()->json([
                "status"=>404,
                "error"=>"List Not Found!"
            ],404);
        }
        $items=json_decode($list->sold_Products);
        $prod=Product::find($prodId);
        $product=new stdClass();
        $product->id=$prod->id;
        $product->name=$prod->name;
        $product->price=$prod->price;
        $product->thumnail=$prod->thumbnail_url;
        $product->quantity=$item->quantity;
        $product->images_url=$prod->images_url;
        $product->rating=$prod->rating;
        $mytime = Carbon::now();
        $product->date=$mytime->toDateTimeString();
        $items[]=$product;
        $list->sold_Products=json_encode($items);
        $list->update();
        return response()->json([
            "status"=>200,
            "message"=>"The  BoughtList Updated !"
        ],200);
    }
    public function getSoldItems($ownerId){
        $user=User::find($ownerId);
        if(!isset($user)){
            return response()->json([
                "status"=>404,
                "error"=>"User Not Found!"
            ],404);
        }
        $list=SoldItems::where("owner_id",$ownerId)->first();
        if(!isset($list)){
            return response()->json([
                "status"=>404,
                "error"=>"List Not Found!"
            ],404);
        }
        return json_decode($list->sold_Products);
    }
}
