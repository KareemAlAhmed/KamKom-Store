
import { GET_USER,REGISTERING_USER,REGISTERING_USER_SUCCESS,REGISTERING_USER_FAILED, LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, ADDING_PRODUCT_TO_CART, ADDING_PRODUCT_TO_CART_SUCCESSED, ADDING_PRODUCT_TO_CART_FAILED, PURCHASING_CART, PURCHASE_CART_SUCCESSED, PURCHASE_CART_FAILED, LOGOUT_USER, FETCH_USER_INFO, FETCH_USER_INFO_SUCCESSED, FETCH_USER_INFO_FAILED, FOLLOW_USER, FOLLOW_USER_SUCCESSED, FOLLOW_USER_FAILED, UNFOLLOW_USER, UNFOLLOW_USER_SUCCESSED, UNFOLLOW_USER_FAILED, GET_ALL_PURCHASES, GET_ALL_PURCHASES_SUCCESSED, GET_ALL_PURCHASES_FAILED, GET_ALL_USERS, GET_ALL_USERS_SUCCESSED, GET_ALL_USERS_FAILED, DELETE_USER, DELETE_USER_SUCCESSED, DELETE_USER_FAILED } from "./actionsType";


const initalState={
    loading:false,
    list_user:[],
    fetchUsersError:'',
    currentUser:JSON.parse(sessionStorage.getItem("user-auth")),
    currentUserId: JSON.parse(sessionStorage.getItem("user-auth")) != null ? JSON.parse(sessionStorage.getItem("user-auth"))[0].id : null,
    currentUserError:"",
    userCart:JSON.parse(sessionStorage.getItem("user-cart")),
    userWishlist:JSON.parse(sessionStorage.getItem("user-wishlist")),
    purchaseError:"",
    purchaseSuccessed:false,
    currentViewedUser:JSON.parse(sessionStorage.getItem("current-viewed-user")),
    currentViewedUserError:"",
    allPurchases:JSON.parse(sessionStorage.getItem("all-purchases")),
    allUsers:JSON.parse(sessionStorage.getItem("all-users")),
   
}

const userReducer=(state=initalState,action)=>{
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                loading:true
            }
        case REGISTERING_USER:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case REGISTERING_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                currentUser:action.payload.user,
                currentUserId:action.payload.user[0].id,
                // userCart:action.payload.cart,
                // userWishlist:action.payload.wishlist,
 
                userCart:action.payload.cart,
                allProds:action.payload.allProds

            }
        case REGISTERING_USER_FAILED:
            return {
                ...state,
                loading:false,
                currentUser:{},
                currentUserError:action.payload
            }
        case LOGIN_USER:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                currentUser:action.payload.user,
                currentUserId:action.payload.user[0].id,
                userCart:action.payload.cart,
                allProds:action.payload.allProds
            }
        case LOGIN_USER_FAILED:
            return {
                ...state,
                loading:false,
                currentUser:{},
                currentUserError:action.payload
            }
        case ADDING_PRODUCT_TO_CART:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case ADDING_PRODUCT_TO_CART_SUCCESSED:
            return {
                ...state,
                loading:false,
                userCart:action.payload
            }
        case ADDING_PRODUCT_TO_CART_FAILED:
            return {
                ...state,
                loading:false,
                userCart:action.payload
            }
        case PURCHASING_CART:
            return {
                ...state,
                loading:true,
                purchaseError:""
            }
        case PURCHASE_CART_SUCCESSED:
            return {
                ...state,
                loading:false,
                userCart:JSON.stringify([]),
                purchaseError:"",
                purchaseSuccessed:true
            }
        case PURCHASE_CART_FAILED:
            return {
                ...state,
                loading:false,
                purchaseError:action.payload
            }
        case "purchaseFinished":
            return {
                ...state,
                purchaseSuccessed:false
            }
        case LOGOUT_USER:
            return {
                ...state,
                currentUser:null,
                currentUserId:null,
            }
            case FETCH_USER_INFO:
                return {
                    ...state,
                    loading:true,
                }
            case FETCH_USER_INFO_SUCCESSED:
                return {
                    ...state,
                    loading:false,
                    currentViewedUser:action.payload,
                }
            case FETCH_USER_INFO_FAILED:
                return {
                    ...state,
                    loading:false,
                    currentViewedUser:{},
                    currentViewedUserError:action.payload
                }
            case FOLLOW_USER:
                return {
                    ...state,
                    loading:true,
                }
            case FOLLOW_USER_SUCCESSED:
                return {
                    ...state,
                    loading:false,
                    currentUser:action.payload,
                }
            case FOLLOW_USER_FAILED:
                return {
                    ...state,
                    loading:false,
                    currentViewedUserError:action.payload
                }
            case UNFOLLOW_USER:
                return {
                    ...state,
                    loading:true,
                }
            case UNFOLLOW_USER_SUCCESSED:
                return {
                    ...state,
                    loading:false,
                    currentUser:action.payload,
                }
            case UNFOLLOW_USER_FAILED:
                return {
                    ...state,
                    loading:false,
                    currentViewedUserError:action.payload
                }
            case GET_ALL_PURCHASES:
                return {
                    ...state,
                    loading:true,
                }
            case GET_ALL_PURCHASES_SUCCESSED:
                return {
                    ...state,
                    loading:false,
                    allPurchases:action.payload,
                }
            case GET_ALL_PURCHASES_FAILED:
                return {
                    ...state,
                    loading:false,
                    allPurchases:[]
                }
            case GET_ALL_USERS:
                return {
                    ...state,
                    loading:true,
                }
            case GET_ALL_USERS_SUCCESSED:
                return {
                    ...state,
                    loading:false,
                    allUsers:action.payload,
                }
            case GET_ALL_USERS_FAILED:
                return {
                    ...state,
                    loading:false,
                    allUsers:[]
                }
            case DELETE_USER:
                return {
                    ...state,
                    loading:true,
                }
            case DELETE_USER_SUCCESSED:
                return {
                    ...state,
                    loading:false,
                    allUsers:action.payload,
                }
            case DELETE_USER_FAILED:
                return {
                    ...state,
                    loading:false,
                    allUsers:[]
                }
            

        default: return state
    }
}

export default userReducer;