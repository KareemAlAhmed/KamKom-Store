
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "./newNav.css";
import { useState } from "react";
import photo from "./imgs/images.jpeg"

import NavItem from "./NavItem";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/user/userAction";
import { Bounce, toast } from "react-toastify";
import { FETCH_CATEGORY_RANDOM_PRODS, FETCH_HOTDEALS_PRODS, FETCH_LATEST_PRODS } from "../../../redux/product/productAction";
const Navbar = () => {
    const [productToSearchOn, setProductToSearchOn] = useState("");
    const navigate = useNavigate();
    const navItems=["Home","Hot Deals","Categories","Latest"]
    const [isUserLogin,setUserLogin] = useState(JSON.parse(sessionStorage.getItem("user-auth")));
    const dispatch=useDispatch();
    const searchOnProduct = () => {
        navigate("/search", {
            state: productToSearchOn,
        });
    };
    useEffect(()=>{ let block=document.querySelectorAll(".header #menu .userIN");let mainblock=document.querySelector(".header #menu #userIn");
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
       
       
    },[])
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
     
      <div className="coin mobileVer">
        <span className="icon">
          
          <i className="bi bi-currency-exchange"></i>

          </span>
        <p><span id="price">{isUserLogin != null ? isUserLogin[0].balance : "0"}</span> coin</p>
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
              <li><Link to="/" onClick={(e)=>{e.preventDefault(),getSectionProds("/"),navigate("/")}}>Home</Link></li>            
              <li><Link to="/hot Deals/results" onClick={(e)=>{e.preventDefault(),getSectionProds("Hot Deals"),navigate("/hot%20Deals/results")}}>Hot Deals</Link></li>
              <li><Link to="/categories/results" onClick={(e)=>{e.preventDefault(),getSectionProds("Categories"),navigate("/categories/results")}}>Categories</Link></li>
              <li><Link to="/latest/results" onClick={(e)=>{e.preventDefault(),getSectionProds("Latest"),navigate("/latest/results")}}>Latest</Link></li>
              <li><Link to="" onClick={(e)=>{e.preventDefault(),getSectionProds("/"),searchOnProduct()}}>Search For Product</Link></li>
              <li><Link to="/cart" onClick={(e)=>{e.preventDefault(),getSectionProds("/"),navigate("/cart")}}>Cart</Link></li>
              <li><Link to="/wishlist" onClick={(e)=>{e.preventDefault(),getSectionProds("/"),navigate("/wishlist")}}>Wishlist</Link></li>
              {isUserLogin != null ? (
                <>
                {console.log(isUserLogin[0])}
                  <li> <Link to="" onClick={(e)=>{e.preventDefault(),getSectionProds("/"),navigate("/profile/"+isUserLogin[0].id)}} className="userInfoMobile">
                      <img className="w-100 h-100 obj-cover userIN" src={isUserLogin[0].image_url} alt="profile image" />
                      <p>{isUserLogin[0]?.fullName[0].toUpperCase() + isUserLogin[0]?.fullName.slice(1)}</p>   
                    </Link></li>
                  <li><Link to="" onClick={(e)=>{e.preventDefault(),getSectionProds("/"),navigate("/dashboard/products")}}>Dashboard</Link></li>
                  <li><Link to="" onClick={(e)=>{e.preventDefault(),getSectionProds("/"),logout()}}>Logout</Link></li>
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
