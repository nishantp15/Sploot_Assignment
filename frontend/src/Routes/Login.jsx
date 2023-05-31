import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Navigate } from "react-router-dom";
function Login() {
  const {authState,loginUser} = useContext(AppContext)
  let [user, setUser] = useState({
    email:"",
    password:""
  })
  // let [token, setToken] = useState('')
  let [disable, setDisable] = useState(false)
    function handleChange(e){
      setUser({...user, [e.target.name]:e.target.value})
    }

    function handleSubmit(e){
      e.preventDefault();
      setDisable(true)
      fetch(`https://sploot-assignment-nu.vercel.app/login`,{
        method:"POST",
        headers:{'content-type':"application/json"},
        body:JSON.stringify(user)
      }).then(res=>{
        return res.json()}).then(val=>loginUser(val.data.data))
    }
  return (
    <>    {authState.isAuth ? (<Navigate to="/dashboard"/>):
    (<div className="login-page">
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label>
          <input data-testid="email-input" name="email" type="email" onChange={handleChange} placeholder="email" />
        </label>
      </div>
      <div>
        <label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="password"
          />
        </label>
      </div>
      <div>
        <button type="submit" disabled={disable}>
          SUBMIT
        </button>
      </div>
    </form>
    <div>
      <Link className="message" to="/">
        Go Back
      </Link>
    </div>
  </div>)}
  </>
  );
  
}
export default Login;
