import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../../sever";
import { Modal, message, theme } from "antd";
import { IS_LOGIN } from "../../../constants";

import "./style.scss";
const Account = ({ setIsLogin }) => {
  const [data, setData] = useState({});
  const [changedData, setChangedData] = useState({});
  const [changedPassword, setChangedPassword] = useState({});
  const [loading, setLoading] = useState(false);
  // const [photoLoading, setPhotoLoading] = useState(false);
  // const [photoID, setPhotoId] = useState([]);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = () => {
    Modal.confirm({
      title: "Do you want to exit ?",
      onOk: () => {
        navigate("/login");
        setIsLogin(false);
        localStorage.removeItem(IS_LOGIN);
      },
    });
  };

  const getInfo = async () => {
    try {
      setLoading(true);
      const res = await request.get("auth/me");
      console.log(res.data);
      setData(res.data);
      setChangedData(res.data);
      setPhoto(res.data?.photo);
      setChangedPassword({
        currentPassword: "",
        newPassword: "",
      });
    } catch (err) {
      message.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await request.put("auth/updatedetails", changedData);
      message.success("Successfull changed");
    } catch (error) {
      message.error("Invalid");
    }
  };

  const upDatePassword = async (e) => {
    e.preventDefault();
    console.log(changedPassword);
    try {
      await request.put("auth/password", changedPassword);
      message.success("Successfull changed");
      setChangedPassword("");
    } catch (error) {
      if (
        changedPassword.currentPassword === "" ||
        changedPassword.newPassword === ""
      ) {
        message.error("Please Fill");
      } else if (
        changedPassword.currentPassword === changedPassword.newPassword
      ) {
        message.error("Enter new Password");
      } else {
        message.error("Current password is incorrect");
      }
    }
  };

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <>
      <section className="account-section">
        <center style={{ padding: "30px" }}>
          <h1>Account</h1>
        </center>
        <div
          style={{
            marginTop: "130px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}>
          <div>
            <form style={{ maxWidth: "500px" }} onSubmit={submit}>
              <input
                style={{
                  width: "100%",
                  marginBottom: "18px",
                  outline: "none",
                  padding: "14px",
                }}
                type="text"
                onChange={(e) => {
                  setChangedData({ ...data, firstName: e.target.value });
                }}
                value={changedData?.firstName}
                name="first_name"
                className="form-input"
                placeholder="Firstname"
              />
              <input
                style={{
                  width: "100%",
                  marginBottom: "18px",
                  outline: "none",
                  padding: "14px",
                }}
                type="text"
                placeholder="LastName"
                onChange={(e) => {
                  setChangedData({ ...data, lastName: e.target.value });
                }}
                value={changedData?.lastName}
                name="first_name"
                className="form-input"
              />
              <input
                style={{
                  width: "100%",
                  marginBottom: "18px",
                  outline: "none",
                  padding: "14px",
                }}
                type="text"
                placeholder="userName"
                onChange={(e) => {
                  setChangedData({ ...data, username: e.target.value });
                }}
                value={changedData?.username}
                name="first_name"
                className="form-input"
              />
              <input
                style={{
                  width: "100%",
                  marginBottom: "18px",
                  outline: "none",
                  padding: "14px",
                }}
                type="text"
                placeholder="Fields"
              />
              <input
                style={{
                  width: "100%",
                  marginBottom: "18px",
                  outline: "none",
                  padding: "14px",
                }}
                type="text"
                placeholder="info"
              />
              <input
                style={{
                  width: "100%",
                  marginBottom: "18px",
                  outline: "none",
                  padding: "14px",
                }}
                type="text"
                placeholder="Phone Number"
              />
              <input
                style={{
                  width: "100%",
                  marginBottom: "18px",
                  outline: "none",
                  padding: "14px",
                }}
                type="text"
                placeholder="Birthday"
              />
              <input
                style={{
                  width: "100%",
                  marginBottom: "18px",
                  outline: "none",
                  padding: "14px",
                }}
                type="text"
                placeholder="Adress"
              />
              <center style={{ margin: "30px" }}>
                <button type="submit" className="btn">
                  Save
                </button>
              </center>
            </form>
            <form className="form" onSubmit={upDatePassword}>
              <center>
                {" "}
                <h1 className="post-title">Update Password</h1>
              </center>
              <input
                style={{
                  width: "100%",
                  marginBottom: "18px",
                  outline: "none",
                  padding: "14px",
                }}
                type="text"
                onChange={(e) => {
                  setChangedPassword({
                    ...changedPassword,
                    currentPassword: e.target.value,
                  });
                }}
                name="currentPassword"
                placeholder="Current Password"
                className="form-input"
              />
              <input
                style={{
                  width: "100%",
                  marginBottom: "18px",
                  outline: "none",
                  padding: "14px",
                }}
                type="text"
                onChange={(e) => {
                  setChangedPassword({
                    ...changedPassword,
                    newPassword: e.target.value,
                  });
                }}
                name="newPassword"
                placeholder="New Password"
                className="form-input"
              />
            </form>
            <center style={{ margin: "30px" }}>
              <button type="submit" className="btn">
                Change Password
              </button>{" "}
              <button className="btn" onClick={logout}>
                Log out
              </button>
            </center>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
