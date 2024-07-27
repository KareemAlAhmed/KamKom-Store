<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class CartController extends Controller
{
    public function create($ownerId){
        $owner=User::find($ownerId);
        if($owner){
            $cart=new Cart();
            $cart->owner_id=$ownerId;
            $cart->products_id=json_encode([]);
            $cart->cost=0.00;
            $cart->save();
            return $cart;
        }else{
            return response()->json([
                "status"=>404,
                "error"=>"The Owner doesnt exist",
            ]);
        }
    }
    public function add($productId,$ownerId,Request $request){
        $owner=User::find($ownerId);
        $product=Product::find($productId);
        if(!$owner){
            return response()->json([
                "status"=>404,
                "error"=>"The Owner doesnt exist",
            ],404);
        }
        if(!$product){
            return response()->json([
                "status"=>404,
                "error"=>"The Product doesnt exist",
            ],404);
        }
        $cart=Cart::where("owner_id",$ownerId)->first();
        $prods= json_decode($cart->products_id, true);
        if($product->user_id == $ownerId){
            return response()->json([
                "status"=>404,
                "error"=>"The Buyer Cant Buy his Products",
            ],404);
        }
        $nbOfQatWanted=1;
        if(isset($request["quantity"])){
            $nbOfQatWanted=$request["quantity"];
        }

        if(!empty($prods)){
            foreach($prods as $key=>$prod){
                if($key == $productId){
                    $prods[$key]["quantity"]=$prods[$key]["quantity"] + $nbOfQatWanted;
                }else{
                    $prods[$productId]=["quantity"=>$nbOfQatWanted,"seller"=>User::find($product->user_id)->FullName,"sellerId"=>$product->user_id,
                    "BuyerName"=>$owner->FullName,
                    "ProductName"=>$product->name,
                    "ProductPrice"=>$product->price
                    ];
                }
            }
        }else{
            $prods[$productId]=["quantity"=>$nbOfQatWanted,
            "seller"=>User::find($product->user_id)->FullName,
            "sellerId"=>$product->user_id,
            "BuyerName"=>$owner->FullName,
            "ProductName"=>$product->name,
            "ProductPrice"=>$product->price];
        }
        $cart->products_id=json_encode($prods);
        $cart->cost=$cart->cost + ($product->price * $nbOfQatWanted);
        $cart->update();
        return response()->json([
            "status"=>200,
            "success"=>"The Product Added to the Cart",
            "cart"=>$cart,
        ],200);
    }
    public function show($ownerId){
        $cart=Cart::where("owner_id",$ownerId)->first();
        $prodsJson=json_decode($cart->products_id);
        $prods=[];
        foreach($prodsJson as $prodId=>$value){
            $product=Product::find($prodId);
            $img=json_decode($product->images_url);
            $prods[]=[$prodId,$product->name,$product->price,$value->quantity,$img[0]];
        }
        if($cart){
            return [$cart->cost,$prods];
        }else{
            return response()->json([
                "status"=>404,
                "error"=>"The Cart doesnt exist",
            ],404);
        }
    }
    public function remove($productId,$ownerId){
        $owner=User::find($ownerId);
        if(!$owner){
            return response()->json([
                "status"=>404,
                "error"=>"The Owner doesnt exist",
            ],404);
        }
        $cart=Cart::where("owner_id",$ownerId)->first();
        if(!$cart){
            return response()->json([
                "status"=>404,
                "error"=>"The Cart doesnt exist",
            ],404);
        }
        $product=Product::find($productId);
        if(!$product){
            return response()->json([
                "status"=>404,
                "error"=>"The Product doesnt exist",
            ],404);
        }
        $prods= json_decode($cart->products_id, true);
        if(!empty($prods)){
            foreach($prods as $prod=>$value){
                if($prod == $productId){
                    $prods[$prod]["quantity"]-=1;
                    if($prods[$prod]["quantity"] == 0){
                        unset($prods[$prod]); 
                    }
                    
                }
            }
        }else{
            return response()->json([
                "status"=>404,
                "error"=>"The Cart is empty"
            ],404); 
        }
        $cart->products_id=json_encode($prods);
        $cart->cost =  $cart->cost - $product->price;
        $cart->update();
        return response()->json([
            "status"=>200,
            "success"=>"The Product removed succesfuly",
            "cart"=>$cart,
        ],200); 
    }

    public function clear($ownerId){
        $owner=User::find($ownerId);
        if($owner){
            $cart=Cart::find($ownerId);
            $cart->products_id=json_encode([]);
            $cart->cost=0.00;
            $cart->update();
            return response()->json([
                "status"=>200,
                "success"=>"The Cart Cleared Successfuly",
            ],200);
        }else{
            return response()->json([
                "status"=>404,
                "error"=>"The Owner doesnt exist",
            ],404);
        }
    }
    
}
