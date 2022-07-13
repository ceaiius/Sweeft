import "../styles/App.css"
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from "../components/Card";

function Home() {
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = (setItems, items) => {
   let url =  `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/1/50`;
   axios.get(url).then((res) => {
       setItems([...items, ...res.data.list]);
       console.log(res);
     });
  };

  const moreData = () => {
    let url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/50`;
    axios.get(url).then(res => {
      setItems([...items, ...res.data.list]);
      setPage(page+1)
      setIsFetching(false)
    });
  }

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
    <div className="card-container">
       {items.map((user,key) => (
        <Card key={key} id={user.id} prefix={user.prefix} name={user.name} lastName={user.lastName} image={user.imageUrl} job={user.title}/>
       ))}
     </div>
  );
}

export default Home;
