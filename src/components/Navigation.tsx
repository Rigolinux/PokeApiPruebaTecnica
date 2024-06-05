
import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (
    
     <nav>
         <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
         </ul>
     </nav>
    
  )
}
