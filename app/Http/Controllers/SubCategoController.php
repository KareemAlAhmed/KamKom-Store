<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SubCategoController extends Controller
{
    public function create(Request $request,$catId){
        if(!Category::find($catId)){
            return response()->json([
                'status'=>404,
                'error'=>"The Category Added doesnt exist."
            ],404);
        }
        $val=Validator::make($request->all(),[
            "name"=>"required|min:4|unique:subcategories",
        ]);
        if($val->fails()){
            return response()->json([
                'status'=>402,
                'error'=>$val->messages()
            ],402);
        }else{
            $subcategory=new Subcategory();
            $subcategory->name=$request['name'];
            $subcategory->category_id=$catId;
            $subcategory->save();
            return response()->json([
                'status'=>200,
                'message'=>"The Subcategory created successfully",
                'subcategory'=>$subcategory,              
            ],200);
        }
    }

    public function show_items($id){
        $subcategory=Subcategory::find($id);
        if(isset($subcategory)){
            $products=DB::table("products")->where('subcategory_id', $id)->get();
            return response()->json([
                'status'=>200,
                'products'=>$products,              
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The Subcategory doesnt exist."
            ],404);
        }
    }
    public function edit(Request $request,$id){
        $subcategory=Subcategory::find($id);
        if(isset($subcategory)){
            $val=Validator::make($request->all(),[
                "name"=>"required|min:4|unique:subcategories",
            ]);
            if($val->fails()){
                return response()->json([
                    'status'=>402,
                    'error'=>$val->messages()
                ],402);
            }else{
                $subcategory->name=$request['name'];
                $subcategory->update();
                return response()->json([
                    'status'=>200,
                    'message'=>" The SubCategory Updated Successfully",
                    'subcategory'=>$subcategory,              
                ],200);
            }
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The SubCategory Wanted doesnt exist."
            ],404);
        }
    }

    public function delete($id){
        $subcategory=Subcategory::find($id);
        if(isset($subcategory)){
            $subcategory->delete();
            return response()->json([
                'status'=>200,
                'message'=>"The SubCategory deleted successfully",              
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The SubCategory doesnt exist."
            ],404);
        }
    }
    public function search(string $subcat,string $prodName){
        $subcat=Subcategory::where("name",$subcat)->first();
        if($subcat){
            $products=DB::table("products")
            ->where([["subcategory_id","=",$subcat->id],["name","like","%" . $prodName . "%"]])
            ->orWhere([["subcategory_id","=",$subcat->id],["brand_name","like","%" . $prodName . "%"]])
            ->get();
            return response()->json([
                "status"=>200,
                "products"=>$products
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The SubCategory Wanted doesnt exist."
            ],404);
        }
    }
    function all(){
        $subcategories=Subcategory::all();
        return response()->json([
            "status"=>200,
            "subcategories"=>$subcategories
        ],200);
    }
}
