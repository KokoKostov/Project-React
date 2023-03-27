import { DrawingItem } from "./DrawingItem"

export const Drawings=({
  drawings
})=>{
    if(drawings.length <=0){
      return null
    }
    return (
    <section id="services" className="clear">
    <article className="one_third"> All paintings
     {drawings.map(x=> <DrawingItem key={x._id} {...x}/>)

     }
    </article>
  
  </section>
  )}