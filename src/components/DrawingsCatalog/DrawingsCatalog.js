
import { useContext } from "react"
import { DrawingItem } from "./DrawingItem"
import { AuthContext } from "../../context/AuthContext"
import './DrawingItem'


export const Drawings=()=>{
  const{ drawings} = useContext(AuthContext)
  console.log(drawings);

    return (
    <section id="services" className="clear">
      <h1>All paintings</h1>
    <article className="one_third"> 
     {drawings.map(x=> <DrawingItem key={x._id} {...x}/>)

     }
    </article>
  
  </section>
  )}