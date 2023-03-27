export const Login= ()=>{
    return (
    <div className=".login-form">
      <form >
      {/* onSubmit={handleSubmit} */}
        <div className="login-form">
          <label>Username </label>
          <input type="text" name="username" required />
          {/* {renderErrorMessage("uname")} */}
        </div>
        <div className="login-form">
          <label>Password </label>
          <input type="password" name="password" required />
          {/* {renderErrorMessage("pass")} */}
        </div>
        <div className="login-form">
          <input type="submit" />
        </div>
       
      </form>
      <th text-align="auto">click here</th>
    </div>
  )
}