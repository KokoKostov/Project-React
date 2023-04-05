
import { useOnDraw } from '../../hooks/CanvasHooks';
import { requestFactory } from '../../services/requester';
import { app } from '../../firebase';
import { getStorage,ref,uploadBytes, getDownloadURL } from 'firebase/storage'
import {drawServiceFactory} from '../../services/drawServiceFactory'
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { json } from 'react-router-dom';

export const CanvasBoard = () => {
  const {userId,userEmail, auth, token} = useContext(AuthContext)
      const drawService = drawServiceFactory(token)
  const storage = getStorage(app)
 
  const {

    setCanvasRef,
    onCanvasMouseDown,
    canvasRef,
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
  const UploadDrawingHandler = async () => {

    const canvas = canvasRef.current
   




    // Create a root reference
    const storage = getStorage();
    
    // Create a reference to 'mountains.jpg'
    const mountainsRef = ref(storage, 'mountains.jpg');
    
    // Create a reference to 'images/mountains.jpg'
    const mountainImagesRef = ref(storage, 'images/mountains.jpg');
    
    // While the file names are the same, the references point to different files
 
    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
      
      
      // Create a new file from the blob
      const file = new File([blob], 'canvas-image.png', { type: 'image/png' });
      // 'file' comes from the Blob or File API
     
      const storageRef = ref(storage, 'some-child');
      const snapshot = await uploadBytes(storageRef, file)
      
        console.log(snapshot);
      console.log('Uploaded a blob or file!');
      const downloadUrl = await getDownloadURL(storageRef);
      console.log(downloadUrl);
      const data ={
        
        
        "name": "Blue-white Parrot",
        "author": userEmail,
        "style": "Mexican",
        "image": downloadUrl,
        "description": "Its just a blue parrot."
      }
      
     drawService.create(data)
      



    });
  }

  return (
    <div id='canvas-container'>
      <canvas

        width={800}
        height={600}
        onMouseDown={onCanvasMouseDown}
        style={canvasStyle}
        ref={setCanvasRef}
      />
      

      <button onClick={UploadDrawingHandler}>Upload</button>
    </div>

  );

}



const canvasStyle = {
  border: "1px solid black"
}