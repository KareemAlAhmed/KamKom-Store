<?php

namespace App\Http\Controllers;

use App\Events\Advertise;
use App\Mail\PurchaseCompleted;
use App\Models\Cart;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\isEmpty;

class PurchaseController extends Controller
{

    public function create($cartId,$buyerId){

        $buyer=User::find($buyerId);
        $cart=Cart::find($cartId);
        
        $products=json_decode($cart->products_id);
        if(!$buyer){
            return response()->json([
                "status"=>404,
                "error"=>"The Buyer User Doesnt Exist."
            ],404);
        }
        if(empty($products)){
            return response()->json([
                "status"=>404,
                "error"=>"The Cart is Empty."
            ],404);
        }
        $cost=0.00;
        $sellers=[];
        foreach($products as $prodId=>$value){
            $prod=Product::find($prodId);
            $cost +=  $value->quantity* $prod->price;
            $seller=User::where("id",$value->sellerId)->first();
            $sellers[]=$seller->id;          
        }
            if(($buyer->balance - $cost) >= 0){
                $prch=new Purchase();
                $prch->buyer_id=$buyerId;
                $prch->seller_id=json_encode($sellers);
                $prch->cost=$cost;
                $buyer->balance-= $cost;
                $buyer->update();
                foreach($products as $prodId=>$value){
                    $prod=Product::find($prodId);
                    $seller=User::where("id",$value->sellerId)->first();
                    $soldItem=new SoldItemsController();
                    $soldItem->addToSoldList($value->sellerId,$prodId,$value);
                    $seller->balance=$seller->balance + ($value->quantity* $prod->price);
                    $prod->quantity=$prod->quantity - $value->quantity;
                    $prod->sold_number+=$value->quantity;
                    $seller->update();
                    $prod->update();
                }
                $bought=new BoughtItemsController();
                $bought->addToBoughtList($cartId,$products);
                $prch->products=json_encode($products);
                $cart->products_id=[];
                $cart->cost=0.00;
                $cart->update();
                $idP= $prch->save();
                Mail::to("karimahmad2172@gmail.com")->send(new PurchaseCompleted($products,$buyer,$idP,$cost));
                return response()->json([
                    "status"=>200,
                    "success"=>"The Purchase Created successfully",
                    "purchase"=>$prch
                ],200);
            }else{
                return response()->json([
                    "status"=>402,
                    "error"=>"Insufficient Funds!"
                ],402);  
            }     

    }
  
    
    public function show($purchaseId){
        $prch=Purchase::find($purchaseId);
        if($prch){ 
            return response()->json([
                "status"=>200,
                "purchase"=>$prch
            ]);
        }else{
            return response()->json([
                "status"=>404,
                "error"=>"The Purchase Doesnt Exist."
            ],404);
        }
    }
    // public function edit($purchaseId){
    //     $prch=Purchase::find($purchaseId);
    //     if($prch){ 
    //         return response()->json([
    //             "status"=>200,
    //             "purchase"=>$prch
    //         ]);
    //     }else{
    //         return response()->json([
    //             "status"=>404,
    //             "error"=>"The Purchase Doesnt Exist."
    //         ]);
    //     }
    // }

    // public function update(Request $request,$purchaseId){
    //     $prch=Purchase::find($purchaseId);
    //     $buyer=User::find($prch->buyer_id);
    //     $product=Product::find($prch->product_id);
    //     $seller=User::find($prch->seller_id);
    
    //     if(!$prch){
    //         return response()->json([
    //             "status"=>404,
    //             "error"=>"The Purchase Doesnt Exist.",
    //         ]);
    //     }

    //         $cost= $product->price * (int)$request["quantity"];
    //         $diff=$cost - $prch->cost;
    //         if($diff > 0){
    //             if(($buyer->balance - $diff) >=0){
    //                 $prch->cost=$cost;
    //                 $prch->quantity=(int)$request["quantity"];
    //                 $buyer->balance=$buyer->balance - $diff;
    //                 $seller->balance=$seller->balance + $diff;
    //                 $product->quantity=$product->quantity - (int)$request["quantity"];
    //                 $prch->update();
    //                 $product->update();
    //                 $seller->update();
    //                 $buyer->update();
    //                 return response()->json([
    //                     "status"=>200,
    //                     "success"=>"The Purchase updated successfully",
    //                     "purchase"=>$prch
    //                 ]);
    //             }else{
    //                 return response()->json([
    //                     "status"=>402,
    //                     "error"=>"Insufficient Funds!"
    //                 ]);  
    //             }
    //         }else{
    //             $buyer->balance= $buyer->balance + abs($diff);
    //             $seller->balance= $seller->balance - abs($diff);

    //             $prch->quantity=(int)$request["quantity"];
    //             $prch->cost=$cost;
    //             $product->quantity=$product->quantity - (int)$request["quantity"];
    //             $prch->update();
    //             $product->update();
    //             $buyer->update();
    //             $seller->update();
    //                 return response()->json([
    //                     "status"=>200,
    //                     "success"=>"The Purchase updated successfully",
    //                     "purchase"=>$prch
    //                 ]);
    //         }


        
    // }

    public function delete($prchId){
        $prch=Purchase::find($prchId);
        $buyer=User::find($prch->buyer_id);
        $prods=json_decode($prch->products);
        if($prch){
            $buyer->balance = $buyer->balance + $prch->cost;
            foreach($prods as $prodId=>$value){
                $prod=Product::find($prodId);
                $seller=User::where("id",$value->sellerId)->first();

                $seller->balance=$seller->balance - ($value->quantity* $prod->price);
                $prod->quantity=$prod->quantity + $value->quantity;
                $prod->sold_number-= $value->quantity;
                $seller->update();
                $prod->update();
            }
            $buyer->update();;
            $prch->delete();

            return response()->json([
                "status"=>200,
                "success"=>"The Purchase Deleted successfully",
            ]);
        }else{
            return response()->json([
                "status"=>404,
                "error"=>"The Purchase Doesnt Exist.",
            ],404);
        }
    }
    function all(){
        $purchases=Purchase::all();
        if(isEmpty($purchases)){
            return response()->json([
                "status"=>200,
                "purchases"=>$purchases->toArray()
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"There is no Purchases yet."
            ],404);
        }
    }
}
