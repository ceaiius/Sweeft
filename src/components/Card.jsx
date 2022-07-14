import React from 'react'
import {Link} from "react-router-dom"
export default function Card({image,name,job, prefix, lastName, id}) {
    const style = {
        color:"white",
        textDecoration : "none"
    }
    
    const random = Math.floor(Math.random() * (10)) + 1;
  return (
    
    <div className="card">
                
        <Link style={style} to={"/users/" + id}>
            <div className="imgContainer">
                <img src={image + "?v=" + random}  alt=""/>
            </div>      
            <div className="card-text">
                <h3>{job}</h3>
                <h2>{prefix} {name} {lastName}</h2>
                
            </div>
        </Link>
    </div>
   
  )
}
