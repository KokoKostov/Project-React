import { Navigate, useParams } from "react-router-dom";
import { drawServiceFactory } from "../../services/drawServiceFactory";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export const DrawingDetails = () => {

    const { drawingId } = useParams();
    const [currentDrawing , setCurrentDrawing] = useState('')
    const {userId}=useContext(AuthContext)
    const {token,onDeleteConfirm} = useContext(AuthContext)
    const drawService = drawServiceFactory(token)
   
 
    useEffect(() => {
        const fetchDrawing = async () => {
          
          const drawingData = await drawService.getOne(drawingId);
          setCurrentDrawing(drawingData);
        };
       fetchDrawing()
    }, [drawingId]);
    const onDeleteClick = async () => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Are you sure you want to delete ${currentDrawing.name}`);

        if (result) {
            await drawService.delete(currentDrawing._id);
            onDeleteConfirm(currentDrawing._id)

        }
    };

    return (

        <div className="drawing-container">
            <img className="drawing-image" src={currentDrawing.image} alt={currentDrawing.name} />
            <h1>{currentDrawing.name}</h1>
            <h2>{currentDrawing.author}</h2>
            <p>{currentDrawing.style}</p>
            <p>{currentDrawing.description}</p>
            {userId===currentDrawing._ownerId &&(
                <>
                <button>edit</button>
                <button onClick={onDeleteClick}>delete</button>
                </>
            )}
        </div>

    )
}