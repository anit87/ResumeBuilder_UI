import React from 'react'
import {NavLink} from 'react-router-dom'
import './miniNav.css'
const MiniNav = (props) => {
// console.log(props)
  return (
   <div className="mini_nav">
       <div className="container">
           <div className="mini_content">
               <ul>
                   <li> <NavLink to='/'>Home</NavLink></li>
                   <li><p><i className="fa-solid fa-chevron-right"></i></p></li>
                   <li>  <NavLink to={`/${props.NavData[0]}`}>{props.NavData[1]}</NavLink></li>
                   {props.NavData[2]!=undefined?
                    <>
                   <li><p><i className="fa-solid fa-chevron-right"></i></p></li>
                   <li>  <NavLink to={`/${props.NavData[2]}`}>{props.NavData[3]}</NavLink></li>
                   </>:null
                   }
               </ul>
           </div>
       </div>
   </div>
  )
}

export default MiniNav