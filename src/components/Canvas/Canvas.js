
import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { UseForm } from "../../hooks/UseForm";
import { useOnDraw } from "../../hooks/CanvasHooks";





export const Canvas = () => {
  // const userEmail = useContext(AuthContext)

  const { onDrawingSubmit,drawings } = useContext(AuthContext)
  const { value, changeHandler } = UseForm({

    image: '',
    name: '',
    style: '',
    description: ''
  }, onDrawingSubmit)


  const [imageUrl, setImageUrl] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    if(drawings.some((x)=>x.name === value.name)){
        console.error(`this name already exists`);
        return
    }
    // Call urlHandler to get download URL for canvas image
    const imageUrl = await urlHandler();


    // Add the download URL to the form data
    const formData = {
      ...value,

      image: imageUrl,
    };

    // Call onDrawingSubmit with the form data
    onDrawingSubmit(formData);
  };
  const {

    setCanvasRef,
    onCanvasMouseDown,
    canvasRef

  } = useOnDraw(onDraw);

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, '#000000', 5);
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

  const urlHandler = async () => {
    const canvas = canvasRef.current;

    try {

      // Create a root reference
      const storage = getStorage();
      // Create a reference to 'mountains.jpg'
      const mountainsRef = ref(storage, `${value.name}`);

      // Create a reference to 'images/mountains.jpg'
      const mountainImagesRef = ref(storage, `images/${value.name}`);

  

      // Convert canvas to blob
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      );

      // Create a new file from the blob
      const file = new File([blob], 'canvas-image.png', { type: 'image/png' });

      // Upload the file to Firebase Storage
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



  return (

    <form action="/action_page.php" onSubmit={onSubmit}>
      <h1>SIGN UP</h1>
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
        <button typeof="submit" ><strong>Upload</strong></button>
        <div className="container" >

        </div>
      </div>
    </form>


  )
}
const canvasStyle = {
  border: "1px solid black"
}