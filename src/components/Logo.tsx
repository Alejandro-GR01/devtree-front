import { Link } from "react-router"
import logo from '/logo.svg'

const Logo = () => {
  return (
   <Link to={'/'} >
       <img src={logo} className="w-full block" alt="Logo DevTree" />
   </Link>
  )
}

export default Logo