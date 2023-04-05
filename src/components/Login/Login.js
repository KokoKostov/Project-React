import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { UseForm } from "../../hooks/UseForm"


export const Login = () => {

  const { onLoginSubmit } = useContext(AuthContext)
  const { value, changeHandler, onSubmit } = UseForm({
    email: '',
    password: ''
  }, onLoginSubmit)

  return (
    <div className=".login-form">
      <form method="POST" onSubmit={onSubmit}>

        <div className="login-form">
          <label>Email </label>
          <input
          placeholder="peter@abv.bg"
            type="text"
            name="email"
            value={value.email}
            onChange={changeHandler}


            required />

        </div>
        <div className="login-form">
          <label>Password </label>
          <input
           placeholder="123456"
            type="password"
            name={"password"}
            value={value.password}
            onChange={changeHandler}
            required />

        </div>
        <div className="login-form">
          <input type="submit" />
        </div>
        
      </form>
     
    </div>
  )
}