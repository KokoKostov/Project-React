
import { useContext } from "react"
import { DrawingItem } from "./DrawingItem"
import { AuthContext } from "../../context/AuthContext"


export const Drawings=()=>{
  const{ drawings} = useContext(AuthContext)
  

    return (
    <section id="services" className="clear">
    <article className="one_third"> All paintings
     {drawings.map(x=> <DrawingItem key={x._id} {...x}/>)

     }
    </article>
  
  </section>
  )}