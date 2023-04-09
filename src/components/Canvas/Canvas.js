
import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useForm } from "../../hooks/useForm";
import { useOnDraw } from "../../hooks/CanvasHooks";
import { Button, Card, Form } from 'react-bootstrap';
import './Canvas.css'





export const Canvas = () => {
  const { userEmail } = useContext(AuthContext)
  const [currentColor, setCurrentColor] = useState({})
  const { onDrawingSubmit, drawings } = useContext(AuthContext)
  const { value, changeHandler } = useForm({

    image: '',
    author: '',
    name: '',
    style: '',
    description: ''
  }, onDrawingSubmit)



  const onSubmit = async (e) => {
    e.preventDefault();
    if (drawings.some((x) => x.name === value.name)) {
      console.error(`this name already exists`);
      return
    }
    const imageUrl = await urlHandler();



    const formData = {
      ...value,
      author: userEmail,
      image: imageUrl

    };
    console.log(formData);


    onDrawingSubmit(formData);
  };


  const {

    setCanvasRef,
    onCanvasMouseDown,
    canvasRef

  } = useOnDraw(onDraw);

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, `${currentColor}`, 5);
  }

  function drawLine(
    start,
    end,
    ctx,
    color,
    width
  ) {
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
   const onColorChange=(e)=>{

  
    const currentColor= e.target.value
    setCurrentColor(currentColor)
  }
  const urlHandler = async () => {
    const canvas = canvasRef.current;

    try {


      const storage = getStorage();

      const mountainsRef = ref(storage, `${value.name}`);


      const mountainImagesRef = ref(storage, `images/${value.name}`);
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      );
      const file = new File([blob], 'canvas-image.png', { type: 'image/png' });
      const storageRef = ref(storage, `${value.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading canvas image:', error);
    }

  };



  return ( <Form onSubmit={onSubmit} id='can'>
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
        <strong>Upload</strong>
      </Button>
      <div className="container"></div>
    </div>
    </Form>)
}
const canvasStyle= {  
 
  border: "1px solid black",
 
 
    

}