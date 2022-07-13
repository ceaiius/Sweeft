import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import axios from 'axios';

export default function Users() {
  const params = useParams();
  const [users, setUsers] = useState()


  useEffect(()=>{
    async function fetchData(){
      const res = await axios(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${params.id}`);
      console.log(res.data);
      setUsers(res.data);

    }
    fetchData()
  },[])

  if(!users) return <p>Fetching...</p>

  return (
    <div className='container'>
      <img src={users.imageUrl}/>
      <h1 className='info'>Info</h1>
      <div className='card-div'>
        <div className='name-div'>
          <h3 style={{fontWeight:"bold", fontSize:"30px", color:"#FF416C"}}>{users.prefix} {users.name} {users.lastName}</h3>
          <h3 style={{fontStyle:"italic", fontSize:"22px"}}>{users.title}</h3>
        </div>
        <div className='details-div'>
          <h3>Email: {users.email}</h3>
          <h3>Ip Address: {users.ip}</h3>
          <h3>Job Area: {users.jobArea}</h3>
          <h3>Job Type: {users.jobType}</h3>
        </div>
      </div>
      <h1 className='adress'>Address</h1>
      <div className='address-div'>
        <h3 style={{fontSize:"25px"}}>{users.company.name} {users.company.suffix}</h3>
        <div> 
          <h3>City: {users.address.city}</h3>
          <h3>Country: {users.address.country}</h3>
          <h3>State: {users.address.state}</h3>
          <h3>Street Address: {users.address.streetAddress}</h3>
          <h3>ZIP: {users.address.zipCode}</h3>
        </div>
      </div>
    </div>
  )
}
