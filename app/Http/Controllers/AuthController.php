<?php

namespace App\Http\Controllers;

use App\Models\BoughtItems;
use App\Models\Cart;
use App\Models\Product;
use App\Models\SoldItems;
use App\Models\User;
use App\Models\WishList;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use PHPUnit\Framework\Constraint\IsEmpty;

use stdClass;
use function PHPUnit\Framework\isEmpty;

class AuthController extends Controller
{
    public function register(Request $request){
        
        $val=FacadesValidator::make($request->all(),[
            'firstName'=>'required|min:3',
            'secondName'=>'required|min:3',
            'bio'=>'min:5',
            'email'=>'required|min:7|email|unique:users',
            "password"=>'required|min:5',
            "country"=>'required|min:3',
            "streetAddress"=>'required|min:5',
            "city"=>'required|min:3',
            "image_url"=>'min:3',

        
        ]);

        if($val->fails()){
            return response()->json([
                'status'=>402,
                'error'=>$val->messages()
            ],402);
        }else{
            $user=new User();
            $user->fullName=$request['firstName'] . " " . $request['secondName'];
            if(isset($request['bio'])){
                $user->bio=$request['bio'];
            }else{
                $user->bio="Hey there, fellow KamKom shopper! I'm " . $user->fullName .", and I've got some really cool stuff for you here at KamKom Store.";
            }
            $user->email=$request['email'];
            $user->password=bcrypt($request['password']);
            $user->balance=5000.00;
            $user->kamkom_number=rand(10000000, 99999999);
            $user->country=$request['country'];
            $user->streetAddress=$request['streetAddress'];
 
            $user->city=$request['city'];
            
            // if($request->hasFile('image_url')){
            //     $user->image_url=$request->image_url->getClientOriginalName();   
            //     $request->image_url->storeAs('public/UserProfilePic',$user->image_url);
            // }
            $user->image_url= $request["image_url"];

            $current_time = date("Y-m-d H:i:s");
            $user->email_verified_at=$current_time;
            $user->save();
            $id=$user->id;
            $cart=new CartController();
            $newcart=$cart->create($id);
            $wishlist=new WishListController();
            $newwishlist=$wishlist->create($id);
            $boughtListC=new BoughtItemsController();
            $boughtList=$boughtListC->create($id);
            $soldListC=new SoldItemsController();
            $soldItems=$soldListC->create($id);
            $token=$user->createToken('myapptoken')->plainTextToken;
            $data=[$user,$token];

            return response()->json([
                'status'=>200,
                'message'=>"User created successfully",
                'user'=>$data,       
                'cart'=>$newcart,
                'wishlist'=>$newwishlist ,
                "boughtItems"=>$boughtList,
                "soldItems"=>$soldItems,
                "followedUsers"=>[]
            ],200);

        }
    }

    public function login(Request $request){
        $user=User::where('email',$request['email'])->first();
        $cart= new CartController();
        if(!$user || !Hash::check($request['password'],$user->password)){
            return response()->json([
                'status'=>402,
                'error'=>"Your credentials are incorrect."
            ],402);
        }else{
            $token=$user->createToken('myapptoken')->plainTextToken;
            $followedUsers=new FollowerController();
            $user->followedUsers=$followedUsers->getFollowedUsers($user->id);
            // $followedProds=[];
            // if(count($user->followedUsers) != 0){
            //     $prodC=new ProductController();
            //     foreach($user->followedUsers as $followed){
            //         $followedProds = array_merge($followedProds, $prodC->getSumOfUserProds($followed->id));
            //     }
            // }     
            // $user->followedUsersProds=$followedProds;
            return response()->json([
                'status'=>200,
                'message'=>"You login successfully",
                'user'=>[$user,$token],
                'cart'=>$cart->show($user->id),
                'wishlist'=>WishList::find($user->id),
                "boughtItems"=>BoughtItems::where("owner_id",$user->id)->first(),
                "soldItems"=>SoldItems::where("owner_id",$user->id)->first()
            ],200);
        }
    }
    public function logout($id){
        $user=User::find($id);
        $user->tokens()->delete();
        return response()->json([
            'status'=>200,
            "message"=>"User logout successfully"
        ],200);
    }

