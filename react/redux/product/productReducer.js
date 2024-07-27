import { FETCH_FEATURED_PRODUCTS_FAILED, FETCH_FEATURED_PRODUCTS_SUCCEED, FETCH_PRODUCTS, FETCH_PRODUCTS_FAILED, FETCH_PRODUCTS_SUCCEED, GET_PRODUCT_INFO, GET_PRODUCT_INFO_FAILED, GET_PRODUCT_INFO_SUCCESSED, GET_RELATED_PRODUCT, GET_RELATED_PRODUCT_FAILED, GET_RELATED_PRODUCT_SUCCESSED, GET_CATEGORY_PRODUCTS, GET_CATEGORY_PRODUCTS_FAILED, GET_CATEGORY_PRODUCTS_SUCCESSED, REMOVE_CURRENT_PRODUCT, GET_LATEST_PRODUCTS, GET_LATEST_PRODUCTS_SUCCESSED, GET_LATEST_PRODUCTS_FAILED, GET_HOTDEALS_PRODUCTS, GET_HOTDEALS_PRODUCTS_SUCCESSED, GET_HOTDEALS_PRODUCTS_FAILED, ADD_REVIEW_SUCCESSED, DELETE_REVIEW, DELETE_REVIEW_SUCCESSED, DELETE_REVIEW_FAILED, EDIT_REVIEW, EDIT_REVIEW_SUCCESSED, EDIT_REVIEW_FAILED, DELETE_PRODUCT, DELETE_PRODUCT_SUCCESSED, DELETE_PRODUCT_FAILED } from "./actionType.js";
import { DELETE_PROD } from "./productAction.js";


const initalState={
    loading:false,
    products:[],
    bestSelling:[],
    latestProds:[],
    newestProds:[],
    highestPriceProds:[],
    currentViewedProd:JSON.parse(sessionStorage.getItem("current-viewed-prod")),
    relatedProdToCurrentProd:JSON.parse(sessionStorage.getItem("related-prods-to-current-prod")),
    relatedProdSuccessed:false,
    wantedCategoryProds:sessionStorage.getItem("items-searched") != null ? JSON.parse(sessionStorage.getItem("items-searched")) : [],
    latestProdswanted:sessionStorage.getItem("latestProds") != null ? JSON.parse(sessionStorage.getItem("latestProds")) : [],
    hotDealsProds:sessionStorage.getItem("hot-deals-prods") != null ? JSON.parse(sessionStorage.getItem("hot-deals-prods")) : [],
    filteredProds:sessionStorage.getItem("items-searched-filtered") != null ? JSON.parse(sessionStorage.getItem("items-searched-filtered")) : [],
    filterActive:false,
    error:"",
    allProds:JSON.parse(sessionStorage.getItem("allProds"))
}

