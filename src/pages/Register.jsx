import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Context, server } from '../main'

export default function Register() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { isAuthenticated, setIsAuthenticated , loading, setLoading} = useContext(Context);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
       try{
        const { data } = await axios.post(`${server}/users/new`, {
            name, 
            email, // here we give our req.body to server
            password,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        toast.success(data.message)        
        setIsAuthenticated(true);
        setLoading(false);
       }catch(error){
            toast.error("Some error occurred")
            setIsAuthenticated(false)
            console.log(error)
            setLoading(false);
       }
        
    }

    if (isAuthenticated) return <Navigate to={"/"}/>
    return (
        <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                    <input type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit">Sign Up</button>
                    <h4>Or</h4>
                    <Link to="/login" disabled={loading}>Log In</Link>
                </form>
            </section>
        </div>
    )
}