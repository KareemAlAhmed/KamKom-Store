<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class SubCateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $data=[
            "Laptops" => ["Dell","Lenovo","Asus","HP","Acer","Microsoft","Samsung"],
            "Desktops" =>["Intel", "Asus","HP" ,"Lenovo" ,"Acer" ,"Gigabyte"],
            "Furniture" => ["Coffee Tables","Storages","Master Bedroom Sets","Office Living","Office Chairs","Kids & Single Beds","Fabric Sofas","Master Beds","Dining Tables"],
            "Gaming"=>["Console Games","Console Controllers","Accessories","Video Game Consoles","Wireless Earphones","Keyboards & Mice"],
            "Fashion" =>["Samba Og Sneakers","T-Shirt","Sneakers","Hoodie","Sweatshirt","Rain Boots","Boots","Loafer","Tailored Fit Sports T-Shirt","Logo Polo Shirt","Short Sleeve Tshirt","Tensaur Hook And Loop Sneakers","Jeans","Fur Boots","Jumper","Belt","Tailored Fit Jeep T-Shirt","Short Sleeves T-Shirt","Spray Logo T-Shirt","Polo","Campus 00S Sneakers","Skirt","Trench Coat","Shirt","Fleece Jacket","Embellished Cotton Sweatshirt","Chino Trousers","Organic Cotton T-Shirt","Zipper Jacket","Logo T-Shirt","Dress","Monotype Archive Fit T-Shirt","Short","Heritage Logo T-Shirt","Script Logo T-Shirt","Swim Shorts","Quarter-Zip Short Sleeve Polo Shirt","Crossbody Bag","Stretch Knit Half-Zip Polo Shirt","Plain Shirt","Amr Racing Cap","Embroidered-Logo Baseball Cap","Short Sleeves Polo","Polo Shirt","Flip Flops","Slim Fit Half Zip Polo Shirt","Gilet","Color Block Polo Shirt","Slim Fit Polo Shirt With Logo","Cotton Polo Shirt","Sweat Shorts","Basic T-Shirt","Knitwear","Classic Fit Sport Shorts","Classic Fit Sport Joggers","Windbreaker","Down Jacket","Lux Court Leather Sneakers","Runner Trainers","Leather Sneakers","Shoulder Bag","Jagged Stripe Small Tote Bag","Monogram Contrast Baseball Cap","Leather Belt","City Large Flap Wallet","Signature Tape Small Camera Bag","Buckle Patent Leather Slingback Ballerinas","Iconic Slingback Wedge Sandals","Metallic Pool Slide","Leather Sandals","Monogram Leather Ballerinas","Leather Sneakers With Back Label","Leather Ballerina","Essential Crossbody Bag","Iconic Shoulder Bag","Horsebit Satchel Bag","Satchel Bag","Tote Bag","Monogram Hobo Bag","Essential Handbag","Essential Tote Bag","City Crossover Bag","Zipper Wallet","Essential Logo Bucket Hat","Monogram Contrast Tote Bag","Bodycon Dress","Skinny Jeans","Slit Jeans","T-Shirt Logo","Shorts","5 Pocket Trousers","Cut Out Dress","Reversible Jacket","Faux Leather Mini Skirt","Mid-Rise Cropped Mom Jeans","Monogram Pouch Tote Bag","Wide High Fit Trousers","Monogram Dress","Sequin Dress","Jacket In Boxy Line","Denim Tank Top","Short Sleeves Knitwear","Designed Jeans","Oversize Cropped Denim Jacket","Stretch Twill High Rise Straight Pants","Camera Clutch Bag","Leather Clutch Chain Bag","Laminated Leather Clutch Bag","Leather Crossbody Bag","Logo Hat","Leather Tote Bag","Crossbody Bag 32 x 25 x 11 cm","Leather Handbag","Leather Shoulder Bag","Leather Flat Sandals"],
            "Mobile"=>["Apple","Samsung","Tecno","CAT","Umidigi","Xiaomi","Blackview","Nokia","Infinix","Honor"],
            "Property"=>["Building","Villa","Apartment","Duplex"],
            "Tablet" =>["Samsung","itel","Blackview","Xiaomi","Doogee","Amazon","reMarkable","UGEE","Wacom","Apple","CCIT"],
            "Computer-Parts"=> ["Computer Components","Data and Storage","RAM","System Cooling","CPU","Motherboards","VGA","Power Supply","Case"],
            "Networking"=> ["Fiber and Passive","Business and Enterprise","Home and Small Office","VOIP and PBX","Router"]
        ];

        
        foreach($data as $key=>$value){
            $cat=Category::where("name",$key)->first();
            $id=$cat->id;
            foreach($value as $val){
                $sub=new Subcategory();
                $sub->name=$val;
                $sub->category_id=$id;
                $sub->save();
            }
        
        }
        
    }
}
