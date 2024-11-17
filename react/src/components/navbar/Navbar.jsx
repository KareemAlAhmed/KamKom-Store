
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "./newNav.css";
import { useState } from "react";
import photo from "./imgs/images.jpeg"

import NavItem from "./NavItem";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CANCEL_REQUESTS, logoutUser, REQUEST_MONEYS, VERIFY_CODES, verifyCodeFailed } from "../../../redux/user/userAction";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { FETCH_CATEGORY_RANDOM_PRODS, FETCH_HOTDEALS_PRODS, FETCH_LATEST_PRODS } from "../../../redux/product/productAction";
import { height } from "@fortawesome/free-regular-svg-icons/faAddressBook";
const Navbar = () => {
    const [productToSearchOn, setProductToSearchOn] = useState("");
    const [moneyMenuMob, setMoneyMenuMob] = useState(true);
    const [moneyOptions] = useState([1000,2000,3000]);
    const [chosenAmount, setChosenAmount] = useState(1000);
    const [code, setCode] = useState("");
    const navigate = useNavigate();
    const navItems=["Home","Hot Deals","Categories","Latest"]
    const [isUserLogin,setUserLogin] = useState(JSON.parse(sessionStorage.getItem("user-auth")));
    let isRequestSuccessed=useSelector(state=>state.users.requestMoneySuccessed)
    let isVerifyCodeSuccessed=useSelector(state=>state.users.verifyCodeSuccessed)
    let user=useSelector(state=>(state.users.currentUser != null ? state.users.currentUser[0] : null));

    let isLoading=useSelector(state=>state.users.loading)
    const dispatch=useDispatch();
    const searchOnProduct = () => {
        navigate("/search", {
            state: productToSearchOn,
        });
    };
    useEffect(()=>{ 
      let block=document.querySelectorAll(".header #menu .userIN");let mainblock=document.querySelector(".header #menu #userIn");
      block.forEach(ele=>{
        ele.addEventListener("mouseenter", () => {
          const dropdownMenu = mainblock.querySelector(".dropdown-menu");
      
  
          if (dropdownMenu) {
            dropdownMenu.classList.add("open"); // Use classList for modern approach
            dropdownMenu.style.opacity = 1; // Set initial opacity for smooth fade-in
            dropdownMenu.style.display ="block"; // Set initial opacity for smooth fade-in
            dropdownMenu.classList.remove("hidden"); // Avoid potential display issues
      
            dropdownMenu.addEventListener("transitionend", () => {
              if (dropdownMenu.classList.contains("open")) {
                dropdownMenu.style.opacity = 1; // Set final opacity after transition
              }
            });
          }
        });
      
        mainblock.addEventListener("mouseleave", () => {
          const dropdownMenu = mainblock.querySelector(".dropdown-menu");
          if (dropdownMenu) {
            dropdownMenu.classList.remove("open");
            dropdownMenu.style.opacity = 1; // Set initial opacity for smooth fade-out
            dropdownMenu.style.display ="none"; 
            dropdownMenu.addEventListener("transitionend", () => {
              if (!dropdownMenu.classList.contains("open")) {
                dropdownMenu.style.opacity = 0; // Hide menu after transition
                dropdownMenu.classList.add("hidden"); // Optionally hide for better accessibility
              }
            });
          }
        });
      })
      if(!isRequestSuccessed){
        let addBtn= document.querySelector(".moneyReqBtn");
        if(addBtn != null){
          addBtn.classList.contains("sending") ? (
            addBtn.innerHTML="Add",
            addBtn.classList.remove("sending")
          ) :null
        }
      }else{
        let addMoney= document.querySelector(".addMoneyMobileV")
        let childDiv=addMoney.querySelector(".verifyCode")
        if(addMoney !=null && childDiv !=null){
          addMoney.style.height=`${childDiv.offsetHeight}px`
        }
      }
       
    },[isRequestSuccessed,isVerifyCodeSuccessed,isLoading,user])
    const logout=()=>{
      sessionStorage.removeItem("user-auth")
      setUserLogin(null);
      dispatch(logoutUser())
      toast.success("Logout Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
        });
        navigate("/")
    }
    const getSectionProds=(type)=>{
      const checkbox = document.getElementById('hamburg');
      checkbox.checked = false;
      stopScroll()
      switch(type){
          case "Categories":
            dispatch(FETCH_CATEGORY_RANDOM_PRODS())
            sessionStorage.getItem("currentFiler") == null ? null : sessionStorage.removeItem("currentFiler")
            break;
            case "Latest":
              dispatch(FETCH_LATEST_PRODS())
              sessionStorage.getItem("currentFiler") == null ? null : sessionStorage.removeItem("currentFiler")
              break;
            case "Hot Deals":
              dispatch(FETCH_HOTDEALS_PRODS())
              sessionStorage.getItem("currentFiler") == null ? null : sessionStorage.removeItem("currentFiler")
              break;
          default:
            return null;
      }

    }

    const stopScroll=()=>{
      let body=document.querySelector("body")
      body.classList.toggle("stopScroll")
    }
    const displayAddMoney=()=>{

      document.querySelector(".addMoney").classList.toggle("hideAddMoney")
      document.querySelector(".coin").classList.toggle("fixStyle")
    }
    const hideAddMoneyMenu=()=>{
      let coinDiv= document.querySelector(".coin")
      if(coinDiv.classList.contains("fixStyle")){
        document.querySelector(".addMoney").classList.add("hideAddMoney")
        document.querySelector(".coin").classList.remove("fixStyle")
      }
    }
    const requestMoney=(e)=>{
      e.stopPropagation();
      dispatch(REQUEST_MONEYS(isUserLogin[0].id,chosenAmount))
      document.querySelector(".moneyReqBtn").innerHTML="Sending..."
      document.querySelector(".moneyReqBtn").classList.toggle("sending")
    }
    const requestSuccessed=(e)=>{
      e.stopPropagation();
      dispatch(VERIFY_CODES(isUserLogin[0].id,code))
      setCode("")
    }
    const requestCanceled=(e)=>{
      e.stopPropagation();
      dispatch(CANCEL_REQUESTS(isUserLogin[0].id))
    }
    const displayAddMoneyMobile=()=>{
      setMoneyMenuMob(!moneyMenuMob)
      let addMoney= document.querySelector(".addMoneyMobileV")
      let childDiv=addMoney.querySelector(".amountOfMoney")
      let childDivM=addMoney.querySelector(".verifyCode")

      if(!isRequestSuccessed){

        if(moneyMenuMob){
          addMoney.classList.remove("hide-element")
          addMoney.style.height=`${childDiv.offsetHeight}px`
        }else{
          addMoney.style.height=`0px`
          addMoney.style.overflow=`hidden`
        }
      }else{
        if(moneyMenuMob){
          addMoney.classList.remove("hide-element")
          addMoney.style.height=`${childDivM.offsetHeight}px`
        }else{
          addMoney.style.height=`0px`
          addMoney.style.overflow=`hidden`
        }
        
      }

    }
    return (
      
        <header className="header flex items-center nav">
    <div className="wrapper flex items-center gap-2 mobileNav">

      <Link to="/">
      <h2>Kam<span className="blue-txt">Kom</span></h2>
      </Link>

      <div className="navItem navItemAndMenu">
                         <div className="navMenu btn-group">
                                {navItems.map((e,Index)=>{
                                  return <NavItem to={e == 'Home' ? "Home" : e[0].toLowerCase() + e.slice(1)} type={e} key={Index} dropMenu={e =='Categories' ? true : false} />
                                })}
                                
                        </div>
                    </div>

      <div className="search mobileVer " onClick={searchOnProduct}>
        
        <span className="icon">         
          <i className="bi bi-search"></i>     
          </span>
        <input id="search-input" type="text" placeholder="search"
          value={productToSearchOn}
          onChange={(e) => {
              setProductToSearchOn(e.target.value);
              navigate("/search", {
                  state: e.target.value,
              });
          }}
        />
        <span className="icon"><i className="bi bi-sliders"></i></span>
      </div>
     
      <div className="coin mobileVer" onMouseLeave={hideAddMoneyMenu}>
          <div className="moneyInfo"onClick={displayAddMoney}>
              <span className="icon">
              
              <i className="bi bi-currency-exchange"></i>

            </span>
            <p><span id="price">{isUserLogin != null ? user?.balance : "0"}</span> coin</p>
          </div>
          {isUserLogin != null &&(
            <div className="addMoney hideAddMoney">
          {!isRequestSuccessed ? (
            <div className="amountOfMoney">
            <label htmlFor="amount">Amount :</label>
            <select id="amount" onChange={(e)=>{setChosenAmount(e.target.value)}}>
              {moneyOptions.map((e,index)=>{
                return <option value={e} key={index}>${e}</option>
              })}
            </select>
            <button className="moneyReqBtn" onClick={(e)=>requestMoney(e)}>Add</button>
          </div>
          ): (<div className="verifyCode">    
                <label htmlFor="code">Code :</label>
                <input type="text" id="code" value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Enter Code..."></input>
                <div className="requestActions">
                  <button onClick={(e)=>requestSuccessed(e)}  >Submit</button>
                  <button onClick={(e)=>requestCanceled(e)}  >Cancel</button>
                </div>
              </div>
          )}
            
        </div>
          )}
        
      </div>

      {/* <div className="flex-1"></div> */}

      <div id="menu" className="flex items-center gap-2">
        
        <Link to="/cart">
        <div className="icon-wrapper">
          <span className="icon"><i className="bi bi-bag-fill"></i></span>
        </div></Link>
        <Link to="/wishlist">
          <div className="icon-wrapper" >
            <span className="icon"><i className="bi bi-heart-fill"></i></span>
          </div>
        </Link>
        <div className="icon-wrapper">
          <span className="icon-tag"></span>
          <span className="icon"><i className="bi bi-bell-fill"></i></span>
        </div>
  
        <span className="line-v"></span>
  
        <div className="userInfos userIN mobileVer" id="userIn">
              <span className="icon userIN"><i className="bi bi-grid-fill"></i></span>
        
              <div className="img-wrapper userIN">
                {
                  isUserLogin != null ?
                  (
                    <Link to={"/profile/"+isUserLogin[0].id} >
                      <img className="w-100 h-100 obj-cover userIN" src={isUserLogin[0].image_url} alt="profile image" />   
                    </Link>             
      
                  ) : (
                    <Link to="/auth" className="userIN">
                      <img className="w-100 h-100 obj-cover userIN" src={photo} alt="profile image" />                
                    </Link> 
                  )
                }                            
            </div>
            {
                  isUserLogin != null ?
                  (
 
                    <ul className="dropdown-menu userMenu" role="menu" aria-labelledby="dropdownMenu">
                      <li><button onClick={()=>navigate("/dashboard/products")}>Dashboard</button></li>
                      <li><button onClick={()=>logout()}>Logout</button></li>
                    </ul>                  
      
                  ) : (
                    <ul className="dropdown-menu userMenu" role="menu" aria-labelledby="dropdownMenu">
                    </ul>
                  )
                }   
             
        </div>
        
        <nav className="menu--right-nav mobileVisible" role="navigation">
          <div className="menuToggle">
            <input type="checkbox" id="hamburg" onChange={stopScroll}/>
            <span className="hamburg"></span>
            <span className="hamburg"></span>
            <span className="hamburg"></span>
            <ul className="menuItem">
              <li><Link to="/" onClick={(e)=>{e.preventDefault(),getSectionProds("/"),navigate("/")}}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
              Home</Link></li>            
              <li><Link to="/hot Deals/results" onClick={(e)=>{e.preventDefault(),getSectionProds("Hot Deals"),navigate("/hot%20Deals/results")}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
</svg>

              Hot Deals</Link></li>
              <li><Link to="/categories/results" onClick={(e)=>{e.preventDefault(),getSectionProds("Categories"),navigate("/categories/results")}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
</svg>

              Categories</Link></li>
              <li><Link to="/latest/results" onClick={(e)=>{e.preventDefault(),getSectionProds("Latest"),navigate("/latest/results")}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
</svg>

              Latest</Link></li>
              <li><Link to="" onClick={(e)=>{e.preventDefault(),getSectionProds("/"),searchOnProduct()}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

              Search For Product</Link></li>
              <li><Link to="/cart" onClick={(e)=>{e.preventDefault(),getSectionProds("/"),navigate("/cart")}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

              Cart</Link></li>
              <li><Link to="/wishlist" onClick={(e)=>{e.preventDefault(),getSectionProds("/"),navigate("/wishlist")}}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
              Wishlist</Link></li>
              {isUserLogin != null ? (
                <>
                  <li> <Link to="" onClick={(e)=>{e.preventDefault(),getSectionProds("/"),navigate("/profile/"+isUserLogin[0].id)}} className="userInfoMobile">
                      <img className="w-100 h-100 obj-cover userIN" src={isUserLogin[0].image_url} alt="profile image" />
                      <p>{isUserLogin[0]?.FullName[0].toUpperCase() + isUserLogin[0]?.FullName.slice(1)}</p>   
                    </Link></li>

                  <li><Link to="" className="moneyAndOpts" onClick={(e)=>{e.preventDefault(),displayAddMoneyMobile()} }>
                    <span className="icon">           
                      <i className="bi bi-currency-exchange"></i>
                    </span>
                    <p>{isUserLogin[0]?.balance}</p></Link>
                    <div className="addMoneyMobileV hide-elemment">
                      {!isRequestSuccessed ? (
                        <div className="amountOfMoney">
                        <label htmlFor="amount">Amount :</label>
                        <select id="amount" onChange={(e)=>{setChosenAmount(e.target.value)}}>
                          {moneyOptions.map((e,index)=>{
                            return <option value={e} key={index}>${e}</option>
                          })}
                        </select>
                        <button className="moneyReqBtn" onClick={(e)=>requestMoney(e)}>Add</button>
                      </div>
                      ): (<div className="verifyCode">    
                            <label htmlFor="code">Code :</label>
                            <input type="text" id="code" value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Enter Code..."></input>
                            <div className="requestActions">
                              <button onClick={(e)=>requestSuccessed(e)}  >Submit</button>
                              <button onClick={(e)=>requestCanceled(e)}  >Cancel</button>
                            </div>
                          </div>
                      )}
            
        </div>
                  </li>
                  <li><Link to="" onClick={(e)=>{e.preventDefault(),getSectionProds("/"),navigate("/dashboard/products")}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
</svg>

                  Dashboard</Link></li>
                  <li><Link to="" onClick={(e)=>{e.preventDefault(),getSectionProds("/"),logout()}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                  Logout</Link></li>
                </>
              ):(
                <li><Link to="" className="userIN" onClick={(e)=>{e.preventDefault(),getSectionProds("/"),navigate("/auth")}}> 
                  SignIn           
                </Link></li>
              )}
            </ul>
          </div>
        </nav>
      </div>

    </div>
              
  </header>
    );
};
export default Navbar;