const productReducer=(state=initalState,action) =>{
    switch(action.type){
        case FETCH_PRODUCTS:
            return {
                ...state,
                loading:false
            };
        case FETCH_PRODUCTS_SUCCEED:
            return{
                ...state,
                loading:false,
                products:action.payload
            }
        case FETCH_PRODUCTS_FAILED:
            return{
                ...state,
                loading:false,
                products:[],
                error:action.payload
            }
        case FETCH_FEATURED_PRODUCTS_SUCCEED:
                return{
                    ...state,
                    loading:false,                  
                    bestSelling:action.payload.bestSelling,
                    latestProds:action.payload.latestProd,
                    newestProds:action.payload.newestProd,
                    highestPriceProds:action.payload.highestPriceProd,
                }
        case FETCH_FEATURED_PRODUCTS_FAILED:
            return{
                ...state,
                loading:false,
                bestSelling:[],
                latestProds:[],
                newestProds:[],
                highestPriceProds:[],
                error:action.payload
            }
            case GET_PRODUCT_INFO:
            return {
                ...state,
            };
        case GET_PRODUCT_INFO_SUCCESSED:
            return{
                ...state,
                loading:true,
                currentViewedProd:action.payload,
                relatedProdSuccessed:true
            }
        case GET_PRODUCT_INFO_FAILED:
            return{
                ...state,
                loading:false,
                currentViewedProd:{},
                error:action.payload
            }
            case GET_RELATED_PRODUCT:
                return {
                    ...state,
                };
            case GET_RELATED_PRODUCT_SUCCESSED:
                return{
                    ...state,

                    relatedProdToCurrentProd:action.payload
                }
            case GET_RELATED_PRODUCT_FAILED:
                return{
                    ...state,
                    loading:false,
                    relatedProdToCurrentProd:[],
                    error:action.payload
                }
            case GET_CATEGORY_PRODUCTS:
                return {
                    ...state,
                    loading:true,
                    filterActive: false

                };
            case GET_CATEGORY_PRODUCTS_SUCCESSED:
                if(action.filer){

                    sessionStorage.setItem("items-searched-filtered",JSON.stringify(action.payload))
                    return{
                        ...state,
                        loading:false,                     
                        filteredProds: action.payload,
                        filterActive: !state.filterActive
                    }
                }else{
                    if(sessionStorage.getItem("items-searched") == null || action.specificCat){
                        sessionStorage.setItem("items-searched",JSON.stringify(action.payload))
                        sessionStorage.setItem("items-searched-filtered", sessionStorage.getItem("items-searched"))
                        sessionStorage.getItem("minPriceRange") != null ? null : sessionStorage.removeItem("minPriceRange")
                        sessionStorage.getItem("maxPriceRange") != null ? null : sessionStorage.removeItem("maxPriceRange")
                        return{
                            ...state,
                            loading:false,
                            filteredProds:action.payload, 
                            wantedCategoryProds:action.payload,
                            filterActive: !state.filterActive
                        }
                    }else{
                        return{
                            ...state,
                            loading:false,
                            filteredProds:JSON.parse(sessionStorage.getItem("items-searched")), 
                            wantedCategoryProds:JSON.parse(sessionStorage.getItem("items-searched")),
                            filterActive: !state.filterActive
                        }
                    }
                    
                }
          
            case GET_CATEGORY_PRODUCTS_FAILED:
                return{
                    ...state,
                    loading:false,
                    wantedCategoryProds:[],
                    error:action.payload
                }
                case GET_LATEST_PRODUCTS:
                    
                    return{
                        ...state,
                        loading:true,

                    }
                    case GET_LATEST_PRODUCTS_SUCCESSED:
                        if(sessionStorage.getItem("latestProds") == null){
                            sessionStorage.setItem("latestProds",JSON.stringify(action.payload))
                            
                            return{
                                ...state,
                                loading:false,
                                latestProdswanted:action.payload,
                                filteredProds:action.payload,
                                filterActive: !state.filterActive
                            }
                        }else{
                            sessionStorage.getItem("minPriceRange") != null ? null : sessionStorage.removeItem("minPriceRange")
                            sessionStorage.getItem("maxPriceRange") != null ? null : sessionStorage.removeItem("maxPriceRange")
                            return{
                                ...state,
                                loading:false,
                                latestProdswanted:JSON.parse(sessionStorage.getItem("latestProds")), 
                                filteredProds:JSON.parse(sessionStorage.getItem("latestProds")), 
                                filterActive: !state.filterActive
                            }
                        }
                    case GET_LATEST_PRODUCTS_FAILED:
                        return{
                            ...state,
                            loading:false,
                            latestProdswanted:[],
                            error:action.payload
                        }
                case GET_HOTDEALS_PRODUCTS:
                    return{
                        ...state,
                        loading:true,

                    }
                    case GET_HOTDEALS_PRODUCTS_SUCCESSED:
                        if(sessionStorage.getItem("hot-deals-prods") == null){
                            sessionStorage.setItem("hot-deals-prods",JSON.stringify(action.payload))
                            sessionStorage.getItem("minPriceRange") == null ? null : sessionStorage.removeItem("minPriceRange")
                            sessionStorage.getItem("maxPriceRange") == null ? null : sessionStorage.removeItem("maxPriceRange")
                            return{
                                ...state,
                                loading:false,
                                hotDealsProds:action.payload,
                                filteredProds:action.payload,
                                filterActive: !state.filterActive
                            }
                        }else{
                            sessionStorage.getItem("minPriceRange") == null ? null : sessionStorage.removeItem("minPriceRange")
                            sessionStorage.getItem("maxPriceRange") == null ? null : sessionStorage.removeItem("maxPriceRange")
                            return{
                                ...state,
                                loading:false,
                                hotDealsProds:JSON.parse(sessionStorage.getItem("hot-deals-prods")), 
                                filteredProds:JSON.parse(sessionStorage.getItem("hot-deals-prods")), 
                                filterActive: !state.filterActive
                            }
                        }
                    case GET_HOTDEALS_PRODUCTS_FAILED:
                        return{
                            ...state,
                            loading:false,
                            hotDealsProds:[],
                            error:action.payload
                        }
            case REMOVE_CURRENT_PRODUCT:
                return{
                    ...state,
                    loading:false,
                    currentViewedProd:{},
                    relatedProdToCurrentProd:[],
                }
            case "ALL_PRODS_LOADED":
                return{
                    ...state,
                    allProds:action.payload
                }
            case ADD_REVIEW_SUCCESSED:
                return{
                    ...state,
                    currentViewedProd:action.payload
                }
                case DELETE_REVIEW:
                    
                return{
                    ...state,
                    loading:true,

                }
                case DELETE_REVIEW_SUCCESSED:
                    return{
                        ...state,
                        currentViewedProd:action.payload
                    }
                case DELETE_REVIEW_FAILED:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload
                    } 
                case EDIT_REVIEW:
                    
                return{
                    ...state,
                    loading:true,

                }
                case EDIT_REVIEW_SUCCESSED:
                    return{
                        ...state,
                        currentViewedProd:action.payload
                    }
                case EDIT_REVIEW_FAILED:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload
                    } 
                case DELETE_PRODUCT:
                    
                return{
                    ...state,
                    loading:true,

                }
                case DELETE_PRODUCT_SUCCESSED:
                    return{
                        ...state,
                        loading:false,
                        allProds:action.payload
                    }
                case DELETE_PRODUCT_FAILED:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload
                    } 
                    
            default : return state
    }
}
export default productReducer;