<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\Subcategory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\isEmpty;

class ProductController extends Controller
{
    public function create(Request $request,$userId){
        $val=Validator::make($request->all(),[
            "name"=>"required|min:4|unique:products",
            "brand"=>"required|min:4",
            "description"=>"required|min:10",
            "price"=>"required|numeric|gt:0",
            "quantity"=>"required|numeric|gt:0",  
            // "thumbnail_url"=>"required|min:3",
            "category"=>"required|numeric|gt:0",
            // "subcategory_id"=>"required|ge:0" 
        ]);
        $images=json_decode($request["images_url"]);
        $images_urls=[];
        foreach($images as $key=>$img){
            array_push($images_urls,$img);
        }

        if(!isset($images_urls)){
            return response()->json([
                'status'=>402,
                'error'=>"There should be at least one image."
            ],402);
        }else{
            foreach($images_urls as $img){
                $val2=Validator::make($images_urls,[
                    "min:4"
                ]);
                if($val2->fails()){
                    return response()->json([
                        'status'=>402,
                        'error'=>$val->messages()
                    ],402);
                }
            }
        }

        if($val->fails()){
            return response()->json([
                'status'=>402,
                'error'=>$val->messages()
            ],402);
        }else{
            $cat=Category::find($request['category']);
            if(isset($cat)){
                $prod=new Product();
                $prod->name=$request['name'];
                $prod->brand_name=$request['brand'];
                $prod->price=$request['price'];
                $prod->quantity=$request['quantity'];
                $prod->images_url=json_encode($images_urls);
                $prod->thumbnail_url=$images_urls[0];
                $prod->description=$request['description'];           
                $prod->category_id=$request['category'];
                // $prod->subcategory_id=(int)$request['subcategory_id'];
                $prod->user_id=$userId;
                $prod->save();
                return response()->json([
                    'message'=>"Product created successfully",
                    'product'=>$prod,              
                ],200);
            }else{
                return response()->json([
                    'status'=>404,
                    'error'=>"The Category or SubCategory doesnt exist."
                ],404);
            }
        }
    }

    public function show($id){
        $product=Product::find($id);
        if(isset($product)){
            $product->reviewList=$product->reviews;
            $product->owner=User::find($product->user_id);
            return response()->json([
                'status'=>200,
                'product'=>$product,              
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The Product doesnt exist."
            ],404);
        }
    }
    public function relatedProds($id){
        $cateID=Product::find($id)->category_id;
        $relatedProds=Product::where("category_id",$cateID)->where("id", "<>", $id)->get();
        if(isset($cateID)){
            return response()->json([
                'status'=>200,
                'relatedProds'=>array_slice($relatedProds->toArray(),0,6),              
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The Product doesnt exist."
            ],404);
        }
    }
    public function edit(Request $request,$id){
        $prod=Product::find($id);
        if(isset($prod)){
            $val=Validator::make($request->all(),[
                "name"=>"required|min:4|unique:products",
                "brand"=>"required|min:4",
                "quantity"=>"required|numeric|gt:0",  
                "price"=>"required|numeric|gt:0",
                "thumbnail_url"=>"required|min:3",
                "description"=>"required|min:10",
            ]);
            if($val->fails()){
                return response()->json([
                    'status'=>402,
                    'error'=>$val->messages()
                ],402);
            }else{
                $prod->name=$request['name'];
                $prod->brand=$request['brand'];
                $prod->price=$request['price'];
                $prod->quantity=$request['quantity'];
                $prod->description=$request['description'];
                $prod->images_url=json_encode($request['images_url']);
                $prod->thumbnail_url=$request['thumbnail_url'];
                $prod->category_id=(int)$request['category_id'];
                $prod->subcategory_id=(int)$request['subcategory_id'];
                $prod->update();

                return response()->json([
                    'message'=>"Product updated successfully",
                    'product'=>$prod,              
                ],200);
            }
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The Product doesnt exist."
            ],404);
        }
    }

    public function delete($id){
        $prod=Product::find($id);
        if(isset($prod)){
            $prod->delete();
            return response()->json([
                'message'=>"Product deleted successfully",              
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The Product doesnt exist."
            ],404);
        }
    }

    public function all_prod(){
        $prods=Product::all();
        if(isEmpty($prods)){
            return response()->json([
                "status"=>200,
                "prods"=>$prods
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"There is no Product yet."
            ],404);
        }
    }

    public function test(Request $request){
        if($request->hasFile('file')){      
            $request->file->storeAs('public/UserProfilePic', $request->file->getClientOriginalName());
        }
        return true;
    }
    public function searchByCate(string $catName){
        $cat=Category::where('name',$catName)->first();
        if(isset($cat)){
            return response()->json([
                "status"=>200,
                "prods"=>Product::where('category_id',$cat->id)->get()
            ],200);
        }else{
            return response()->json([
                "status"=>404,
                "error"=>"The Wanted Category Doesnt Exist!"
            ],404);
        }
    }
    function getFeaturedProd(){
        $cats=Category::all();
        $bestSellingProds=[];
        for($i=0;$i<6;$i++){
            $prod=$cats[$i]->products;
            array_push($bestSellingProds,$prod[0]);
            array_push($bestSellingProds,$prod[1]);
        }

        $productModelLatest = Product::orderBy('created_at', 'desc')->get();
        $latestProds=[];
        $j=0;
        foreach($productModelLatest as $prod){
            if($j<12){
                array_push($latestProds,$prod);
                $j++;
            }
        }


        $productModelNew = Product::orderBy('created_at', 'asc')->get();
        $newProds=[];

        $j=0;
        foreach($productModelNew as $prod){
            if($j<12){
                array_push($newProds,$prod);
                $j++;
            }
        }
        $highestPriceProd = Product::orderBy('price', 'desc')->where("category_id",1)->get();
        $highestPriceP=[];

        $j=0;
        foreach($highestPriceProd as $prod){
            if($j<2){
                array_push($highestPriceP,$prod);
                $j++;
            }
        }
        return [
            "bestSelling"=> $bestSellingProds,
            "latestProd"=> $latestProds,
            "newestProd"=>$newProds,
            "highestPriceProd"=>$highestPriceP
        ];
        
    }
    function editRating($id){
        $product=Product::where("category_id",$id)->get();
        foreach($product as $prod){
            $prod->rating=(float)$id;
            $prod->update();
        }
    }
    function getLatestProds(){
        $products = Product::orderBy('created_at', 'desc')->limit(60)->get();
        return response()->json([
            "status"=>200,
            "prods"=>$products
        ],200);
    }
    function getHotDealsProds(){
        $cats=Category::all();
        $prods=[];
        for($i=0;$i<12;$i++){
            if($cats[$i]->id != 10){
                $prod=$cats[$i]->products;
                for($j=0;$j<10;$j++){
                    array_push($prods,$prod[$j]);
                }
            }
        }
        $prod=collect($prods)->shuffle();
        return response()->json([
            "status"=>200,
            "prods"=>$prod->toArray()
        ],200);
    }
    function getSumOfUserProds($id){
        $products=Product::where("user_id",$id)->get();
        return array_slice($products->toArray(),6);
    }

}
