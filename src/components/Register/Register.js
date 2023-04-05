
import { useContext } from "react";
import { UseForm } from "../../hooks/UseForm";
import { AuthContext } from "../../context/AuthContext";

export const Register= ()=>{
  const { onRegisterSubmit } = useContext(AuthContext);
  const { value, changeHandler, onSubmit } = UseForm({
      
    username: '',
      email: '',
      password: '',
      repassword: '',
  }, onRegisterSubmit);
 
    return (
    <div className=".login-form">
      <form id= "register" method="post" onSubmit={onSubmit}>
      
        <div className="login-form">
          <label>Username </label>
          <input 
          type="text"
           placeholder="username"
            name="username"
            value={value.Username}
            onChange={changeHandler}
             required />
       
        </div>
        <div className="login-form">
          <label>Email </label>
          <input type="email"
           placeholder="email@gmail.com"
            name="email"
            value={value.email}
            onChange={changeHandler}
             required />
          
        </div>
        <div className="login-form">
          <label>Password </label>
          <input type="password"
           placeholder="********"
            name="password"
            value={value.password}
            onChange={changeHandler}
             required />
       
        </div>
    

        <div className="login-form">
          <label>Repeat Password </label>
          <input type="password"
           name="repassword"
           placeholder="********"
           value={value.repassword}
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