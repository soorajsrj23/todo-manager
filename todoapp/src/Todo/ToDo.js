import React, { useEffect, useState } from 'react';
import './ToDo.css'
import axios from 'axios';
import Navbar from '../NavBar/NavBar';


const API_BASE = "http://localhost:4000";


function ToDo() {
  
  const [todos,setTodos] =useState([]);
  const [popUpActive,setPopUpActive] =useState(false);
  const [newTodo,setNewTodo] =useState("");

  useEffect(()=>{
     GetTodos();

     console.log(todos);
  },[]);

  const GetTodos =async ()=>{

    try {
      const response = await axios.get(API_BASE + "/todos", {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

        // If the API call is successful, set the data to the state
        setTodos(response.data);
        console.log("data fetched successfully"+response.data);

    } catch (error) {
      console.error(error);
    }
  }


const completeTodo =async id=>{
  const data  =await fetch(API_BASE + "/todo/complete/"+ id)
  .then(res=>res.json());

  setTodos(todos =>todos.map(todo =>{
     if (todo._id === data._id)

     {
      todo.complete = data.complete;
     }
    return todo;
  }));

}

const deleteTodo =async id=>{
  const data = await fetch(API_BASE+"/todo/delete/"+ id, {
    method:"DELETE"
  })
  .then(res=>res.json());

  setTodos(todos=>todos.filter(todo=>todo._id !== data.id));

}


const addTodo =async()=>{
  const data = await fetch(API_BASE+ "/todo/new",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization: localStorage.getItem('token'), 
      
    },
    body:JSON.stringify({
      text:newTodo
    })
  }).then(res=>res.json());
  setTodos([...todos,data]);
  setPopUpActive(false);
  setNewTodo("");
console.log(data);
}

  return (
    <div className='main_todo'>
      <Navbar/>
      <h1>Welcome, SRJ</h1>
      <h4>Your Todos</h4>
      <div className='todos'>
        {
          todos.map(todo=>(
        <div className={'todo'+(todo.complete? " is-complete":"") }key={todo._id} onClick={()=>completeTodo(todo._id) }>
      <div className='checkbox'></div>

          <div className='text'>{todo.text}</div>

          <div className='delete-todo'onClick={()=>deleteTodo(todo._id)} >x</div>
      
        </div>
 ))
} 
      </div>
      <div className='addPopUp' onClick={()=>setPopUpActive(true)}>+</div>
      
      
      {popUpActive?(
<div className='popUp'>
        <div className='closePopUp' onClick={()=>setPopUpActive(false)} >      
       x </div>

 <div className='content'>
  <h3>Add Task</h3>
  <input type = "text" 
  className='add-todo-input' 
   onChange={e=>setNewTodo(e.target.value)}
   value={newTodo}
/>

<div className='button' onClick={addTodo}> Add to Task </div>
  </div>


  </div>  
      
):""}    
      </div>
  );
}

export default ToDo;
