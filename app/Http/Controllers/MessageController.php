<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    public function create(Request $request,$senderId,$receiverId){
        $val=Validator::make($request->all(),[
            "content"=>"required|min:3",
        ]);
        if(!User::find($senderId)){
            return response()->json([
                "status"=>404,
                "error"=>"The Sender User Doesnt Exist."
            ]);
        }
        if(!User::find($receiverId)){
            return response()->json([
                "status"=>404,
                "error"=>"The Receiver User Doesnt Exist."
            ]);
        }
        if($val->fails()){
            return response()->json([
                "status"=>402,
                "error"=>$val->messages()
            ]);
        }else{
            $msg=new Message();
            $msg->content=$request["content"];
            $msg->sender_id=$senderId;
            $msg->receiver_id=$receiverId;
            $msg->save();

            return response()->json([
                "status"=>200,
                "success"=>"Message create successfully",
                "msg"=>$msg
            ]);
        }
    }

    public function show_conversation($user1Id,$user2Id){
        // $msg=Message::find($mesgId);

        $raws=DB::table("messages")
        ->where([["sender_id","=",$user1Id],["receiver_id",$user2Id]])
        ->orWhere([["sender_id","=",$user2Id],["receiver_id",$user1Id]])
        ->orderByRaw('created_at')
        ->get();

        return $raws;
        // if($msg){ 
        //     return response()->json([
        //         "status"=>200,
        //         "msg"=>$msg
        //     ]);
        // }else{
        //     return response()->json([
        //         "status"=>404,
        //         "error"=>"The Message Doesnt Exist."
        //     ]);
        // }
    }
    public function edit($mesgId){
        $msg=Message::find($mesgId);
        if($msg){ 
            return response()->json([
                "status"=>200,
                "msg"=>$msg
            ]);
        }else{
            return response()->json([
                "status"=>404,
                "error"=>"The Message Doesnt Exist."
            ]);
        }
    }

    public function update(Request $request,$mesgId){
        $msg=Message::find($mesgId);

        $val=Validator::make($request->all(),[
            "content"=>"required|min:3",
        ]);
        if(!$msg){
            return response()->json([
                "status"=>402,
                "error"=>"The Message Doesnt Exist.",
            ]);
        }
        if($val->fails()){
            return response()->json([
                "status"=>402,
                "error"=>$val->messages()
            ]);
        }else{
            $msg->content=$request["content"];
            $msg->update();

            return response()->json([
                "status"=>200,
                "success"=>"Message updated successfully",
                "msg"=>$msg
            ]);
        }
    }
    public function delete($mesgId){
        $msg=Message::find($mesgId);
        if($msg){
            $msg->delete();
            return response()->json([
                "status"=>200,
                "success"=>"Message Deleted successfully",
            ]);
        }else{
            return response()->json([
                "status"=>402,
                "error"=>"The Message Doesnt Exist.",
            ]);
        }
    }
}
