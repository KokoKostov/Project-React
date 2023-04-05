import { CanvasBoard } from "./CanvasBoard"

export const  Canvas= ()=>{
    return(

    <form action="/action_page.php">
      <h1>SIGN UP</h1>
      <CanvasBoard/>
      <div className="icon">
        <i className="fas fa-user-circle"></i>
      </div>
      <div className="formcontainer">
      <div className="container">
        <label htmlFor="drawingName"><strong>Drawing Name</strong></label>
        <input typeof="text" placeholder="name" name="uname" required/>
        <label htmlFor="style"><strong>style</strong></label>
        <input typeof="text" placeholder="style" name="mail" required/>
        <label htmlFor="description"><strong>description</strong></label>
        <input typeof="password" placeholder="description" name="psw" required/>

        </div>
      <button typeof="submit"><strong>Upload</strong></button>
      <div className="container" >
      
      </div>
      </div>
    </form>
    

    )
}