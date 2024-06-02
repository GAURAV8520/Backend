
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [Employe,setEmploye]=useState([]);

  useEffect(()=>{
    axios.get('/api/user')
    .then((r)=>{
      setEmploye(r.data)
    })
    .catch((e)=>{
      console.log(e);
    })
  },[])
  console.log(Employe.length)

  return (
    <>
        <h1>Employe information </h1>
        <h2>Number of Employe {Employe.length}</h2>

        {
          Employe.map((e)=>(
            <div key={e.id}>
              <h1>Name : {e.name}</h1>
              <h2>Work as {e.work}</h2>
              <h3>Mobile No : {e.mobile}</h3>
              <h4>Address :{e.address.city}</h4>

            </div>

          ))
        }
    </>
  )
}

export default App
