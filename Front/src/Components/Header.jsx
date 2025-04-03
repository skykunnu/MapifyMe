import Profile from "../pages/Profile"
import {Link} from "react-router-dom"
function Header() {
  return (
    <>
    <div className="flex justify-between px-8 py-2 bg-green-400">
    <Link to='/'><img src={} alt="" /></Link>
    <Link className='bg-blue-400 rounded px-4 py-1' to='/profile'>Add Profile</Link>

    </div>
    <div>
    </div>
    
    </>
  )
}

export default Header