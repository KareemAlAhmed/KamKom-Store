<?php

namespace App\Http\Controllers;

use App\Models\BoughtItems;
use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use stdClass;

class BoughtItemsController extends Controller
{
    public function create($id){
        $user=User::find($id);
        if(isset($user)){
            $boughtList=new BoughtItems();
            $boughtList->owner_id=$id;
            $boughtList->bought_Products=json_encode([]);
            $boughtList->save();
            return $boughtList;
        }else{
            return response()->json([
                "status"=>404,
                "error"=>"User Not Found!"
            ],404);
        }
    }
    public function test(){
        $cart=Cart::find(1);
        $products=json_decode($cart->products_id);
        // return $products;
        $list=$this->addToSoldList(1,$products);
        return $list;
        // $list={"482": {"seller": "Tech Zone", "quantity": 1, "sellerId": 42, "BuyerName": "karim ahmad", "ProductName": "D-Link DGS-1100-26MPV2 24-PORTS POE +2 PORTS SFP", "ProductPrice": 315}, "483": {"seller": "Tech Zone", "quantity": 1, "sellerId": 42, "BuyerName": "karim ahmad", "ProductName": "Archer GX90 AX6600 Tri-Band Wi-Fi 6 Gaming Router Archer GX90", "ProductPrice": 365}, "485": {"seller": "Tech Zone", "quantity": 1, "sellerId": 42, "BuyerName": "karim ahmad", "ProductName": "D-Link Dual Angular Faceplate  86*86 mm  White Color", "ProductPrice": 1.32}}
    }
    public function addToBoughtList($ownerId,$litOfProd){
        $user=User::find($ownerId);
        if(!isset($user)){
            return response()->json([
                "status"=>404,
                "error"=>"User Not Found!"
            ],404);
        }
        $list=BoughtItems::where("owner_id",$ownerId)->first();
        if(!isset($list)){
            return response()->json([
                "status"=>404,
                "error"=>"List Not Found!"
            ],404);
        }
        $items=json_decode($list->bought_Products);
        foreach($litOfProd as $key=>$item){
            $prod=Product::find($key);
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
        }
        $list->bought_Products=json_encode($items);
        $list->update();
        return response()->json([
            "status"=>200,
            "message"=>"The  BoughtList Updated !"
        ],200);
    }
    public function getBoughtitems($ownerId){
        $user=User::find($ownerId);
        if(!isset($user)){
            return response()->json([
                "status"=>404,
                "error"=>"User Not Found!"
            ],404);
        }
        $list=BoughtItems::where("owner_id",$ownerId)->first();
        if(!isset($list)){
            return response()->json([
                "status"=>404,
                "error"=>"List Not Found!"
            ],404);
        }
        return json_decode($list->bought_Products);
    }
}
