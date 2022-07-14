import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import axios from 'axios';
import Card from '../components/Card';


export default function Users() {
  const params = useParams();
  const [users, setUsers] = useState();
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const random = Math.floor(Math.random() * (10)) + 1;

// Getting the single user 
  useEffect(()=>{
    async function fetchData(){
      const res = await axios(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${params.id}`);
      console.log(res.data);
      setUsers(res.data);
    }
    fetchData()
  },[params.id]);


// Getting the list of friends 
  const fetchData = (setItems) => {

    let url =  `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${params.id}/friends/1/20`;
    axios.get(url).then((res) => {
        setItems(res.data.list);
        console.log(res);
      });
   };

// Browsing more friends by changing the page from API
  const moreData = () => {
    let url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${params.id}/friends/${page}/40`;
    
    axios.get(url).then(res => {
      const filteredItems = res.data.list.filter(u => u.id> 25);
      setItems([...items,...filteredItems]);
      setPage(page+1)
      setIsFetching(false);
      console.log(res);
    });
    
  }

// infinite scrolling methodology

  const isScrolling =()=>{
    if(window.innerHeight + document.documentElement.scrollTop!==document.documentElement.offsetHeight){
      return;
    }
    setIsFetching(true)
  }
 
useEffect(()=>{
   fetchData(setItems,items);
   window.addEventListener("scroll", isScrolling);
   console.log(items);
    return () => window.removeEventListener("scroll", isScrolling);
    
 },[params.id]);


 useEffect(() => {
  if (isFetching){
    moreData();
  }
}, [isFetching]);

  if(!users) return <p style={{display:"none"}}>Loading</p>

  return (
    <div>
      <div className='container'>
        
        <img src={users.imageUrl  + "?v=" + random}/>
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
      <div className='friends-div'><h1 className='friends-h1'>Friends</h1></div>
      <div className="card-container">
      {items.map((user,key) => (
        <Card key={key} id={user.id} prefix={user.prefix} name={user.name} lastName={user.lastName} image={user.imageUrl} job={user.title}/>
       ))}
      </div>
    </div>
  )
}
