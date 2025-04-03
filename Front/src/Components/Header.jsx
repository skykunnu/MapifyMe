import Profile from "../pages/Profile"
import {Link} from "react-router-dom"
import logo from "../assets/logo2.png"
function Header() {
  return (
    <>
    <div className="flex justify-between px-8  bg-green-400">
      <div className='h-[2rem] w-[10rem] my-4'>
    <Link to='/'><img src={logo} alt="" className='object-cover h-full w-full '/></Link>
      </div>
      <div className='mt-5'>
    <Link className='bg-blue-400 rounded px-4 py-1 my-2 cursor-pointer' to='/profile'>Add Profile</Link>
      </div>

    </div>
    <div>
    </div>
    
    </>
  )
}

export default Header