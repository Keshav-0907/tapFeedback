'use client';

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const handleSubmit = async () =>{
   const res = await axios.post('/api/auth/create-user', {
    name,
    email,
    password
   })
   console.log(res.data);
  }

  
  return (
    <div className="flex flex-col gap-4"> 
      <input type="text" placeholder="Enter your name"  className="border" value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type="email" placeholder="Enter your email" className="border" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Enter your password" className="border" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
