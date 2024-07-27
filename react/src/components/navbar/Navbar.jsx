
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
    // block.addEventListener("mouseenter", () => {
    //     const dropdownMenu = block.querySelector(".dropdown-menu");
    

    //     if (dropdownMenu) {
    //       dropdownMenu.classList.add("open"); // Use classList for modern approach
    //       dropdownMenu.style.opacity = 0; // Set initial opacity for smooth fade-in
    //       dropdownMenu.classList.remove("hidden"); // Avoid potential display issues
    
    //       dropdownMenu.addEventListener("transitionend", () => {
    //         if (dropdownMenu.classList.contains("open")) {
    //           dropdownMenu.style.opacity = 1; // Set final opacity after transition
    //         }
    //       });
    //     }
    //   });
    
    //   block.addEventListener("mouseleave", () => {
    //     const dropdownMenu = block.querySelector(".dropdown-menu");
    //     if (dropdownMenu) {
    //       dropdownMenu.classList.remove("open");
    //       dropdownMenu.style.opacity = 1; // Set initial opacity for smooth fade-out
    //       dropdownMenu.addEventListener("transitionend", () => {
    //         if (!dropdownMenu.classList.contains("open")) {
    //           dropdownMenu.style.opacity = 0; // Hide menu after transition
    //           dropdownMenu.classList.add("hidden"); // Optionally hide for better accessibility
    //         }
    //       });
    //     }
    //   });

    return (
      
        <header className="header flex items-center nav">
    <div className="wrapper flex items-center gap-2 mobileNav">

      <Link to="/">
      <h2>Kam<span className="blue-txt">Kom</span></h2>
      </Link>

      <div className="navItem navItemAndMenu">
                         <div className="navMenu btn-group">
                                {navItems.map((e,Index)=>{
                                  return <NavItem to={e == 'Home' ? "" : e[0].toLowerCase() + e.slice(1)} type={e} key={Index} dropMenu={e =='Categories' ? true : false} />
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
     
      <div className="coin mobileVer http://localhost:3000">
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
        <span className="menu-icon"><i className="bi bi-list"></i></span>
      </div>

    </div>
  </header>
    );
};
export default Navbar;
