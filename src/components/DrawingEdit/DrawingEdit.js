import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UseForm } from "../../hooks/UseForm";
import { drawServiceFactory } from '../../services/drawServiceFactory';
import { useOnDraw } from "../../hooks/CanvasHooks";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL,deleteObject } from 'firebase/storage'


export const DrawingEdit = () => {
    
    const { onDrawingEditSubmit, token } = useContext(AuthContext);
    const { drawingId } = useParams();
    const drawingService = drawServiceFactory(token);
    const storage = getStorage();
   
   
    const { value, changeHandler, changeValues,   } = UseForm({
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

   
    const onSubmit = async (e) => {
        e.preventDefault();
      

            
        const imageUrl = await urlHandler();
        const formData = {
          ...value,
         
        };
        onDrawingEditSubmit(formData)
    }
        
    //     onDrawingEditSubmit(formData);
    //   };
    const urlHandler = async () => {
        const canvas = canvasRef.current;
        canvas.crossOrigin = "Anonymous"
       
        try {
    
        
   
      
    
          // Convert canvas to blob
          const blob = await new Promise((resolve) =>
            canvas.toBlob(resolve, 'image/png')
          );
    
          // Create a new file from the blob
          const file = new File([blob], 'canvas-image.png', { type: 'image/png' });
    
          // Upload the file to Firebase Storage
          console.log(value.name);
          const storageRef = ref(storage, `${value.name}`);
          const snapshot = await uploadBytes(storageRef, file);
    
          // Get the download URL of the uploaded file
          const downloadUrl = await getDownloadURL(storageRef);
    
          // Return the download URL
          return downloadUrl;
        } catch (error) {
          console.error('Error uploading canvas image:', error);
          // Handle the error here
        }
      };


    const { setCanvasRef, onCanvasMouseDown, canvasRef } = useOnDraw(onDraw);

    function onDraw(ctx, point, prevPoint) {
        drawLine(prevPoint, point, ctx, '#000000', 5);
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

        <form action="/action_page.php" onSubmit={onSubmit}>

            <h1>Edit your drawing</h1>
            <div id='canvas-container'>
                <canvas
                    
                    width={800}
                    height={600}
                    onMouseDown={onCanvasMouseDown}
                    style={canvasStyle}
                    ref={setCanvasRef}
                    name={"image"}


                />
            </div>
            <div className="icon">
                <i className="fas fa-user-circle"></i>
            </div>
            <div className="formcontainer">

                <div className="container">
          
                    <label htmlFor="drawingName"><strong>Drawing Name</strong></label>
                    <input typeof="text"
                        placeholder="name"
                        name={"name"}
                        value={value.name}
                        onChange={changeHandler}

                        required />
                    <label htmlFor="style"><strong>style</strong></label>
                    <input typeof="text"
                        placeholder="style"
                        name={"style"}
                        value={value.style}
                        onChange={changeHandler}
                        required />
                    <label htmlFor="description"><strong>description</strong></label>
                    <input typeof="text"
                        placeholder="description"
                        name={"description"}
                        value={value.description}
                        onChange={changeHandler}

                        required />

                </div>
                <button typeof="submit" ><strong>Edit</strong></button>
                <div className="container" >

                </div>
            </div>
        </form>

    )
}
const canvasStyle = {
    border: "1px solid black"
}