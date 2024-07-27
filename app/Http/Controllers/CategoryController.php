<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function create(Request $request){
        $val=Validator::make($request->all(),[
            "name"=>"required|min:4|unique:categories",
        ]);
        if($val->fails()){
            return response()->json([
                'status'=>402,
                'error'=>$val->messages()
            ],402);
        }else{
            $category=new Category();
            $category->name=$request['name'];
            $category->save();
            return response()->json([
                'message'=>"Category created successfully",
                'category'=>$category,              
            ],200);
        }
    }

    public function show_items($id){
        $category=Category::find($id);

        if(isset($category)){
            $products=DB::table("products")->where('category_id', $id)->get();
            $newprods=$products->toArray();
            shuffle($newprods);
            return response()->json([
                'status'=>200,
                'products'=>$newprods          
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The category doesnt exist."
            ],404);
        }
    }
    public function edit(Request $request,$id){
        $category=Category::find($id);
        if(isset($category)){
            $val=Validator::make($request->all(),[
                "name"=>"required|min:4|unique:categories",
            ]);
            if($val->fails()){
                return response()->json([
                    'status'=>402,
                    'error'=>$val->messages()
                ],402);
            }else{
                $category->name=$request['name'];
                $category->update();
                return response()->json([
                    'message'=>"category updated successfully",
                    'category'=>$category,              
                ],200);
            }
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The category doesnt exist."
            ],404);
        }
    }

    public function delete($id){
        $category=Category::find($id);
        if(isset($category)){
            $category->delete();
            return response()->json([
                'message'=>"category deleted successfully",              
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The category doesnt exist."
            ],404);
        }
    }
    public function search(string $catName,string $prodName){
        $cat=Category::where("name",$catName)->first();
        // return $cat;
        $raws=DB::table("products")
            ->where([["category_id","=",$cat->id],["name","like","%" . $prodName . "%"]])
            ->orWhere([["category_id","=",$cat->id],["brand_name","like","%" . $prodName . "%"]])
            ->get();
        return response()->json([
            "results"=>$raws
        ]);
    }
    function subs(string $catName){
        $category=Category::where("name",$catName)->first();

        if(isset($category)){
            $subs=DB::table("subcategories")->where('category_id', $category->id)->get();
            return response()->json([
                'status'=>200,
                'subs'=>$subs,              
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The category doesnt exist."
            ],404);
        }
    }
    function productOfRandomCat(){
        $records = Product::inRandomOrder()->limit(200)->get();
        if(isset($records)){
            return response()->json([
                'status'=>200,
                'products'=>$records          
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The category doesnt exist."
            ],404);
        }
    }
    function all(){
        $categories=Category::all();
        return response()->json([
            "status"=>200,
            "categories"=>$categories
        ],200);
    }
}
