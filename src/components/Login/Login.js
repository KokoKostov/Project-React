import { useContext,useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useForm } from "../../hooks/useForm"
import { Form, Button, } from "react-bootstrap"
import './login.css'



export const Login = () => {

  const { onLoginSubmit,currentError } = useContext(AuthContext)

  const { value, changeHandler, onSubmit } = useForm({
    email: '',
    password: ''
  }, onLoginSubmit)
  
 

  

  return(
    <div className="login-form-container">
     
      <Form method="POST" onSubmit={onSubmit}>
        
      <h1>Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control size="lg" type="email" placeholder="Enter email"
            name="email"
            value={value.email}
            onChange={changeHandler} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder="Password" size="lg"
            type="password"
            name={"password"}
            value={value.password}
            onChange={changeHandler}
            required />
        </Form.Group>
        {currentError && <p>{currentError}</p>}
    

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      
    </div>
  )
}
