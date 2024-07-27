<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BoughtItemsController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SubCategoController;
use App\Http\Controllers\WishListController;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Broadcast::routes(['predix' => 'api', 'middleware' => ['auth:api']]);
Route::controller(AuthController::class)->group(function () {
    Route::post('register','register');
    Route::post('login','login');
    Route::post('logout/{id}','logout');
    Route::post('user/{id}','user_data');
    Route::delete('user/{id}/delete','delete_user');
    Route::get('user/{id}/sold_items','sold_items');
    Route::get('user/{id}/purchase_items','purchase_items');
    Route::get('user/{id}/listed_items','get_listed_items');
    Route::get('users','all');
    Route::put('user/makeAdmin/{userId}','makeAdmmin');
});

Route::controller(ProductController::class)->group(function () {
    Route::post('product/create/user/{userId}/cate/{catId}','create'); // to create a product
    Route::get('product/{pordId}','show'); 
    Route::get('product/{pordId}/relatedProds','relatedProds'); 
    Route::put('product/{pordId}/edit','edit'); 
    Route::delete('product/{pordId}/delete','delete');
    Route::get('product/search/{prod:slug}','search');  
    Route::get('product/searchByCat/{categoryName:slug}','searchByCate');  
    Route::get('products','all_prod');   
    Route::get('featuredProds','getFeaturedProd');   
    Route::get('getLatestProds','getLatestProds');   
    Route::get('getHotDealsProds','getHotDealsProds');   
    Route::post('prod/{id}','editRating');   
});
Route::controller(CategoryController::class)->group(function () {
    Route::post('category/create','create');
    Route::get('category/{cateId}','show_items'); 
    Route::put('category/{cateId}/edit','edit'); 
    Route::delete('category/{cateId}/delete','delete');
    Route::get('category/{categoryName:slug}/search/{pordName:slug}','search');  
    Route::get('category/{categoryName:slug}/subcategories','subs');  
    Route::get('categories/randomProducts','productOfRandomCat');  
    Route::get('categories','all');  
});
Route::controller(SubCategoController::class)->group(function () {
    Route::post('subcategory/create/for/{categoryId}','create');
    Route::get('subcategory/{subcateId}','show_items'); 
    Route::patch('subcategory/{subcateId}/edit','edit'); 
    Route::delete('subcategory/{subcateId}/delete','delete');
    Route::get('subcategory/{subcateName:slug}/search/{pordName:slug}','search');  
    Route::get('subcategories','all');  
});
Route::controller(PurchaseController::class)->group(function () {
    Route::post('purchase/{cartId}/to/{buyerId}','create');//always cartId == buyerId
    Route::get('purchase/{purchaseId}','show');
    Route::get('purchase/edit/{purchaseId}','edit');
    // Route::patch('purchase/edit/{purchaseId}','update');
    Route::delete('purchase/{purchaseId}/delete','delete');
    Route::get('purchases','all');  
});
Route::controller(CountryController::class)->group(function () {
    Route::post('coutries/add','add_countries');
    Route::get('coutrie/getMobileCode/{coountry:slug}','get_mobile_code');
    Route::get('coutries/all','all_countries');
});

Route::controller(MessageController::class)->group(function () {
    Route::post('message/create/{senderId}/{receiverId}','create');
    Route::get('message/{user1Id}/{user2Id}','show_conversation');
    Route::get('message/edit/{msgId}','edit');
    Route::patch('message/edit/{msgId}','update');
    Route::delete('message/delete/{msgId}','delete');
});

Route::controller(ReviewController::class)->group(function () {
    Route::post('review/create/{reviewerId}/{prodId}','create');
    Route::get('review/{reviewId}','show');
    Route::get('review/edit/{reviewId}','edit');
    Route::patch('review/edit/{reviewId}','update');
    Route::delete('review/delete/{reviewId}','delete');
});
Route::controller(CartController::class)->group(function () {
    Route::get('cart/{ownerId}','show');
    Route::post('cart/add/{prodId}/to/{ownerId}','add');
    Route::delete('cart/remove/{prodId}/from/{ownerId}/','remove');
    Route::delete('cart/{ownerId}/clear','clear');
});
Route::controller(WishListController::class)->group(function () {
    Route::get('wishlist/{ownerId}','show');
    Route::post('wishlist/add/{prodId}/to/{ownerId}','add_prod');
    Route::delete('wishlist/remove/{prodId}/from/{ownerId}','remove_prod');
    Route::delete('wishlist/{ownerId}/clear','clear');
});
Route::controller(BoughtItemsController::class)->group(function () {
    Route::get('test','test');
    Route::post('wishlist/add/{prodId}/to/{ownerId}','add_prod');
    Route::delete('wishlist/remove/{prodId}/from/{ownerId}','remove_prod');
    Route::delete('wishlist/{ownerId}/clear','clear');
});
Route::controller(FollowerController::class)->group(function () {
    Route::post('user/{followerId}/follow/user/{followedId}','follow');
    Route::delete('user/{followerId}/unfollow/user/{followedId}','unfollow');
    Route::get('user/{followerId}/isfollowing/user/{followedId}','isFollowing');
    Route::get('user/{followerId}/getFollowedUser','getFollowedUsers');
});

