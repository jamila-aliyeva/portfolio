import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { authName } from "../../../redux/slice/auth";
import { TOKEN } from "../../../constants";

// import "./style.scss";
import request from "../../../sever";

const Register = () => {
  const { isAuthenticated } = useSelector((state) => state[authName]);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    let user = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      username: e.target.username.value,
      password: e.target.password.value,
    };
    try {
      // toast.success("Successfully registered!");
      let res = await request.post("auth/register", user);
      console.log(res);
      Cookies.set(TOKEN, res.token);
      isAuthenticated(true);
      navigate("/user");
      console.log(res);
      console.log(user);
    } catch (err) {
      // toast.error("Invalid");
      console.log(err);
    }
  };
  return (
    <section className="register">
      <div className="container">
        <div className="form-wrap">
          <div className="form-container" style={{ marginTop: "30px" }}>
            <h1
              style={{
                textAlign: "center",
              }}>
              Register
            </h1>
            <div>
              <form onSubmit={submit}>
                <input type="text" name="first_name" placeholder="Firstname" />
                <input type="text" name="last_name" placeholder="Firstname" />
                <input type="text" name="username" placeholder="Firstname" />
                <input type="password" name="password" placeholder="Password" />
                <input type="password" placeholder="Confirm password" />
                <button>Register</button>
              </form>
            </div>
          </div>
          <div className="toggle-container">
            <div className="toggle-panel toggle-right">
              <h2>Hello, friend!</h2>
              <p>Register with personal details use all of site features</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
