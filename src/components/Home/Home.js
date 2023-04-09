import { Link } from "react-router-dom";
import './Home.css';
import { Button } from "react-bootstrap";

export const Home = ({drawings}) => {
  const lastDrawing = drawings[drawings.length-1];

  if(lastDrawing) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">Latest Drawing</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="thumbnail">
              <img src={lastDrawing.image} alt={lastDrawing.name} className="latest-drawing-image" />
              </div>
              <div className="caption">
                <h3>Name: {lastDrawing.name}</h3>
                <p>By: {lastDrawing.author}</p>
                <p>Description: {lastDrawing.description}</p>
                <p>
                  <Link to={`/drawings/${lastDrawing._id}`} className="btn btn-primary" >Details &raquo;</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      
    )
  }
}
