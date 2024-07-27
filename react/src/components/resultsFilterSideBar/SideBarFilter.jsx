// import React from 'react'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_CATEGORY_PRODS, getCategoryProductsSucceed } from "../../../redux/product/productAction";
import { useNavigate, useNavigation, useParams } from "react-router-dom";

export default function SideBarFilter() {
  const display = useParams()?.subitem;
  const [priceRange,setPriceRange]=useState({
    minPrice:0,
    maxPrice:0
  })
  let list=[
    {
      id:9,
      name:"Furniture",
      menu:["Coffee Tables","Storages","Master Bedroom Sets","Office Living","Office Chairs","Kids & Single Beds","Fabric Sofas","Master Beds","Dining Tables"]
    },
    {
      id:2,
      name:"Computer-Parts",
      menu:["Computer Components","Data and Storage","RAM","System Cooling","CPU","Motherboards","VGA","Power Supply","Case"]
    },
    {
      id:8,
      name:"Fashion",
      menu:["Samba Og Sneakers","T-Shirt","Sneakers","Hoodie","Sweatshirt","Rain Boots","Boots","Logo Polo Shirt","Short Sleeve Tshirt","Jeans"]
    },
    {
      id:5,
      name:"Mobile",
      menu:["Apple","Samsung","Tecno","CAT","Umidigi","Xiaomi","Blackview","Nokia","Infinix","Honor"]
    },
    {
      id:6,
      name:"Tablet",
      menu:["Samsung","itel","Blackview","Xiaomi","Doogee","Amazon","reMarkable","UGEE","Wacom","Apple","CCIT"]
    },
    
    {
      id:7,
      name:"Networking",
      menu:["Fiber and Passive","Business and Enterprise","Home and Small Office","VOIP and PBX","Router"]
    },
    {
      id:1,
      name:"Laptops",
      menu:["Dell","Lenovo","Asus","HP","Acer","Microsoft","Samsung"]
    },
    {
      id:3,
      name:"Desktops",
      menu:["Intel", "Asus","HP" ,"Lenovo" ,"Acer" ,"Gigabyte"]
    },
    {
      id:11,
      name:"Property",
      menu:["Building","Villa","Apartment","Duplex"]
    },
  ]
  const navigate=useNavigate()
  const newNavigation=(Index,event,name)=>{
    const allCat=document.querySelectorAll(".checkbox")
    allCat.forEach(e=>{e==event.target ? null : e.checked=false})
    event.stopPropagation();
    if(event.target.checked==true){
      dispatch(FETCH_CATEGORY_PRODS(Index))
      sessionStorage.getItem("currentFiler") == null ? null : sessionStorage.removeItem("currentFiler")
      sessionStorage.setItem("intendentValue",Index)
      navigate("/categories/"+name+"/results/")
    }
    else{
      dispatch(getCategoryProductsSucceed(original))
      navigate("/categories/results/")
    }
  }
  const dispatch=useDispatch();
  let allCheckBox=document.querySelectorAll(".checkbox");
  const [filters,setFilters]=useState({
    price:{
      highToLow:false,
      lowToHight:false,
    },
    rate:{
      highToLow:false,
      lowToHight:false,
    }
  })
  let  filteredProd=null;
  let  original=null;
  
  const getNumberBetweenRange=()=>{
    allCheckBox.forEach(e=> e.checked=false)
    if((priceRange.maxPrice > priceRange.minPrice)){
      sessionStorage.setItem("minPriceRange",priceRange.minPrice)
      sessionStorage.setItem("maxPriceRange",priceRange.maxPrice)
      filteredProd = original.filter(product => product.price >= priceRange.minPrice && product.price <= priceRange.maxPrice);
      setFilters(prevState=>({...prevState,
      price: {
        lowToHight: false,
        highToLow: false
      }}))
      dispatch(getCategoryProductsSucceed(filteredProd,true))
    }
    

  }

  const setFilterHighToLowPrice=(event)=>{
    allCheckBox.forEach(e=>event.target != e  ? e.checked=false : null)

    if(event.target.checked){
      sessionStorage.setItem("currentFiler","highToLowPrice")

      filteredProd.sort((a, b) => b.price - a.price);

        setFilters(prevState=>({...prevState,
          price: {
            lowToHight: false,
            highToLow: true
          }}))
        dispatch(getCategoryProductsSucceed(filteredProd,true))
    }else{
      sessionStorage.removeItem("currentFiler","highToLowPrice")
      dispatch(getCategoryProductsSucceed(original))
    }
  }
  const setFilterLowToHighPrice=(event)=>{
    allCheckBox.forEach(e=>event.target != e  ? e.checked=false : null)
    if(event.target.checked){
      sessionStorage.setItem("currentFiler","lowToHighPrice")
      filteredProd.sort((a, b) => Number(a.price) - b.price);

      setFilters(prevState=>({...prevState,
        price: {
          highToLow: false,
          lowToHight: true
        }}))

        console.log("checked")
      dispatch(getCategoryProductsSucceed(filteredProd,true))
      console.log("checked1")

    }else{
      sessionStorage.removeItem("currentFiler","lowToHighPrice")
      dispatch(getCategoryProductsSucceed(original))
    }
    
  }

  const setFilterHighToLowRate=(event)=>{
    allCheckBox.forEach(e=>event.target != e  ? e.checked=false : null)
    if(event.target.checked){
      sessionStorage.setItem("currentFiler","highToLowRate")

      filteredProd.sort((a, b) => b.rating - a.rating);

        setFilters(prevState=>({...prevState,
          rate: {
            lowToHight: false,
            highToLow: true
          }}))
          setPriceRange({
            minPrice:0,
            maxPrice:0
          })
        dispatch(getCategoryProductsSucceed(filteredProd,true))
    }else{
      sessionStorage.removeItem("currentFiler","highToLowRate")
      dispatch(getCategoryProductsSucceed(original))
    }
  }
  const setFilterLowToHighRate=(event)=>{
    allCheckBox.forEach(e=>event.target != e  ? e.checked=false : null)
    if(event.target.checked){
      sessionStorage.setItem("currentFiler","lowToHighRate")
      filteredProd.sort((a, b) => Number(a.rating) - b.rating);

      setFilters(prevState=>({...prevState,
        rate: {
          highToLow: false,
          lowToHight: true
        }}))
        setPriceRange({
          minPrice:0,
          maxPrice:0
        })
      dispatch(getCategoryProductsSucceed(filteredProd,true))

    }else{
      sessionStorage.removeItem("currentFiler","lowToHighRate")
      dispatch(getCategoryProductsSucceed(original))
    }
    
  }


  let currentFiler=sessionStorage.getItem("currentFiler")



  useEffect(()=>{
    if(currentFiler != null){
      const hightToLowPriceBox=document.querySelector(".hightToLowPrice");
      const lowToHighriceBox=document.querySelector(".lowToHighPrice");
      const lowToHighRateBox=document.querySelector(".LowToHighRate");
      const hightToLowRateBox=document.querySelector(".HighToLowRate");
      if(currentFiler == 'lowToHighPrice'){
        lowToHighriceBox.checked=true
      }else if(currentFiler == 'highToLowPrice'){
        hightToLowPriceBox.checked=true
      }else if(currentFiler == 'lowToHighRate'){
        lowToHighRateBox.checked=true
      }else if(currentFiler == 'highToLowRate'){
        hightToLowRateBox.checked=true
      }
    }else{
    allCheckBox.forEach(e=> e.checked=false )
    }
    const filterTitle =document.querySelectorAll(".filter-wrapper .title")
    
    filterTitle.forEach(title => {
      let lastEle=title.nextSibling.nextSibling
      lastEle.addEventListener("click",()=>{
          if(lastEle.previousElementSibling.classList.contains("filterOptions")){
            lastEle.previousElementSibling.classList.toggle("loadMore")
          }
        })
      title.addEventListener("click", () => {
        title.classList.toggle("clicked"),
        title.nextElementSibling.classList.toggle("hide")
        
      })
      const allCatCheck=document.querySelectorAll(".catCheck")
      allCatCheck.forEach(e=>{
        if(e.nextElementSibling.innerHTML == display){
          e.checked=true
        }
      })
    })
    const minPR=document.querySelector(".minPR")
    const maxPR=document.querySelector(".maxPR")

    if(sessionStorage.getItem("minPriceRange") != null){
      minPR.value=sessionStorage.getItem("minPriceRange")
      maxPR.value=sessionStorage.getItem("maxPriceRange")
    }
  },[currentFiler])
  filteredProd=useSelector(state=>state.products.filteredProds)
  original=useSelector(state=>state.products.wantedCategoryProds)

  
  return (
    <section className="filter">
      <div className="filter-wrapper">
        <div className="title ">
          <p>Category</p>
          <span className="icon"><i className="bi bi-chevron-down"></i></span>
        </div>
        <div className="filterOptions">
        {list.map((e,index)=> {
          return (
            <div className="items" key={index}>
              <input type="checkbox" className="checkbox catCheck"  onChange={(event)=>newNavigation(e.id,event,e.name)}/>
              <p>{e.name}</p>
            </div>
          )
        })}
        </div>
        
        <a>
          <span>load more</span>
          <i className="bi bi-plus"></i>
        </a>

      </div>
      <div className="filter-wrapper">
        <div className="title ">
          <p>Price</p>
          <span className="icon"><i className="bi bi-chevron-down"></i></span>
        </div>

        <div className="items">
          <input type="checkbox" className="checkbox hightToLowPrice" onChange={(e)=>setFilterHighToLowPrice(e)}/>
          <p>High to low</p>
        </div>
        <div className="items">
          <input type="checkbox" className="checkbox lowToHighPrice" onChange={(e)=>setFilterLowToHighPrice(e)} />
          <p>Low to high</p>
        </div>
        <div className="items priceRange">
          <input type="number" className="inp minPR" value={priceRange.minPrice} onChange={(e)=>setPriceRange({
            ...priceRange,minPrice:e.target.value
          })} />
          <p>To</p>
          <input type="number" className="inp maxPR" value={priceRange.maxPrice} onChange={(e)=>setPriceRange({
            ...priceRange,maxPrice:e.target.value
          })} />
          <input type="submit" className="sbt" onClick={getNumberBetweenRange}/>
        </div>


      </div>
        {display == "Property" ? 
        (
          <div className="filter-wrapper">
            <div className="title ">
              <p>Locations</p>
              <span className="icon"><i className="bi bi-chevron-down"></i></span>
            </div>
    
            <div className="items">
              <input type="checkbox" className="checkbox" />
              <p> Nearest</p>
            </div>
            <div className="items">
              <input type="checkbox" className="checkbox" />
              <p>Farthest</p>
            </div>
    
    
            <a>
              <span>load more</span>
              <i className="bi bi-plus"></i>
            </a>
  
        </div>
        ): null}
     

      <div className="filter-wrapper">
        <div className="title ">
          <p>Rating</p>
          <span className="icon"><i className="bi bi-chevron-down"></i></span>
        </div>

        <div className="items">
          <input type="checkbox" className="checkbox HighToLowRate" onChange={(e)=>setFilterHighToLowRate(e)} />
          <p> Highest</p>
        </div>
        <div className="items">
          <input type="checkbox" className="checkbox LowToHighRate" onChange={(e)=>setFilterLowToHighRate(e)} />
          <p>Lowest</p>
        </div>


        <a>
          <span>load more</span>
          <i className="bi bi-plus"></i>
        </a>

      </div>
    </section>
  )
}
