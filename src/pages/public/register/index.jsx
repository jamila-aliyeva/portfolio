import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// // import { toast } from "react-toastify";
// import Cookies from "js-cookie";

// import { authName } from "../../../redux/slice/auth";
// import { TOKEN } from "../../../constants";

// import "./style.scss";
import request from "../../../sever";
import { message } from "antd";

const Register = () => {
  const navigate = useNavigate();

  const submit = async (user) => {
    // e.preventDefault();
    // let user = {
    //   username: e.target.username.value,
    //   password: e.target.password.value,
    // };
    try {
      message.success("Successfully registered!");
      let res = await request.post("auth/register", user);
      console.log(res);
      message.success("You have successfully registered");
      navigate("/user");
    } catch (err) {
      message.error(err.response.data.message);
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
