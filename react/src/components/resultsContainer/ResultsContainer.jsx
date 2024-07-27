// import React from 'react'

import { useSelector } from "react-redux";
import ResultCard from "./resultCard/ResultCard";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";

export default function ResultsContainer(props) {
    // const navTags = document.querySelectorAll(".category-wrapper .tag");
    const filterTitle =document.querySelectorAll(".filter-wrapper .title")
    const tabsContainer = document.getElementById("tabs-wraperr");
    const tabs = document.querySelectorAll(".tabs .item");
    const tabLine = document.querySelector(".tabs .line");
    let products=null
    tabs.forEach(item => {
      item.addEventListener("click", () => {
        resetTabs();
        item.classList.toggle("active")
        setLine(item);
      })
    })
    
    
    window.onresize = function (event) {
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
    

    
    
    // let isMouseDown = false;
    // let clickedX = 0;
    
    
    function resetTabs() {
      tabs.forEach(tag => {
        tag.classList.remove("active")
      })
    }
    
    
    const notFoundStyle={
      fontSize:"40px"
    }
    
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
    let filterActive=useSelector(state=>state.products.filterActive)
    useEffect(()=>{},[filterActive])
    const currentPage=props.for;
    products=useSelector(state=>state.products.filteredProds)

  return (
    <section className="main">
      <div className="roter">
        <p>Home</p>
        <i className="bi bi-chevron-compact-right"></i>
        <p>{currentPage[0].toUpperCase() + currentPage.slice(1)}</p>

        {props.subitem != undefined ? (
         <>
          <i className="bi bi-chevron-compact-right"></i>
          <p>{props.subitem[0].toUpperCase() + props.subitem.slice(1)}</p>
          </>) :
          null
        }
      </div>

      


      <div className="products-wrapper">
        {
            products.length > 0 ? products.map(e=>{
              return <ResultCard item={e} key={e.id} />
          }) : (
            <h1 style={notFoundStyle}>Didnt Find A Product. </h1>
          )
        }
        

      </div>



    </section>
  )
}
