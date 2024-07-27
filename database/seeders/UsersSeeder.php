<?php

namespace Database\Seeders;

use App\Http\Controllers\BoughtItemsController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\SoldItemsController;
use App\Http\Controllers\WishListController;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
     $users=["karim ahmad","Ashraf Hariri","Mostafa Jaafar","Rifaat Abou Dehn","Al Amir Motors","Amir Maatouk","Rawad Nasr","AlSaadi Motors Group","Mohamad Kassab","Rawad Shamout","Al assd","Khalil Debs","Abbas Sleiman","Abou Majd Motors","Piere Khoury","Haddad Motors","Romeo Louka","Alaa Ezzedine","Masters Car","Toufic Aadas","Louay Khalil","Wassim Alsayegh","Ale Almousawi","Expo Alalam","Khalil Auto center","Riad Alameddine","Walid Baradei","ABC Mall",
            "Samsung","itel","Blackview","Xiaomi","Doogee","Amazon","reMarkable","UGEE","Wacom","Apple","CCIT","Beiteck","Animals Lebanon","Tech Zone","Tecno","CAT","Umidigi","Nokia","Infinix","Honor","Dell","Lenovo","Asus","HP","Acer","Microsoft","Sony","Nintendo","Monster","GameStop","HyperX","Green Lion","MobileTOp","Intel","Gigabyte"];

        // $contents = Storage::get('./data/desktop.json');
        // $data=[];
        // $exist=[];
        // $contents=json_decode($contents);
        
        // // foreach($contents as $prod){
        // //     $specs=json_decode($prod['specs']);
        // //     $product=new Product();
        // //     $product->name=$prod['name'];
        // //     $product->brand_name=$specs['Vendor'];
        // //     $product->price=$prod['price'];
        // //     $product->quantity=10;
        // //     $product->images_url=$specs['Images_url'];
        // //     $product->thumbnail_url=$prod['thumbnail_url'];
        // //     unset($specs['Images_url']);
        // //     unset($specs['Vendor']);
        // //     $product=$specs;
        // // }
        // foreach($contents as $prod){
        //     // $specs=json_decode($prod);
        //     // $product=new Product();
        //     // $product->name=$prod->name;
        //     // $product->brand_name=$prod->ProductType;
        //     // // $product->price=$prod['price'];
        //     // // $product->quantity=10;
        //     // // $product->images_url=$specs['Images_url'];
        //     // // $product->thumbnail_url=$prod['thumbnail_url'];
        //     // // unset($specs['Images_url']);
        //     // // unset($specs['Vendor']);
        //     // // $product=$specs;
        //     if (!in_array($prod->Vendor, $exist) && !in_array($prod->Vendor, $users)) {
        //         array_push($exist,$prod->Vendor);
        //         // $data["Fashion"][]=$product->brand_name;
        //     } 
           
        // }
        
        // print_r($exist);
        // // print_r($data);
        // $file = fopen("example.json", "w");
        // $dat=json_encode($exist);
        // fwrite($file, $dat);
        // fclose($file);
        foreach($users as $name){
            $user=new User();
            $user->fullName=$name;
            $user->bio="Hey there, fellow KamKom shopper! I'm " . $name .", and I've got some really cool stuff for you here at KamKom Store.";
            $user->email= str_replace(' ', '', $name)."@gmail.com";
            $user->password=bcrypt("81258136");
            $user->balance=10000.00;
            $user->kamkom_number=rand(100000, 999999);
            $user->country="Lebanon";
            $user->streetAddress="Lebanon,beyrouth";
            $user->isAdmin=false;
            $user->city="Beyrouth";
            $current_time = date("Y-m-d H:i:s");
            $user->email_verified_at=$current_time;
            $user->save();
            $token=$user->createToken('myapptoken')->plainTextToken;
            $id=User::where("fullName",$name)->first()->id;
            $cart=new CartController();
            $cart->create($id);
            $wishlist=new WishListController();
            $wishlist->create($id);
            $boughtListC=new BoughtItemsController();
            $boughtListC->create($id);
            $soldListC=new SoldItemsController();
            $soldListC->create($id);
        }
    }
}
