// import React from 'react'
import { useState } from "react";
import "./ReviewBlock.css"
import { useDispatch, useSelector } from "react-redux";
import { ADD_REVIEW_TO_PROD, DELETE_REVIEW_FROM_PROD, EDIT_REVIEW_OF_PROD } from "../../../redux/product/productAction";
import { useNavigate } from "react-router-dom";
export default function ReviewBlock({user,prod}) {
    const [reviewText,setReviewText]=useState("");
    const [starNb,setStarNb]=useState(0);
    const [revIsDeleted,setRevIsDeleted]=useState(false);
    const [editMode,setEditMode]=useState(false);
    const [editText,setEditText]=useState("");
    const [editStars,setEditStars]=useState(0);
    const currentUserId=useSelector(state=>state.users.currentUserId)
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const ensureRightNbStar=()=>{
        if(starNb < 0 || starNb ==""){
            setStarNb(0)
        }
  
    }
    const addReview=()=>{
        dispatch(ADD_REVIEW_TO_PROD(user.id,prod.id,{reviewText,starNb,user}))
        setReviewText("");
        setStarNb(0)
    }
    let defaultUserImg="http://res.cloudinary.com/dgo3fuaxg/image/upload/v1720904280/gnnsbakyaqomeocnu5hr.jpg"
    const displayOpt=(id)=>{
        const rev=document.querySelector(".rv-"+id )
        const otherOpt=rev.querySelector(".otherOpt")
        otherOpt.classList.toggle("displayed")

    }
    const deleteReview=(rev)=>{
        displayOpt(rev.id)
        dispatch(DELETE_REVIEW_FROM_PROD(rev))
        setRevIsDeleted(!revIsDeleted)
    }
    const editReview=(id,index)=>{
        let nbStar=editStars
        if(nbStar < 0 || nbStar ==""){
            nbStar=0
        }
        dispatch(EDIT_REVIEW_OF_PROD(id,index,{editText,nbStar}))
        setEditMode(false)
    }
  return (
    <div className="reviewBlock">
        <div className='blockTitle'>
            <p className="sectionTitle">
                REVIEWS
            </p>
        </div>
        <div className="reviewsList">
            <div className="addReview">
                <div className="userAvatar">
                    <img src={user != null ? user.image_url : defaultUserImg} alt="" />
                </div>
                <div className="reviewContent">
                    <div className="userNameAndRate">
                        <p>{user != null ?  user.FullName[0].toUpperCase()+user.FullName.slice(1) : "Client"}</p>
                        <span className="rate">
                            <i className="bi bi-star-fill"></i>
                            <input type="number" className="starNb" value={starNb} onChange={(e)=>setStarNb(e.target.value)} onMouseLeave={ensureRightNbStar}/>
                        </span>
                        
                    </div>
                    <textarea type="text" value={reviewText} onChange={(e)=>setReviewText(e.target.value)} placeholder="Enter Your Review..."/>
                    {user != null ? (
                        <button className="cartBtn" onClick={()=>addReview()}>Submit</button>
                    ):(
                        <button className="cartBtn" onClick={()=>navigate("/auth")}>SignIn</button>
                    )}
                    
                </div>
            </div>
            <div className="allReviews">
                {prod?.reviewList.length > 0 ? (
                    prod.reviewList.map((e,index)=>{
                        return <div className={"review rv-"+e.id} key={e.id}>
                                    <div className="userAvatar" >
                                        <img src={e.reviewer.image_url} alt="" />
                                    </div> 
                                    <div className="reviewContent">
                                        <div className="userNameAndRate">
                                            <p>{e.reviewer.FullName[0].toUpperCase()+e.reviewer.FullName.slice(1)}</p>
                                            <span className="rate">
                                                <i className="bi bi-star-fill"></i>
                                                {!editMode ? (
                                                    <p>{parseFloat(e.star_numbers)}</p>
                                                ):(
                                                    <input type="number" className="starNb" value={editStars} onChange={(e)=>setEditStars(e.target.value)} />
                                                )}
                                                
                                            </span>
                                            {currentUserId != null && currentUserId == e.reviewer.id ? (
                                                <div className="revOtherOpt">
                                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>displayOpt(e.id)} width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical revOpt" viewBox="0 0 16 16">
                                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                                    </svg>
                                                    <div className="otherOpt" onMouseLeave={()=>displayOpt(e.id)}>
                                                        <button onClick={()=>{setEditMode(!editMode),setEditText(e.content),setEditStars(e.star_numbers)}}>Edit</button>
                                                        <button onClick={()=>deleteReview(e)}>Delete</button>
                                                    </div>
                                                </div>
                                                
                                            ): null}
                                            
                                        </div>
                                        {console.log(!editMode)}
                                        {!editMode ? (
                                            <p>{e.content}</p>
                                        ):(
                                            <>
                                            <textarea type="text" value={editText} onChange={(e)=>setEditText(e.target.value)} placeholder="Enter Your Review..." className="editRev"/>
                                            <button className="cartBtn" onClick={()=>editReview(e.id,index)}>Update</button>
                                            </>
                                        )}
                                        
                                    </div>
                               </div>
                })
                ) : (
                    <h1>There is no Reviews</h1>
                )}
            </div>
        </div>
    </div>
  )
}
