import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function Header() {
const { isAuthenticated, setIsAuthenticated , loading , setLoading} = useContext(Context)

const logoutHandler = async () => {
  setLoading(true);
  try{
    await axios.get(`${server}/users/logout`, { withCredentials: true})
    toast.success('Logout Successfully');
    setIsAuthenticated(false);
    setLoading(false);
  }catch(err) {
    toast.error(err.response.data.message)
    setIsAuthenticated(true);
    setLoading(false);
  }

}
  return (
    <nav className="header">
      <div>
        <h2>TICK TICK.</h2>
      </div>
      <article>
        <Link to={'/'}>Home</Link>
        <Link to={'/profile'}>Profile</Link>
        {
          isAuthenticated ? (
            <button disabled={loading} onClick={logoutHandler} className="btn">Logout</button>
          ) : (
            <Link to={'/login'}>Login</Link>
          )
        }
      </article>
    </nav>
  )
}
