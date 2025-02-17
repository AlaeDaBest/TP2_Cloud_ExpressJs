import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { response } from 'express';
import React from 'react';
import axios, { toFormData } from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)
  const [chefs,setChefs]=useState([]);
  const [name,setName]=useState('');
  const [age,setAge]=useState('');
  const [speciality,setSpeciality]=useState('');
  const [experience,setExperience]=useState('');
  const navigate=useNavigate();
  useEffect(()=>{
    axios.get('http://localhost:3000/chefs')
    .then((response)=>{
      setChefs(response.data);
      console.log(response.data);
    }).catch(error=>console.error('There was an error fetching chefs',error));
  },[])
  function HandleDelete(name){
    try{
      axios.delete(`http://localhost:3000/chefs/${name}`)
    }catch(e){
      console.log('Error deleting chef');
    }
  }
  async function HandleAdd(e){
    e.preventDefault();
    const data={
      "name":name,
      "age":age,
      "speciality":speciality,
      "experience":experience
    }
    const response=await axios.post('http://localhost:3000/chefs/add',data);
    navigate('/');
  }
  return (
    <div>
      <h1>Add Chef</h1>
      <form onSubmit={HandleAdd}>
        <input type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)} />
        <input type="text" placeholder='Age' onChange={(e)=>setAge(e.target.value)} />
        <input type="text" placeholder='Speciality' onChange={(e)=>setSpeciality(e.target.value)} />
        <input type="text" placeholder='Experience' onChange={(e)=>setExperience(e.target.value)} />
        <input type="submit" value="Add" />
      </form>
      <h1>Chef List</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Speciality</th>
          <th>Experience</th>
          <th>Action</th>
        </tr>
      {chefs.map(chef=>(
        <tr key={chef._id}>
          <td>{chef.name}</td>
          <td>{chef.speciality}</td>
          <td>{chef.experience} Years</td>
          <td>
            <input type="button" value="Delete" onClick={HandleDelete(chef.name)} />
          </td>
        </tr>
      ))}
      </table>
    </div>
  )
}

export default App;
