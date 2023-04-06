import { Link } from "react-router-dom";

export const DrawingItem = ({
    _id,
    name,
    author,
    style,
    image,
    email,
    description,
    _ownerId


}) => {
    return (
         <figure><img src={image} width="600" height="400" alt={name} style={{ border: "1px solid black"}}  />
        <figcaption>
          <h2>{name}-</h2>
          <h3>{author}</h3>
          <p>{style}</p>
          
          
          <footer className="more"><Link to={`/drawings/${_id}`} role="button">Details &raquo;</Link></footer>
        </figcaption>
      </figure>
    );
}