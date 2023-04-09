import { Navigate, useParams } from "react-router-dom";
import { drawServiceFactory } from "../../services/drawServiceFactory";
import { useContext, useEffect, useState, useReducer } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { AddComment } from "./AddComment.js/AddComment";
import { drawingReducer } from "../../reducer/drawingReducer";
import * as commentService from "../../services/commentService";
import "./DrawingDetails.css";
import { Button, Modal, Card } from "react-bootstrap";

export const DrawingDetails = () => {
    const { drawingId } = useParams();
    const { token, onDeleteConfirm, userEmail, userId, isAuthenticated } = useContext(AuthContext);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const drawService = drawServiceFactory(token);
    const [drawing, dispatch] = useReducer(drawingReducer, {});

    useEffect(() => {
        Promise.all([
            drawService.getOne(drawingId),
            commentService.getAll(drawingId),
        ]).then(([drawingData, comments]) => {
            const drawingState = {
                ...drawingData,
                comments,
            };
            dispatch({ type: "FETCH_COMMENT", payload: drawingState });
        });
    }, [drawingId]);

    const onCommentSubmit = async (value) => {
        const newComment = await commentService.create(drawingId, value.comment);
        dispatch({
            type: `ADD_COMMENT`,
            payload: newComment,
            userEmail,
        });
    };
    const handleDeleteCancel = () => {
        setShowConfirmation(false);
    };

   
    const handleDeleteConfirm = async () => {
        setShowConfirmation(false);
        const storage = getStorage();

       try{
        const desertRef = ref(storage, `${drawing.name}`);
        await  deleteObject(desertRef)
        await  drawService.delete(drawing._id);
         await onDeleteConfirm(drawing._id);
      
       } catch{
        console.log("Painting not Found");
        await  drawService.delete(drawing._id);
        await onDeleteConfirm(drawing._id);
       }

            
          
          

    };

    return (
        <section className="drawing-details-container">
            <div className="drawing-container">
                <img className="drawing-image" src={drawing.image} alt={drawing.name} />
                <h1>{drawing.name}</h1>
                <h2>By: {drawing.author}</h2>
                <p>In Style: {drawing.style}</p>
                <p>Description: {drawing.description}</p>
                </div>
                <div className="details-comments" >
                {userId === drawing._ownerId && (
                    <>
                        <Link to={`/drawings/${drawingId}/edit`} >
                        <Button>  Edit</Button>
                        </Link>
                        
                        <Button onClick={() => setShowConfirmation(true)} className="btn btn-danger">
                            Delete
                        </Button>
                        <Modal show={showConfirmation} animation={false} onHide={handleDeleteCancel}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete {`${drawing.name}`}</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleDeleteCancel} >
                                    Close
                                </Button>
                                <Button variant="danger"  onClick={handleDeleteConfirm} >
                                    Agree
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                )}
           
           
                <h2>Comments:</h2>
                
 
              
                    {drawing.comments &&
                        drawing.comments.map((x) => (
                            <Card style={{maxWidth:500, margin:"auto"} }>

                        {x.author.email} :     
                             <Card.Body key={x._id} className="comment"  >
                              
                                   {x.comment}
                               
                            </Card.Body>
                            </Card>
                        ))}
             

                {!drawing.comments?.length && (
                    <p className="no-comment">No comments.</p>
                )}
            </div>

            {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />}
        </section>

    );
};

