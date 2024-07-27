// import React from 'react'
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./userPage.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FOLLOW_USER_REQ, GET_USER_INFO, UNFOLLOW_USER_REQ } from "../../../redux/user/userAction";
import ResultCard from "../../components/resultsContainer/resultCard/ResultCard";
export default function UserPage() {
    const filterTitle =document.querySelectorAll(".filter-wrapper .title")
    const tabsContainer = document.getElementById("tabs-wraperr");
    const tabs = document.querySelectorAll(".tabs .item");
    const tabLine = document.querySelector(".tabs .line");
    const [isUserLoaded,setUserLoaded]=useState(false)
    const dispatch=useDispatch();

    const isInfoLoaded=useSelector(state=>state.users.loading)
    let user=JSON.parse(sessionStorage.getItem("current-viewed-user"));
    let currentuser=JSON.parse(sessionStorage.getItem("user-auth"));
    const [products,setProducts]=useState(user?.prods);
    const [currentTab,setCurrentTab]=useState("All Products");

    const [isUserFollowed,setUserFollowed]=useState(false)

    tabs.forEach(item => {
      item.addEventListener("click", () => {
        resetTabs();
        item.classList.toggle("active")
        setLine(item);
      })
    })
     
    window.onresize = function () {
      tabs.forEach(item => {
        if (item.classList.contains("active")) {
          setLine(item);
          return;
        }
      })
      
    };
    
    filterTitle.forEach(title => {
      title.addEventListener("click", () => {
        title.classList.toggle("clicked")
      })
    })

    function resetTabs() {
      tabs.forEach(tag => {
        tag.classList.remove("active")
      })
    }
    
    const notFoundStyle={
      fontSize:"40px"
    }
    
    function getTimeDifference(date1, date2) {
      // Ensure both inputs are Date objects
      date1 = date1 instanceof Date ? date1 : new Date(date1);
      date2 = date2 instanceof Date ? date2 : new Date(date2);
    
      // Get the milliseconds difference between the dates
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    
      // Calculate the difference in seconds, minutes, hours, days, months, and years
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(months / 12);
    
      // Determine the appropriate unit and format the output string
      let unit;
      let value;
      if (years > 0) {
        unit = years === 1 ? "year" : "years";
        value = years;
      } else if (months > 0) {
        unit = months === 1 ? "month" : "months";
        value = months;
      } else if (days > 0) {
        unit = days === 1 ? "day" : "days";
        value = days;
      } else if (hours > 0) {
        unit = hours === 1 ? "hour" : "hours";
        value = hours;
      } else if (minutes > 0) {
        unit = minutes === 1 ? "minute" : "minutes";
        value = minutes;
      } else {
        unit = seconds === 1 ? "second" : "seconds";
        value = seconds;
      }
    
      // Add "ago" for past dates (assuming date2 is the current date)
      const isPast = date2.getTime() > date1.getTime();
      const timeAgo = isPast ? "ago" : "";
    
      return `${value} ${unit} ${timeAgo}`;
    }
    const today = new Date();
    function setLine(elm) {
      let containerX = tabsContainer.getBoundingClientRect().x;
      let targetx = 0
      let globalTargetX = 0;
      let centerOfTarget = 0;
      let centerOfLine = 0;
     
      globalTargetX = elm.getBoundingClientRect().x;
      targetx = globalTargetX - containerX;
      centerOfTarget = targetx + ((elm.offsetWidth) * .5);
      centerOfLine = (tabLine.offsetWidth) * .5;
      tabLine.style.transform =`translateX(${centerOfTarget-centerOfLine}px)`
      
    }
    // let user=null;
    let userProfileId=useParams()?.id;

    if(!isUserLoaded ){
      if(currentuser != null){
        dispatch(GET_USER_INFO(userProfileId,currentuser[0].id))
      }else{
        dispatch(GET_USER_INFO(userProfileId))
      }
      setUserLoaded(true)
    }

   

    const switchTab=(type)=>{
      switch(type){
        case "All Products":
          setProducts(user?.prods)
          setCurrentTab("All Products");
          break;
        case "Top Sales":
          setProducts(user?.soldItems)
          setCurrentTab("Top Sales");
          break;
        case "Top Buys":
          setProducts(user?.boughtItems)
          setCurrentTab("Top Buys");
          break;

        default: return null;
      }
    }


    const followOrUnfollowUser=(type,user)=>{
      if(type =="follow"){
          dispatch(FOLLOW_USER_REQ(currentuser[0].id,user))

      }else{
        dispatch(UNFOLLOW_USER_REQ(currentuser[0].id,user))
      }
      setUserFollowed( !isUserFollowed)
    }
 
    useEffect(()=>{setProducts(user?.prods)},[isInfoLoaded,isUserFollowed])
  return (
    <>
      <Navbar />
    <section className="main mainUser">
      <div className="roter">
        <p>Home</p>
        <i className="bi bi-chevron-compact-right"></i>
        <p>Profile</p>
        <i className="bi bi-chevron-compact-right"></i>
        <span className="icon"><i className="bi bi-basket-fill"></i></span>
        <p>{user?.FullName[0].toUpperCase() + user?.FullName.slice(1)}</p>
      </div>

      <div className="flex justify-center gap-2">
        <div className="channel-profile">
          <span className="options"> <i className="bi bi-gift-fill"></i></span>
          <span className="options"><i className="bi bi-hand-thumbs-up-fill"></i>
          </span>
          <div className="img-wrapper userImg">
            <img src={user?.image_url} alt="" />
          </div>
          <div className="channel__name">
            <i className="bi bi-basket-fill"></i>
            <p>{user?.FullName[0].toUpperCase() + user?.FullName.slice(1)}</p>
           <span className="icon"> <i className="bi bi-check-circle-fill"></i></span>
            <span className="flex-1"></span>

            <span className="circle"></span>
            <p>online</p>

          </div>
          


          {user?.id != currentuser[0].id ? (
           <>
              <span className="flex-1"></span>
              <div className="contact-btns">
                {isUserFollowed ? ( <div  className="followed" onClick={()=>followOrUnfollowUser("unfollow",user)}>
                  <p>Followed</p>
                  {/* <span className="icon"><i className="bi bi-plus"></i></span> */}
                </div>) : ( <div  className="follow" onClick={()=>followOrUnfollowUser("follow",user)}>
                  <p>Follow</p>
                  <span className="icon"><i className="bi bi-plus"></i></span>
                </div>)}

                {/* <div  className="follow" onClick={followOrUnfollowUser}>
                  <p>Follow</p>
                  <span className="icon"><i className="bi bi-plus"></i></span>
                </div> */}

                <div  className="chat">
                  <p>Chat</p>
                  <span className="icon"><i className="bi bi-chat-text"></i></span>
                </div>
              </div>
           </>
          ): null}
        </div>
        <div className="channel-details">
          
          <div className="channel__info">
            <div className="resume">
              <div>
                <span className="item">
                  <span className="icon"><i className="bi bi-kanban"></i></span>
                  <p>products :</p>
                  <p className="value">{user?.prodsNumber}</p>
                </span>
                <span className="item">
                  <span className="icon"><i className="bi bi-people"></i></span>
                  <p>Followers :</p>
                  <p className="value">40.5k</p>
                </span>
                <span className="item">
                  <span className="icon"><i className="bi bi-person-check"></i></span>
                  <p>Following :</p>
                  <p className="value">1.5k</p>
                </span>
              </div>

              <div>
                
              <span className="item">
                <span className="icon"><i className="bi bi-star"></i></span>
                <p>Rating :</p>
                <p className="value">4.9</p>
                <span className="substr">(30.2k reviews)</span>
              </span>
              <span className="item">
                <span className="icon"><i className="bi bi-chat-dots"></i></span>
                <p>Chat Performance :</p>
                <p className="value">93%</p>
                <span className="substr">(within hours)</span>
              </span>
              <span className="item">
                <span className="icon"><i className="bi bi-person-down"></i></span>
                <p>Joined :</p>
                <p className="value">{getTimeDifference(user?.created_at, today)}</p>
                
              </span>
             
              </div>
            </div>

            <div className="options">
              <p>Awards for top shop</p>
              <i className="bi bi-gift-fill"></i>
            </div>
            <div className="options">
              <p>Best seller of the year</p>
              <i className="bi bi-hand-thumbs-up-fill"></i>
            </div>
          </div>

          <div className="channel__social">
            <span className="item">
              <i className="bi bi-whatsapp"></i>
              <p>+961 81 {user?.kamkom_number.slice(1,4) +  " "+user?.kamkom_number.slice(4)}</p>
            </span>
            <span className="line-v"></span>
            <span className="item">
              <i className="bi bi-instagram"></i>
              <p>@{user?.FullName.replace(" ","")}</p>
            </span>
            <span className="line-v"></span>
            <span className="item">
              <i className="bi bi-facebook"></i>
              <p>{user?.FullName.replace(" ","")}</p>
            </span>
            <span className="line-v"></span>
            <span className="item">
              <i className="bi bi-youtube"></i>
              <p>{user?.FullName.replace(" ","")}</p>
            </span>
         
          </div>


        </div>

      </div>

      <div id="tabs-wraperr" className="tabs">
        <span className="line"></span>
        <p className="active item" 
        onClick={()=>switchTab("All Products")}
        >All products</p>
        <p className="item" 
        onClick={()=>switchTab("Top Sales")}
        > Top Sales</p>
        <p className="item"
        onClick={()=>switchTab("Top Buys")}
        > Top Buys </p>
     

      </div>

      <div className="products-wrapper">
      {
            products?.length > 0 ? products.map(e=>{
              return <ResultCard item={e} key={e.id} type={currentTab !="All Products" ? "purchased" : "normal"} />
          }) : (
            <h1 style={notFoundStyle}>Didnt Find A Product. </h1>
          )
        }
  

      </div>



    </section>
    <Footer />
    </>
  )
}

