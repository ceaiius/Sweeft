import "../styles/App.css"
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from "../components/Card";
import {motion} from "framer-motion"

function Home() {

const [items, setItems] = useState([]);
const [isFetching, setIsFetching] = useState(false);
const [page, setPage] = useState(1);

// Getting the first 50 users

const fetchData = (setItems, items) => {
  let url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/1/50`;
  axios.get(url).then((res) => {
  setItems([...items, ...res.data.list]);
  console.log(res);
  });
};

// Getting more users by changing the pages

const moreData = () => {
  let url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/50`;
  axios.get(url).then(res => {
  setItems([...items, ...res.data.list]);
  setPage(page+1)
  setIsFetching(false)
  });
}

// Infinite scrolling functionality

const isScrolling =()=>{
  if(window.innerHeight + document.documentElement.scrollTop!==document.documentElement.offsetHeight){
    return;
  }
  setIsFetching(true)
}

useEffect(()=>{
  fetchData(setItems,items);
  window.addEventListener("scroll", isScrolling);
  return () => window.removeEventListener("scroll", isScrolling);
},[]);


useEffect(() => {
  if (isFetching){
    moreData();
  }
}, [isFetching]);


return (
<motion.div className="card-container" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
  transition={{duration:0.5}}>
  {items.map((user,key) => (
  <Card key={key} id={user.id} prefix={user.prefix} name={user.name} lastName={user.lastName} image={user.imageUrl}
    job={user.title} />
  ))}
</motion.div>
);
}

export default Home;