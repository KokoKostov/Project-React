import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../context/AuthContext";
import { Form, Button } from "react-bootstrap";
import './register.css'

export const Register = () => {
  const { onRegisterSubmit } = useContext(AuthContext);
  const { value, changeHandler, onSubmit } = useForm(
    {
      username: "",
      email: "",
      password: "",
      repassword: "",
    },
    onRegisterSubmit
  );

  return (
    <div className="register-form-container">
      <Form id="register" method="post" onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <h1>Register</h1>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            value={value.Username}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email@gmail.com"
            name="email"
            value={value.email}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="********"
            name="password"
            value={value.password}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            name="repassword"
            placeholder="********"
            value={value.repassword}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};