    public function user_data($id,Request $request){
        $user=User::find($id);
        $user->prodsNumber=count($user->products);
        $user->prods=$user->products;
        $soldItemC=new SoldItemsController();
        $user->soldItems=$soldItemC->getSoldItems($id);
        $boughtItemC=new BoughtItemsController();
        $user->boughtItems=$boughtItemC->getBoughtitems($id);
        $followedUser=new FollowerController();
        $user->isFollowed=false;
        if($request['currentUserId'] != null){
            $user->isFollowed=$followedUser->isFollowing((int)$request['currentUserId'],$id);
        }
        if($user){
            return response()->json([
                'status'=>200,
                'user'=>$user
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"User Doesnt exist."
            ],404);
        }
    }

    public function update_user(Request $request,$id){
        $user=User::find($id);
        if($user){
            $val=FacadesValidator::make($request->all(),[
                'firstName'=>'required|min:3',
                'secondName'=>'required|min:3',
                'bio'=>'min:15',
                'email'=>'required|min:7|email|unique:users',
                "password"=>'required|min:5',
                "country"=>'required|min:3',
                "streetAddress"=>'required|min:16',

                "city"=>'required|min:3',
                "image_url"=>'min:3',

            ]);
    
            if($val->fails()){
                return response()->json([
                    'status'=>402,
                    'error'=>$val->messages()
                ],402);
            }else{
                $user->fullName=$request['firstName'] . " " . $request['secondName'];
                if(isset($request['bio'])){
                    $user->bio=$request['bio'];
                }else{
                    $user->bio="Hey there, fellow KamKom shopper! I'm " . $user->fullName .", and I've got some really cool stuff for you here at KamKom Store.";
                }
                $user->email=$request['email'];
                $user->password=bcrypt($request['password']);
                $user->country=$request['country'];
                $user->streetAddress=$request['streetAddress'];

                $user->city=$request['city'];
                
                if($request->hasFile('image_url')){
                    $user->image_url=$request->image_url->getClientOriginalName();   
                    $request->image_url->storeAs('public/UserProfilePic',$user->image_url);
                }
    
      
                $id=$user->update();
               
    
                return response()->json([
                    'status'=>200,              
                    'message'=>"User Data Updated successfully",
                ],200);
    
            }
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The User Doesnt Exist."
            ],404);
        }
    }

    public function delete_user($id){
        $user=User::find($id);
        if($user){
            $user->delete();
            return response()->json([
                "status"=>200,
                "message"=>"The User Deleted Successfuly."
            ,200]);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The User Doesnt Exist."
            ],404);
        }
    }


    public function sold_items(int $id){
        $user=User::find($id);
        if($user){
            $listIds=$user->sales;
            $items=array();
            foreach($listIds as $item){
                if($item['status'] == "completed"){
                    $items[]=Product::find($item['product_id']);
                }
            }
            return response()->json([
                'status'=>200,
                'items'=>$items
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The User Doesnt Exist."
            ],404);
        }
    }
    public function purchase_items(int $id){
        $user=User::find($id);
        if($user){
            $purchases=$user->purchases;
            $items=array();
            foreach($purchases as $purch){
                $listProd=json_decode($purch->products);
                
                foreach($listProd as $id=>$value){
                    $items[]=["productDetail"=>Product::find($id),"quantity"=>$value->quantity];       
                }
                
            }
            return response()->json([
                'status'=>200,
                'items'=>$items],200);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The User Doesnt Exist."
            ],404);
        }
    }
    
    public function get_listed_items($id){
        $user=User::find($id);
        if($user){
            $items=$user->products;
            
            return response()->json([
                "status"=>200,
                'items'=>$items],200);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The User Doesnt Exist."
            ],404);
        }
    }
 
    function all(){
        $users=User::all();
        if(count($users) > 0){
            return response()->json([
                "status"=>200,
                "users"=>$users
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"There is no Users yet."
            ],404);
        }
    }
    function makeAdmin($userId){
        $user=User::find($userId);
        if($user){
            $user->isAdmin=true;
            $user->update();
            return response()->json([
                "status"=>200,
                "message"=>"The User " . $user->fullName ." Is Admin Now"
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'error'=>"The User Doesnt Exist."
            ],404);
        }
    }
}
