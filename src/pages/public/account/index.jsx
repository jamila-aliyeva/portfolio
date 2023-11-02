import { Button, Flex, Form, Image, Input, Modal, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import "./style.scss";
import "react-tabs/style/react-tabs.css";

import { TOKEN, USER } from "../../../constants";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import {
  useGetUserInfoQuery,
  useUpdatePasswordMutation,
  useUpdateUserInfoMutation,
  useUploadAccountPhotoMutation,
} from "../../../redux/queries/account";
import { getUserImage } from "../../../utils/images";
import { removeAuth } from "../../../redux/slice/auth";
import request from "../../../sever";

const AccountPage = () => {
  // e.preventDefault();
  // const [changedPassword, setChangedPassword] = useState({});
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { data: user, refetch } = useGetUserInfoQuery();

  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [uploadAccountPhoto] = useUploadAccountPhotoMutation();
  const [updatePassword] = useUpdatePasswordMutation();

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user, form]);

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const { data } = await uploadAccountPhoto(formData);
    setPhoto(data);
  };

  const changePassword = async (values) => {
    try {
      await updatePassword(values);
      setShowForm(false);
      message.success("Password changed successfully");
      navigate("/");
    } catch (err) {
      message.error(err);
    }
  };

  const updateUser = async (values) => {
    await updateUserInfo(values);
    message.success("Information saved successfully");
    refetch();
  };

  const logout = () => {
    Cookies.remove(TOKEN);
    localStorage.removeItem(USER);
    dispatch(removeAuth());
    navigate("/");
  };

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "40px" }}>Account</h1>

      <Form
        style={{ display: "flex", justifyContent: "center", height: "100vh" }}
        form={form}
        className="register-form"
        name="register"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={updateUser}
        autoComplete="off">
        <div style={{ display: "flex", gap: "40px" }}>
          <div>
            <center>
              <div>
                <Image
                  className="account-image"
                  style={{
                    width: "200px",
                  }}
                  src={user?.photo ? getUserImage(user.photo) : "loading..."}
                />
                <Input
                  className="upload-btn"
                  type="file"
                  onChange={uploadImage}
                />
              </div>
            </center>
          </div>
          <div>
            <div>
              <Form.Item
                label="First name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstname!",
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Last name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your lastname!",
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}>
                <Input />
                <Form.Item
                  style={{ marginTop: "20px" }}
                  label="Phone number"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your address!",
                    },
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email address!",
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Form.Item>
              <Form.Item label="Date of birth" name="birthday">
                <input
                  className="date-picker register-date-picker"
                  type="date"
                />
              </Form.Item>

              <Form.Item label="User information" name="info">
                <Input.TextArea />
              </Form.Item>

              <Form.Item
                className="btn-container"
                wrapperCol={{
                  offset: 0,
                  span: 24,
                }}>
                <button className="submit-btn" type="submit">
                  Update Info
                </button>
              </Form.Item>
            </div>
            <div>
              <Form
                name="password"
                className="reset-password"
                style={{
                  paddingTop: "30px",
                }}
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                onFinish={changePassword}
                autoComplete="off">
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username",
                    },
                  ]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Current password"
                  name="currentPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your current password",
                    },
                  ]}>
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="New password"
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password",
                    },
                  ]}>
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  className="btn-container"
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}>
                  <div style={{ marginBottom: "50px" }}>
                    <Button style={{ marginRight: "20px" }} type="submit">
                      Update Info
                    </Button>
                    <Button style={{ marginRight: "20px" }}>
                      <Link
                        onClick={() =>
                          Modal.confirm({
                            title: "Do you want to log out ?",
                            onOk: () => logout(),
                          })
                        }>
                        Logout
                      </Link>
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default AccountPage;
