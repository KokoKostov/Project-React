import { CountrySelector } from "./CountrySelector"

export const Register= ()=>{
    return (
    <div className=".login-form">
      <form >
      {/* onSubmit={handleSubmit} */}
        <div className="login-form">
          <label>Username </label>
          <input type="text" placeholder="username" name="username" required />
          {/* {renderErrorMessage("uname")} */}
        </div>
        <div className="login-form">
          <label>Email </label>
          <input type="email" placeholder="email@gmail.com" name="email" required />
          {/* {renderErrorMessage("uname")} */}
        </div>
        <div className="login-form">
          <label>Password </label>
          <input type="password" name="password" required />
          {/* {renderErrorMessage("pass")} */}
        </div>
    

        <div className="login-form">
          <label>Repeat Password </label>
          <input type="password" name="repassword" required />
          </div>
          <div className="login-form">
          <label>Country </label>
          <CountrySelector/>
                      {/* {renderErrorMessage("pass")} */}
        </div>
        <div className="login-form">
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}