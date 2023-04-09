import { useForm } from "../../../hooks/useForm";
import { Form, Button } from "react-bootstrap";

export const AddComment = ({
    onCommentSubmit,
})=>{
    const { value, changeHandler,onSubmit} = useForm({
        comment: ``
    },onCommentSubmit);


    return (
        
        <Form className="form" onSubmit={onSubmit} style={{maxWidth: "400px", margin: "0 auto"}}>
        <Form.Group controlId="controlGroup">
          <Form.Label>Add new comment:</Form.Label>
          <Form.Control
            as="textarea"
            name="comment"
            placeholder="Add comment"
            value={value.comment}
            onChange={changeHandler}
            rows={3}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Comment
        </Button>
      </Form>
     
    )
}
