import { Navigate, useParams } from "react-router-dom";
import { drawServiceFactory } from "../../services/drawServiceFactory";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { getStorage, ref, deleteObject } from "firebase/storage";


export const DrawingDetails = () => {

    const { drawingId } = useParams();
    const [currentDrawing, setCurrentDrawing] = useState('')
    const { userId } = useContext(AuthContext)
    const { token, onDeleteConfirm } = useContext(AuthContext)
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
            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, `${currentDrawing.name}`);

            // Delete the file
            deleteObject(desertRef).then(() => {
                console.log(`deleted`);
            }).catch((error) => {
                console.log(error);
            });
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
            {userId === currentDrawing._ownerId && (
                <>
                    <Link to={`/drawings/${drawingId}/edit`}>Edit</Link>
                    <button onClick={onDeleteClick}>delete</button>
                </>
            )}
        </div>

    )
}