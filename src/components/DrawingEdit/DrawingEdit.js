import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "../../hooks/useForm";
import { drawServiceFactory } from '../../services/drawServiceFactory';
import { useOnDraw } from "../../hooks/CanvasHooks";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL,deleteObject } from 'firebase/storage'
import { Form, Button } from "react-bootstrap";


export const DrawingEdit = () => {
    
    const { onDrawingEditSubmit, token } = useContext(AuthContext);
    const { drawingId } = useParams();
    
    const drawingService = drawServiceFactory(token);
    const storage = getStorage();
    const [currentColor, setCurrentColor] = useState({})
   
    const { value, changeHandler, changeValues,   } = useForm({
        _id: '',
        image: '',
        author: '',
        name: '',
        style: '',
        description: ''
    }, onDrawingEditSubmit);
    
    useEffect(() => {
        const urlHandler = async ()=>{
            const imgRef = ref(storage, `${value.name}`);

           
            const downloadUrl = await getDownloadURL(imgRef);
          
            const img = new Image();
            
        
            img.src = downloadUrl;
           
            await new Promise((resolve) => {
              img.onload = resolve;
            });
            
         
            const canvas = document.getElementById('canvas');
            
            // Get the 2D context for the canvas
            const ctx = canvas.getContext('2d');
            
            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0);
        }
        drawingService.getOne(drawingId)
            .then(result => {
                changeValues(result);
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                const image = new Image();
                image.crossOrigin = "anonymous"
                image.onload = () => {
                    context.drawImage(image, 0, 0);
                };
                image.src = result.image;
            });
    }, [drawingId]);

    const onColorChange=(e)=>{

  
        const currentColor= e.target.value
        setCurrentColor(currentColor)
      }
   
    const onSubmit = async (e) => {
        e.preventDefault();
      
        //fix name change issue
            
        const imageUrl = await urlHandler();
        const formData = {
          ...value,
         
        };
        onDrawingEditSubmit(formData)
    }
        
    const urlHandler = async () => {
        const canvas = canvasRef.current;
        canvas.crossOrigin = "Anonymous"
       
        try {
    
        
   
      
    
        
          const blob = await new Promise((resolve) =>
            canvas.toBlob(resolve, 'image/png')
          );
       const file = new File([blob], 'canvas-image.png', { type: 'image/png' });
          console.log(value.name);
          const storageRef = ref(storage, `${value.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(storageRef);
          return downloadUrl;
        } catch (error) {
          console.error('Error uploading canvas image:', error);
        }
      };


    const { setCanvasRef, onCanvasMouseDown, canvasRef } = useOnDraw(onDraw);

    function onDraw(ctx, point, prevPoint) {
        drawLine(prevPoint, point, ctx, currentColor, 5);
    }

    function drawLine(start, end, ctx, color, width) {
        start = start ?? end;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }
   
    return (
            <Form onSubmit={onSubmit} id='can'>
      <h1 id ="title">Create your drawing!</h1>
    
    <div id="canvas-container" >
      
      <canvas id='canvas'
        width={800}
        height={600}
        onMouseDown={onCanvasMouseDown}
        style= {canvasStyle}
        ref={setCanvasRef}
        name={"image"}
      />
    
      <div className="color-container">
      <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
  <Form.Control
   name="color0"
    type="color"
    id="exampleColorInput"
    defaultValue="#000000"
    title="Choose your color"
    onClick={()=>setCurrentColor("#000000")}
    onChange={onColorChange}
  />
  <Form.Control
    name="color1"
    type="color"
    id="exampleColorInput"
    defaultValue="#FF2D00"
    title="Choose your color"
    onClick={(value)=>setCurrentColor(value)}
    onChange={onColorChange}
  />
  <Form.Control
   name="color2"
    type="color"
    id="exampleColorInput"
    defaultValue="#00FF0F"
    title="Choose your color"
    onClick={()=>setCurrentColor("#00FF0F")}
    onChange={onColorChange}
  />
  <Form.Control
   name="color3"
    type="color"
    id="exampleColorInput"
    defaultValue="#0013FF"
    title="Choose your color"
    onClick={()=>setCurrentColor("#0013FF")}
    onChange={onColorChange}
  />
  <Form.Control
   name="color4"
    type="color"
    id="exampleColorInput"
    defaultValue="#6A0355"
    title="Choose your color"
    onClick={()=>setCurrentColor("#6A0355")}
    onChange={onColorChange}
  />
   <Form.Control
   name="color5"
    type="color"
    id="exampleColorInput"
    defaultValue="#FFFFFF"
    title="Choose your color"
    onClick={()=>setCurrentColor("#FFFFFF")}
    onChange={onColorChange}
  />
  </div>
    </div>
    <div className="icon">
      <i className="fas fa-user-circle"></i>
    </div>
    <div className="formcontainer">
      <div className="container">
        <Form.Group>
          <Form.Label>
            <strong>Drawing Name</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            name={"name"}
            value={value.name}
            onChange={changeHandler}
            disabled
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <strong>Style</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="style"
            name={"style"}
            value={value.style}
            onChange={changeHandler}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            
            <strong>Description</strong>
           
          </Form.Label>
     
          <Form.Control
        
            type="text"
            placeholder="description"
            name={"description"}
            value={value.description}
            onChange={changeHandler}
            required
          />
          
        </Form.Group>
      </div>
      <Button variant="primary" type="submit" id='btn-primary'>
        <strong>Edit</strong>
      </Button>
      <div className="container"></div>
    </div>
    </Form>)
}

//         <form action="/action_page.php" onSubmit={onSubmit}>

//             <h1>Edit your drawing</h1>
//             <div id='canvas-container'>
//                 <canvas
                    
//                     width={800}
//                     height={600}
//                     onMouseDown={onCanvasMouseDown}
//                     style={canvasStyle}
//                     ref={setCanvasRef}
//                     name={"image"}


//                 />
//             </div>
//             <div className="icon">
//                 <i className="fas fa-user-circle"></i>
//             </div>
//             <div className="formcontainer">

//                 <div className="container">
          
//                     <label htmlFor="drawingName"><strong>Drawing Name</strong></label>
//                     <input typeof="text"
                    
//                         placeholder="name"
//                         name={"name"}
//                         value={value.name}
//                         onChange={changeHandler}

//                         required
//                         disabled />
                        
//                     <label htmlFor="style"><strong>style</strong></label>
//                     <input typeof="text"
//                         placeholder="style"
//                         name={"style"}
//                         value={value.style}
//                         onChange={changeHandler}
//                         required 
//                         />
//                     <label htmlFor="description"><strong>description</strong></label>
//                     <input typeof="text"
//                         placeholder="description"
//                         name={"description"}
//                         value={value.description}
//                         onChange={changeHandler}

//                         required />

//                 </div>
//                 <button typeof="submit" ><strong>Edit</strong></button>
//                 <div className="container" >

//                 </div>
//             </div>
//         </form>

//     )

// }
const canvasStyle = {
    border: "1px solid black"
}