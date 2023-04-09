import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import './Drawings.css'

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
    <figure>
      <img src={image} alt={name}  />
      <figcaption>
        <h2>{name}-</h2>
        <h3>{author}</h3>
        <p>{style}</p>
        <Link to={`/drawings/${_id}`} role="button" className="btn-link">
          <Button variant="secondary" size="lg">Details </Button>
        </Link>
      </figcaption>
    </figure>
  );
}

