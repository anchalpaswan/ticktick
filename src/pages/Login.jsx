import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { server , Context} from '../main'
import { toast } from 'react-hot-toast'
import { useState, useContext } from 'react'


export default function Login() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email, // here we give our req.body to server
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      toast.success(data.message)
      setIsAuthenticated(true)
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthenticated(false)
      console.log(error)
    }
  }

  if (isAuthenticated) return <Navigate to={'/'} />
  return (
    <>
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <h4>Or</h4>
            <Link to={'/register'}>Sign up</Link>
          </form>
        </section>
      </div>
    </>
  )
}
