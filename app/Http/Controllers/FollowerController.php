<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use App\Models\User;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    public function follow($followerId,$followedId){
        $follower=User::find($followerId);
        $followed=User::find($followedId);
        if(!isset($follower)){
            return response()->json([
                "status"=>404,
                "error"=>"The Follower User Doesnt Exist!"
            ],404);
        }
        if(!isset($followed)){
            return response()->json([
                "status"=>404,
                "error"=>"The Followed User Doesnt Exist!"
            ],404);
        }
        $following=new Follower();
        $following->follower_id=$followerId;
        $following->followed_id=$followedId;
        $following->save();
        return response()->json([
            "status"=>200,
            "message"=>"User ". $followerId ."has followed User " . $followedId
        ],200);
    }

    public function unfollow($followerId,$followedId){
        $follower=User::find($followerId);
        $followed=User::find($followedId);
        if(!isset($follower)){
            return response()->json([
                "status"=>404,
                "error"=>"The Follower User Doesnt Exist!"
            ],404);
        }
        if(!isset($followed)){
            return response()->json([
                "status"=>404,
                "error"=>"The Followed User Doesnt Exist!"
            ],404);
        }
        $following=Follower::where("follower_id",$followerId)->where("followed_id",$followedId)->first();
        if(isset($following)){
            $following->delete();
            return response()->json([
                "status"=>200,
                "message"=>"User ". $followerId ."has unfollowed User " . $followedId
            ],200);
        }else{
            return response()->json([
                "status"=>404,
                "error"=>"User ". $followerId ."is not following User " . $followedId
            ],404);
        }
       
    }
    public function isFollowing($followerId,$followedId){
        $follower=User::find($followerId);
        $followed=User::find($followedId);
        if(!isset($follower)){
            return response()->json([
                "status"=>404,
                "error"=>"The Follower User Doesnt Exist!"
            ],404);
        }
        if(!isset($followed)){
            return response()->json([
                "status"=>404,
                "error"=>"The Followed User Doesnt Exist!"
            ],404);
        }
        $following=Follower::where("follower_id",$followerId)->where("followed_id",$followedId)->first();
        if(isset($following)){
                     
                return True;
        }else{
            return false;
        }
       
    }
    public function getFollowedUsers($followerId){
        $follower=User::find($followerId);
        if(!isset($follower)){
            return response()->json([
                "status"=>404,
                "error"=>"The Follower User Doesnt Exist!"
            ],404);
        }
        $following=Follower::where("follower_id",$followerId)->get();
        if(isset($following)){
            $followeds=[];
            foreach($following as $item){
                $followeds[]=User::find($item->followed_id);
            }
            return $followeds;
        }else{
            return response()->json([
                "status"=>404,
                "error"=>[]
            ],404);
        }
       
    }
}
